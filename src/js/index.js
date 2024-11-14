
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





