// Import the functions you need from the SDKs you need
// Import required functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2Y5CaIiU2qsMDvOUUTZgEIBKkdNTAm90",
  authDomain: "interviewiq-1ac1a.firebaseapp.com",
  projectId: "interviewiq-1ac1a",
  storageBucket: "interviewiq-1ac1a.firebasestorage.app",
  messagingSenderId: "534530031661",
  appId: "1:534530031661:web:2356c4e8ba751efeafb8a4",
  measurementId: "G-62VMN9KER5"
};


    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const analytics = getAnalytics(app);

    const signinForm = document.getElementById("signin-form");
    const googleSigninButton = document.getElementById("google-signin");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModalBtn = document.getElementById("close-modal");
    const forgotPasswordLink = document.getElementById("forgot-password");

    
    function showModal(message, isError = false) {
      modalMessage.textContent = message;
      modalMessage.style.color = isError ? "red" : "green";
      modal.style.display = "flex";
    }

    
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    
    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showModal("Error: Please enter a valid email address.", true);
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          showModal("Sign-in successful! Welcome back, " + user.email);
          signinForm.reset();
          window.location.href = '../public/apply.html';

        })
        .catch((error) => {
          showModal("Error: " + error.message, true);
        });
    });

    
    googleSigninButton.addEventListener("click", () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          showModal("Google sign-in successful! Welcome, " + user.displayName);
          window.location.href = '../public/apply.html';

        })
        .catch((error) => {
          showModal("Error: " + error.message, true);
        });
    });

    
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const email = document.getElementById("login-email").value;

      if (!email) {
        showModal("Error: Please enter your email to reset your password.", true);
        return;
      }

      sendPasswordResetEmail(auth, email)
        .then(() => {
          showModal("Password reset email sent! Check your inbox.");
        })
        .catch((error) => {
          showModal("Error: " + error.message, true);
        });
    });