// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgkcWA8_fvgDNrBCqkM6fAWTxF8q1wuGE",
  authDomain: "mobileapp-d293a.firebaseapp.com",
  databaseURL: "https://mobileapp-d293a-default-rtdb.firebaseio.com",
  projectId: "mobileapp-d293a",
  storageBucket: "mobileapp-d293a.firebasestorage.app",
  messagingSenderId: "98407091836",
  appId: "1:98407091836:web:2c4c80a2b8dcb5ca2ec3f9",
  measurementId: "G-FWDFCE2WLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseConfig = {
  apiKey: "AIzaSyDgkcWA8_fvgDNrBCqkM6fAWTxF8q1wuGE",
  authDomain: "mobileapp-d293a.firebaseapp.com",
  databaseURL: "https://mobileapp-d293a-default-rtdb.firebaseio.com",
  projectId: "mobileapp-d293a",
  storageBucket: "mobileapp-d293a.appspot.com",
  messagingSenderId: "98407091836",
  appId: "1:98407091836:web:2c4c80a2b8dcb5ca2ec3f9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Handle form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let newRef = db.ref("contacts").push();

    newRef.set({
        id: newRef.key,
        name: name,
        email: email,
        message: message
    });

    document.getElementById("contactForm").reset();
}

// REAL-TIME LISTENER
db.ref("contacts").on("value", (snapshot) => {
    let output = "";
    snapshot.forEach((child) => {
        let data = child.val();

        output += `
            <div class="msg-box">
                <strong>Name:</strong> ${data.name}<br>
                <strong>Email:</strong> ${data.email}<br>
                <strong>Message:</strong> ${data.message}<br>

                <div class="actions">
                    <button onclick="editMsg('${data.id}','${data.name}','${data.email}','${data.message}')">Edit</button>
                    <button onclick="delMsg('${data.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    document.getElementById("messages").innerHTML = output;
});

// DELETE MESSAGE
function delMsg(id) {
    db.ref("contacts/" + id).remove();
}

// EDIT MESSAGE
function editMsg(id, oldName, oldEmail, oldMsg) {
    let newName = prompt("Edit Name:", oldName);
    let newEmail = prompt("Edit Email:", oldEmail);
    let newMessage = prompt("Edit Message:", oldMsg);

    db.ref("contacts/" + id).update({
        name: newName,
        email: newEmail,
        message: newMessage
    });
}
