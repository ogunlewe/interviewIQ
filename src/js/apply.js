
const sections = document.querySelectorAll('.fade-element');
let currentSectionIndex = 0;


function nextQuestion() {
    
    sections[currentSectionIndex].classList.add('hidden');

    
    if (currentSectionIndex < sections.length - 1) {
       
        currentSectionIndex++;

        
        setTimeout(() => {
            sections[currentSectionIndex].classList.remove('hidden');
        }, 500);
    }
}
