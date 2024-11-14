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

const { GoogleGenerativeAI } = require("@google/generative-ai");


// Function to generate the interview question
async function generateInterviewQuestion() {
    // Get the model configuration
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            candidateCount: 1,
            stopSequences: ["x"],
            maxOutputTokens: 20,
            temperature: 1.0,
        },
    });

    // Get the expertise input value
    const expertise = document.getElementById('expertise').value.trim();
    if (!expertise) {
        alert("Please enter an expertise!");
        return;
    }

    // Define the prompt
    const prompt = `Generate an interview question for a ${expertise} engineer`;

    try {
        // Generate content using the Gemini model
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            },
        });

        // Access the generated response
        const generatedQuestion = result.response;

        // Display the response in the feedback element
        const feedback = document.getElementById('feedback');
        feedback.innerText = generatedQuestion || "No question generated.";
    } catch (error) {
        console.error("Error generating question:", error);
        const feedback = document.getElementById('feedback');
        feedback.innerText = "Error generating question.";
    }
}

// Expose the function to the global scope
window.generateInterviewQuestion = generateInterviewQuestion;
