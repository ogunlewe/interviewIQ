const sections = document.querySelectorAll('.fade-element');
const progressIndicator = document.getElementById('progress-indicator');
let currentSectionIndex = 0;
let isTransitioning = false;


function nextQuestion() {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentSection = sections[currentSectionIndex];
    currentSection.classList.add('hidden');

   
    currentSection.addEventListener('transitionend', function handler() {
        currentSection.removeEventListener('transitionend', handler);

      
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            sections[currentSectionIndex].classList.remove('hidden');

          
            updateProgressIndicator();
        }

        isTransitioning = false;
    });
}


function updateProgressIndicator() {
    const progressPercentage = ((currentSectionIndex + 1) / sections.length) * 100;
    progressIndicator.style.width = progressPercentage + '%';
}
