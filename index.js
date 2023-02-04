var tries = 0;
var score = 0;
var addends1 = 0;
var addends2 = 0;
var total = 0;

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
    document.getElementById('startButton').removeAttribute('disabled');

    let submittedAnswer = document.getElementById('answerField').value;
    total = addends1 + addends2;

    if (submittedAnswer == total) {
        score++
        document.getElementById('answerField').value = "Answer: " + total;
        document.getElementById('answerField').setAttribute('disabled', true);
    } else {
        document.getElementById('answerField').value = "Correct answer is: " + total;
        document.getElementById('answerField').setAttribute('disabled', true);
    }

    tries++;
    document.getElementById('score').textContent = score;

    if (tries == 5) {
        document.getElementById('startButton').setAttribute('disabled', true);
        document.getElementById('answerField').setAttribute('disabled', true);
        document.getElementById('startButton').setAttribute('disabled', true);

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