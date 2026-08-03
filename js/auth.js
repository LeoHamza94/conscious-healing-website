import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDg9Q5b-H8XsBIUdy1BggTcxek7ZQznkbo",
  authDomain: "conscious-healing-membership.firebaseapp.com",
  projectId: "conscious-healing-membership",
  storageBucket: "conscious-healing-membership.firebasestorage.app",
  messagingSenderId: "47402639961",
  appId: "1:47402639961:web:e2a540b58fc45c458d4748",
  measurementId: "G-GG90ZEJJRM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Creates the member's Firestore record on signup. `emailListStatus` starts as
// "pending" — actual enrollment into the herb-of-the-week / promotions list
// depends on which email platform gets chosen (Mailchimp, ConvertKit, etc.),
// which is not yet decided. That sync is a follow-up once a provider is picked.
async function createMemberRecord(user, name) {
  await setDoc(doc(db, "members", user.uid), {
    email: user.email,
    displayName: name || user.displayName || "",
    createdAt: serverTimestamp(),
    emailListStatus: "pending",
  });
}

const ERROR_MESSAGES = {
  "auth/email-already-in-use": "That email already has an account — try logging in instead.",
  "auth/invalid-email": "That doesn't look like a valid email address.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts — please wait a moment and try again.",
  "auth/missing-password": "Please enter a password.",
};

function friendlyError(err) {
  return ERROR_MESSAGES[err.code] || err.message || "Something went wrong. Please try again.";
}

