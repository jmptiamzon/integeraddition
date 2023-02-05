// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEX8Ltm25R5UcxLa2_R_yGzo-m76J-kFQ",
    authDomain: "integeradd-cnhs.firebaseapp.com",
    databaseURL: "https://integeradd-cnhs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "integeradd-cnhs",
    storageBucket: "integeradd-cnhs.appspot.com",
    messagingSenderId: "386856580338",
    appId: "1:386856580338:web:b7e7aa606bc2df78850c6b",
    measurementId: "G-T63N9ZFZ1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

var db = getDatabase();
var tries = 0;
var score = 0;
var addends1 = 0;
var addends2 = 0;
var total = 0;
var fullname = "";
var section = "";

document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('submitButton').addEventListener('click', submitAnswer);

function startQuiz() {
    document.getElementById('answerField').removeAttribute('disabled');
    document.getElementById('answerField').value = '';
    document.getElementById('submitButton').removeAttribute('disabled');
    document.getElementById('startButton').setAttribute('disabled', true);

    if (tries == 0) {
        document.getElementById('startButton').innerText = 'Next Question';
        document.getElementById('submitButton').style.display = 'inline';
        document.getElementById('addends1').style.display = 'inline';
        document.getElementById('addends2').style.display = 'inline';
        document.getElementById('operation').style.display = 'inline';
        document.getElementById('horizontalLine').style.display = 'block';
        document.getElementById('answerField').style.display = 'inline';
        document.getElementById('answerField').style.textAlign = 'center';
        document.getElementById('fullname').style.display = 'none';
        document.getElementById('section').style.display = 'none';
        fullname = document.getElementById('fullname').value;
        section = document.getElementById('section').value;
    }

    while (true) {
        addends1 = Math.floor(Math.random() * (10 + 10)) - 10;
        addends2 = Math.floor(Math.random() * (10 + 10)) - 10;

        if (addends1 == 0 || addends2 == 0) {
            continue;
        } else {
            break;
        }
    }

    document.getElementById('addends1').textContent = addends1 < 0 ? addends1 : "+" + addends1;
    document.getElementById('addends2').textContent = addends2 < 0 ? addends2 : "+" + addends2;
}

function submitAnswer() {
    document.getElementById('submitButton').setAttribute('disabled', true);
    document.getElementById('correctText').style.display = 'block';
    document.getElementById('correctText').style.fontWeight = 'bold';
    document.getElementById('startButton').removeAttribute('disabled');

    let submittedAnswer = document.getElementById('answerField').value;
    total = addends1 + addends2;

    if (submittedAnswer == total) {
        score++
        document.getElementById('answerField').value = submittedAnswer;
        document.getElementById('correctText').textContent = 'Correct answer: ' + total;
        document.getElementById('answerField').setAttribute('disabled', true);
    } else {
        document.getElementById('answerField').value = submittedAnswer;
        document.getElementById('correctText').textContent = 'Correct answer: ' + total;
        document.getElementById('answerField').setAttribute('disabled', true);
    }

    tries++;
    document.getElementById('score').textContent = score;

    if (tries == 10) {
        document.getElementById('startButton').setAttribute('disabled', true);
        document.getElementById('answerField').setAttribute('disabled', true);
        document.getElementById('startButton').setAttribute('disabled', true);
        
        insertDB();

        Swal.fire({
            title: 'Do you want to try again?',
            text: 'Your score is ' + score,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
                tries = 0;
                score = 0;
                addends1 = 0;
                addends2 = 0;
                total = 0;
                startQuiz();
            }
          });
    }
}

function insertDB() {
    set(ref(db, "Students/" + fullname), {
        Section: section,
        Score: score
    })
    .then(() => {
        console.log("successfully submitted");
    })
    .catch((error) => {
        console.log("not inserted" + error);
    });
}
