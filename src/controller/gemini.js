// async function generateQuestion(expertise) {
//     const apiKey = "AIzaSyDvzMwL9NNqQeNa1RKCJuBBL9lq57Vicp4";
//     const endpoint = "https://api.gemini.com/v1/questions";

//     const prompt = `Generate an interview question for a backend software engineer.`;

//     try {
//         const response = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 'Authorization': `Bearer${apiKey}`,
//                 'Content-Type': `application/json`
//             },
//             body: JSON.stringify({
//                 prompt: prompt,
//                 max_tokens: 100
//             })
//         });

//         if (!response.ok) {
//             throw new Error("Failed to generate questions");
//         };

//         const data = await response.json();
//         return data.question;
//     } catch (error) {
//         console.error("Error generating question", error);
//         return "Error generating question.";
//     }
// }

// generateQuestion("frontend").then(question => {
//     console.log("Generated Question:", question);

// });

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const expertise = document.getElementById("role");
// const feedback = document.getElementById("feedback");

// async function generateQuestion(expertise) {
//     const apiKey = "AIzaSyDvzMwL9NNqQeNa1RKCJuBBL9lq57Vicp4"
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `Generate an interview question for a ${expertise} software engineer`;

//     const result = await model.generateContentStream(prompt);

//     // Print text as it comes in.
//     for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     // process.stdout.write(chunkText);
//     feedback.innerText() = `this is it ` + chunkText ;  
//     }
// }


 const questions = document.getElementById("question-text");
// const button = document.getElementById("submit-button");
'use strict';

fetch('https://devq-api.vercel.app/api/questions')
.then(res => {
  return res.json();
})
.then(data => {
  
  console.log(data);
})

.catch(err => {
  console.log(err)
})
// Attach event listener to the button
// button.addEventListener("click", fetchAndDisplayQuestion);