function buildModal() {
  const overlay = document.createElement("div");
  overlay.className = "auth-modal-overlay";
  overlay.innerHTML = `
    <div class="auth-modal" role="dialog" aria-modal="true" aria-label="Membership sign in">
      <button type="button" class="auth-modal-close" aria-label="Close">&times;</button>

      <div class="auth-modal-view" data-view="signup">
        <h3>Become a Member</h3>
        <p class="auth-modal-subtitle">It's free — unlock more herbalism knowledge than anywhere else offers at no cost.</p>
        <div class="auth-modal-tabs">
          <button type="button" class="auth-modal-tab active" data-tab="signup">Sign Up</button>
          <button type="button" class="auth-modal-tab" data-tab="login">Log In</button>
        </div>

        <div class="auth-modal-message" data-msg="signup"></div>
        <form class="auth-modal-form active" data-form="signup">
          <div class="form-group">
            <label for="auth-signup-name">Name (optional)</label>
            <input type="text" id="auth-signup-name" autocomplete="name">
          </div>
          <div class="form-group">
            <label for="auth-signup-email">Email</label>
            <input type="email" id="auth-signup-email" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label for="auth-signup-password">Password</label>
            <input type="password" id="auth-signup-password" autocomplete="new-password" minlength="6" required>
          </div>
          <div class="form-group">
            <label for="auth-signup-password-confirm">Confirm Password</label>
            <input type="password" id="auth-signup-password-confirm" autocomplete="new-password" minlength="6" required>
          </div>
          <label class="auth-modal-consent">
            <input type="checkbox" id="auth-signup-consent" required>
            <span>I agree to the <a href="terms.html" target="_blank" rel="noopener">Terms &amp; Conditions</a></span>
          </label>
          <button type="submit" class="btn btn-primary">Create My Free Account</button>
        </form>

        <div class="auth-modal-message" data-msg="login"></div>
        <form class="auth-modal-form" data-form="login">
          <div class="form-group">
            <label for="auth-login-email">Email</label>
            <input type="email" id="auth-login-email" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label for="auth-login-password">Password</label>
            <input type="password" id="auth-login-password" autocomplete="current-password" required>
          </div>
          <a href="#" class="auth-modal-forgot" data-action="show-reset">Forgot password?</a>
          <button type="submit" class="btn btn-primary">Log In</button>
        </form>

        <div class="auth-modal-message" data-msg="reset"></div>
        <form class="auth-modal-form" data-form="reset">
          <p class="form-note" style="margin-top:0;">Enter your email and we'll send you a link to reset your password.</p>
          <div class="form-group">
            <label for="auth-reset-email">Email</label>
            <input type="email" id="auth-reset-email" autocomplete="email" required>
          </div>
          <button type="submit" class="btn btn-primary">Send Reset Email</button>
        </form>
      </div>

      <div class="auth-modal-view auth-account-panel" data-view="account" style="display:none;">
        <h3>Welcome Back</h3>
        <p>Signed in as <strong data-account-email></strong></p>
        <button type="button" class="btn btn-outline" data-action="logout">Log Out</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function initAuthModal(triggers) {
  const overlay = buildModal();
  const signupView = overlay.querySelector('[data-view="signup"]');
  const accountView = overlay.querySelector('[data-view="account"]');
  const accountEmailEl = overlay.querySelector("[data-account-email]");
  const tabs = overlay.querySelectorAll(".auth-modal-tab");
  const forms = overlay.querySelectorAll(".auth-modal-form");
  const messages = overlay.querySelectorAll(".auth-modal-message");

  function openModal() {
    overlay.classList.add("open");
  }

  function closeModal() {
    overlay.classList.remove("open");
    clearMessages();
  }

  function clearMessages() {
    messages.forEach((m) => {
      m.textContent = "";
      m.className = "auth-modal-message";
    });
  }

  function showMessage(name, text, type) {
    const el = overlay.querySelector(`[data-msg="${name}"]`);
    if (!el) return;
    el.textContent = text;
    el.className = `auth-modal-message ${type}`;
  }

  function switchForm(name) {
    clearMessages();
    forms.forEach((f) => f.classList.toggle("active", f.dataset.form === name));
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchForm(tab.dataset.tab));
  });

  overlay.querySelector('[data-action="show-reset"]').addEventListener("click", (e) => {
    e.preventDefault();
    clearMessages();
    forms.forEach((f) => f.classList.toggle("active", f.dataset.form === "reset"));
    tabs.forEach((t) => t.classList.remove("active"));
  });

  overlay.querySelector(".auth-modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  overlay.querySelector('[data-form="signup"]').addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = overlay.querySelector("#auth-signup-name").value.trim();
    const email = overlay.querySelector("#auth-signup-email").value.trim();
    const password = overlay.querySelector("#auth-signup-password").value;
    const confirm = overlay.querySelector("#auth-signup-password-confirm").value;

    if (password !== confirm) {
      showMessage("signup", "Passwords don't match.", "error");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      await createMemberRecord(cred.user, name);
      showMessage("signup", "Account created — you're in!", "success");
    } catch (err) {
      showMessage("signup", friendlyError(err), "error");
    }
  });

  overlay.querySelector('[data-form="login"]').addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = overlay.querySelector("#auth-login-email").value.trim();
    const password = overlay.querySelector("#auth-login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("login", "Welcome back!", "success");
    } catch (err) {
      showMessage("login", friendlyError(err), "error");
    }
  });

  overlay.querySelector('[data-form="reset"]').addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = overlay.querySelector("#auth-reset-email").value.trim();

    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("reset", "Reset email sent — check your inbox.", "success");
    } catch (err) {
      showMessage("reset", friendlyError(err), "error");
    }
  });

  overlay.querySelector('[data-action="logout"]').addEventListener("click", async () => {
    await signOut(auth);
    closeModal();
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  return {
    onAuthState(user) {
      if (user) {
        signupView.style.display = "none";
        accountView.style.display = "block";
        accountEmailEl.textContent = user.displayName ? `${user.displayName} (${user.email})` : user.email;
      } else {
        signupView.style.display = "block";
        accountView.style.display = "none";
      }
    },
  };
}

function applyGating(user) {
  const gatedContent = document.getElementById("gated-content");
  const gateMessage = document.getElementById("gate-message");
  if (!gatedContent || !gateMessage) return;

  if (user) {
    gatedContent.style.display = "block";
    gateMessage.style.display = "none";
  } else {
    gatedContent.style.display = "none";
    gateMessage.style.display = "block";
  }
}

function init() {
  const triggers = document.querySelectorAll(".member-auth-trigger");
  triggers.forEach((trigger) => {
    trigger.dataset.originalText = trigger.textContent;
  });

  const modal = triggers.length ? initAuthModal(triggers) : null;

  onAuthStateChanged(auth, (user) => {
    applyGating(user);

    if (modal) {
      modal.onAuthState(user);
    }

    triggers.forEach((trigger) => {
      if (user) {
        trigger.textContent = user.displayName ? `Welcome, ${user.displayName}` : "My Membership";
      } else {
        trigger.textContent = trigger.dataset.originalText;
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
