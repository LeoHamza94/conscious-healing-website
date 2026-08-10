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
  getDoc,
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

const CONVERTKIT_API_KEY = "kit_a3535d15a99a453aedb1e36739869e59";
const CONVERTKIT_TAG_ID = "22373653"; // "Signed up via website" tag, created in Kit for this integration

// Subscribes a new member's email to Kit (Herb of the Week, video
// announcements, promotions) and tags them "Signed up via website". Uses
// Kit's V4 API key header (X-Kit-Api-Key) — this key is scoped to write-only
// actions like this and can't read/list/export subscriber data, so it's safe
// to call directly from client-side JS.
//
// This calls "Create a subscriber" (POST /v4/subscribers) rather than
// "Add subscriber to form by email address" (POST /v4/forms/{id}/subscribers).
// The form-based endpoint 404s for this account on both of its forms —
// they're "embed" type (an inline JS widget), and Kit's V4 form-subscribe
// action appears to only support hosted/landing-page-type forms, not embeds.
// Creating the subscriber directly is what actually works (verified live:
// 201 Created). Since there's no automation on the form itself yet, the
// lighter-touch fix is a Kit Tag instead of converting the form to a
// landing page — applied via "Tag a subscriber by email address"
// (POST /v4/tags/{tag_id}/subscribers) right after the subscriber is
// created, so the tag survives even for a subscriber who already existed.
async function subscribeToConvertKit(email) {
  const response = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": CONVERTKIT_API_KEY,
    },
    body: JSON.stringify({ email_address: email }),
  });
  if (!response.ok) {
    throw new Error(`ConvertKit subscribe failed with status ${response.status}`);
  }

  const tagResponse = await fetch(`https://api.kit.com/v4/tags/${CONVERTKIT_TAG_ID}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": CONVERTKIT_API_KEY,
    },
    body: JSON.stringify({ email_address: email }),
  });
  if (!tagResponse.ok) {
    // The subscriber was created successfully even if tagging fails — don't
    // fail the whole signup over a missing tag, just surface it for
    // debugging.
    console.error(`ConvertKit tag apply failed with status ${tagResponse.status}`);
  }
}

// Creates the member's Firestore record on signup. `emailListStatus` reflects
// whether the Kit subscribe call actually succeeded, so a failure is visible
// in Firestore (and re-triable later) rather than silently lost.
async function createMemberRecord(user, name, emailListStatus) {
  await setDoc(doc(db, "members", user.uid), {
    email: user.email,
    displayName: name || user.displayName || "",
    createdAt: serverTimestamp(),
    emailListStatus,
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

      let emailListStatus = "failed";
      try {
        await subscribeToConvertKit(email);
        emailListStatus = "subscribed";
      } catch (ckErr) {
        console.error("ConvertKit subscribe failed:", ckErr);
      }

      await createMemberRecord(cred.user, name, emailListStatus);
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
    openModal,
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

// Gated content starts hidden (display:none) in the HTML so it fails closed
// before auth resolves. That means the browser's automatic scroll-to-#anchor
// on page load happens while the target is still inside a hidden container
// and silently fails — and nothing retries it once the content is revealed.
// The first time (and only the first time) gating actually reveals the
// content — whether that's on load for an already-signed-in member, or after
// someone logs in mid-session via the modal — retry the scroll so #anchor
// links into gated pages land on the right section instead of the top of
// the page.
let hashScrollHandled = false;
function retryHashScroll() {
  if (hashScrollHandled) return;
  hashScrollHandled = true;
  if (!window.location.hash) return;
  let target;
  try {
    target = document.querySelector(window.location.hash);
  } catch (err) {
    return; // malformed hash — nothing to scroll to
  }
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function applyGating(user) {
  const gatedContent = document.getElementById("gated-content");
  const gateMessage = document.getElementById("gate-message");
  if (!gatedContent || !gateMessage) return;

  if (user) {
    gatedContent.style.display = "block";
    gateMessage.style.display = "none";
    retryHashScroll();
  } else {
    gatedContent.style.display = "none";
    gateMessage.style.display = "block";
  }
}

// ---------------------------------------------------------------------------
// Membership data API — a small window-level surface so plain (non-module)
// page scripts, like js/chakra-quiz.js, can read/write the signed-in member's
// Firestore record without opening a second onAuthStateChanged listener.
// Everything routes through the one listener already wired up in init().
// ---------------------------------------------------------------------------
let authResolved = false;
const membershipReadyCallbacks = [];

function notifyMembershipReady(user) {
  membershipReadyCallbacks.forEach((cb) => {
    try {
      cb(user);
    } catch (err) {
      console.error("CHMembership onReady callback failed:", err);
    }
  });
}

window.CHMembership = {
  currentUser() {
    return auth.currentUser;
  },
  // Registers a callback that fires once auth state is known, and again on
  // every subsequent sign-in/out. Fires immediately if auth already resolved
  // before this was called.
  onReady(callback) {
    membershipReadyCallbacks.push(callback);
    if (authResolved) callback(auth.currentUser);
  },
  // Merges the given fields into members/{uid}. Resolves false (no-op) if
  // nobody is signed in.
  saveMemberFields(fields) {
    const user = auth.currentUser;
    if (!user) return Promise.resolve(false);
    return setDoc(doc(db, "members", user.uid), fields, { merge: true }).then(() => true);
  },
  // Returns the signed-in member's Firestore document, or null if signed out
  // or the document doesn't exist yet.
  getMemberDoc() {
    const user = auth.currentUser;
    if (!user) return Promise.resolve(null);
    return getDoc(doc(db, "members", user.uid)).then((snap) => (snap.exists() ? snap.data() : null));
  },
};

function init() {
  const triggers = document.querySelectorAll(".member-auth-trigger");
  const loginTriggers = document.querySelectorAll(".header-login-trigger");
  triggers.forEach((trigger) => {
    trigger.dataset.originalText = trigger.textContent;
  });

  const modal = triggers.length || loginTriggers.length ? initAuthModal(triggers) : null;

  loginTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (auth.currentUser) {
        signOut(auth);
      } else if (modal) {
        modal.openModal();
      }
    });
  });

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

    loginTriggers.forEach((trigger) => {
      trigger.textContent = user ? "Log Out" : "Log In";
    });

    authResolved = true;
    notifyMembershipReady(user);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
