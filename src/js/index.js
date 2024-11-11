// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.API_KEY );
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//       mimeType,
//     },
//   };
// }

// const prompt = "Describe how this product might be manufactured.";
// const result = await model.generateContent([prompt]);
// console.log(result.response.text());

async function setUserRole(userId, role) {
    const userRef = db.collection('users').doc(userId);
    
    await userRef.set({
      preferredRole: role,
      // Other user data (like name, email, etc.)
    });
  }

  // fetch the data for the user
  async function getUserInterviewQuestions(userId) {
    const questionsRef = db.collection('interviewQuestions').doc(userId);
    const doc = await questionsRef.get();
  
    if (!doc.exists) {
      console.log('No questions found for this user');
      return [];
    }
  
    return doc.data().questions;
  }
  

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})





