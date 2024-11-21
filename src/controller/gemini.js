'use strict';

const questions = document.getElementById("question-text");
const button = document.getElementById("submit-button");

let questionIndex = 0; // Track the current question index
let questionList = []; // Store fetched questions


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
        displayQuestion(); 
      } else {
        questions.textContent = "No questions available.";
      }
    })
    .catch((err) => {
      console.error("Error fetching questions:", err);
      questions.textContent = "Failed to load questions.";
    });
}


function displayQuestion() {
  if (questionIndex < questionList.length) {
    const currentQuestion = questionList[questionIndex];
    const questionText = currentQuestion.question;
    const additionalInfo = currentQuestion.answerHint;

   
    questions.innerHTML = "";

    
    const questionElement = document.createElement("div");
    questionElement.className = "question";

    const questionTextElement = document.createElement("p");
    questionTextElement.textContent = `Q${questionIndex + 1}: ${questionText}`;
    questionElement.appendChild(questionTextElement);

    const additionalInfoElement = document.createElement("p");
    additionalInfoElement.textContent = `Hint: ${additionalInfo}`;
    questionElement.appendChild(additionalInfoElement);

    questions.appendChild(questionElement);

    
    questionIndex++;
  } else {
    questions.textContent = "No more questions available.";
  }
}


button.addEventListener("click", () => {
  if (questionList.length === 0) {
    fetchQuestions(); 
  } else {
    displayQuestion(); 
  }
});
