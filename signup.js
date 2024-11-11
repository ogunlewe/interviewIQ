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

    const signupForm = document.getElementById("signup-form");
    const googleSignupButton = document.getElementById("google-signup");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModalBtn = document.getElementById("close-modal");

    // Function to show modal with a message
    function showModal(message, isError = false) {
      modalMessage.textContent = message;
      modalMessage.style.color = isError ? "red" : "green";
      modal.style.display = "flex";
    }

 
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          showModal("Signup successful! Welcome, " + user.email);
          signupForm.reset();
          window.location.href = '../public/index.html';

        })
        .catch((error) => {
          showModal("Error: " + error.message, true);
        });
    });


    googleSignupButton.addEventListener("click", () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          showModal("Google signup successful! Welcome, " + user.displayName);
          window.location.href = '../public/index.html';

        })
        .catch((error) => {
          showModal("Error: " + error.message, true);
        });
    });




    