
'use strict';

const questions = document.getElementById("question-text");
const button = document.getElementById("submit-button")
function fetchAndDisplayQuestion() {
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

        questions.innerHTML = "";


        data.beginner.forEach((item, index) => {

          const questionText = item.question;
          const additionalInfo = item.answerHint;


          const questionElement = document.createElement("div");
          questionElement.className = "question";


          const questionTextElement = document.createElement("p");
          questionTextElement.textContent = `Q${index + 1}: ${questionText}`;
          questionElement.appendChild(questionTextElement);


          const additionalInfoElement = document.createElement("p");
          additionalInfoElement.textContent = `Info: ${additionalInfo}`;
          questionElement.appendChild(additionalInfoElement);


          questions.appendChild(questionElement);
        });
      } else {
        questions.textContent = "No questions available.";
      }
    })
    .catch((err) => {
      console.error("Error fetching questions:", err);
      questions.textContent = "Failed to load questions.";
    });

}


button.addEventListener("click", fetchAndDisplayQuestion);
