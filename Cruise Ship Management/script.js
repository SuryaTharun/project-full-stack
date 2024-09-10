// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC8DYHNWT-AP5mYFssBhjjjOeXYeu3eko",
  authDomain: "cruise-ship-management-66eff.firebaseapp.com",
  projectId: "cruise-ship-management-66eff",
  storageBucket: "cruise-ship-management-66eff.appspot.com",
  messagingSenderId: "202323011994",
  appId: "1:202323011994:web:1dd626c24581e7beaf3223",
  measurementId: "G-9PMKGPQQT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Login User based on Role
function loginUser(role) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            verifyUserRole(user.uid, role);
        })
        .catch(error => {
            loginMessage.textContent = error.message;
        });
}

// Verify User Role
function verifyUserRole(userId, role) {
    db.collection('users').doc(userId).get()
        .then(doc => {
            if (doc.exists && doc.data().role === role) {
                sessionStorage.setItem('userRole', role);
                window.location.href = 'dashboard.html';
            } else {
                alert('Access Denied: Incorrect Role');
                auth.signOut();
            }
        })
        .catch(error => {
            alert('Error fetching user data: ' + error.message);
        });
}

// Show Dashboard with Role Information
window.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole) {
        welcomeMessage.textContent = `Welcome, ${capitalize(userRole)}!`;
    } else {
        window.location.href = 'voyager.html'; // Redirect if no role found
    }
});

// Capitalize Role Name
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Logout User
function logoutUser() {
    auth.signOut().then(() => {
        sessionStorage.clear();
        window.location.href = 'voyager.html'; // Redirect to login page after logout
    }).catch(error => {
        alert('Error logging out: ' + error.message);
    });
}
