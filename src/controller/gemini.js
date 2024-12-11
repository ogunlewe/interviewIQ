'use strict';

const questions = document.getElementById("question-text");
const button = document.getElementById("submit-button");

let questionIndex = 0; 
let questionList = []; 

// Fetch questions from the API
function fetchQuestions() {
  fetch('https://devq-api.vercel.app/api/questions', {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched Data:", data);

      if (Array.isArray(data.beginner)) {
        questionList = data.beginner; 
        questionIndex = 0; 
        displayQuestions(0, 10);  // Display first 10 questions
      } else {
        questions.textContent = "No questions available.";
      }
    })
    .catch((err) => {
      console.error("Error fetching questions:", err);
      questions.textContent = "Failed to load questions.";
    });
}

// Display a set of 10 questions
function displayQuestions(startIndex, endIndex) {
  // Clear previous questions
  questions.innerHTML = '';

  for (let i = startIndex; i < endIndex && i < questionList.length; i++) {
    const currentQuestion = questionList[i];
    const questionText = currentQuestion.question;
    const additionalInfo = currentQuestion.answerHint;

    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionTextElement = document.createElement("p");
    questionTextElement.textContent = `Q${i + 1}: ${questionText}`;
    questionElement.appendChild(questionTextElement);

    const additionalInfoElement = document.createElement("p");
    additionalInfoElement.textContent = `Hint: ${additionalInfo}`;
    questionElement.appendChild(additionalInfoElement);

    questions.appendChild(questionElement);
  }

  // Increment questionIndex by 10 after displaying a set of 10 questions
  questionIndex = endIndex;
}

// Event listener for button click to load the next set of questions
button.addEventListener("click", () => {
  const nextIndex = questionIndex;
  const nextEndIndex = nextIndex + 10;
  displayQuestions(nextIndex, nextEndIndex);
});

// Initial fetch of questions
fetchQuestions();
