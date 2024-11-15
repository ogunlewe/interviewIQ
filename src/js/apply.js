const sections = document.querySelectorAll(".fade-element");
const icons = document.querySelectorAll(".icon");
const progressIndicator = document.getElementById("progress-indicator");
const progressStep = document.getElementById("progress-step");
const  myButtons = document.querySelectorAll(".my-buttons");




let currentSectionIndex = 0;
let isTransitioning = false;

function nextQuestion() {
  if (isTransitioning) return;
  isTransitioning = true;

  const currentSection = sections[currentSectionIndex];
  const currentIcon = icons[currentSectionIndex];

  currentSection.classList.add("hidden");
  currentIcon.classList.remove("show");

  currentSection.addEventListener("transitionend", function handler() {
    currentSection.removeEventListener("transitionend", handler);

    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      const nextSection = sections[currentSectionIndex];
      const nextIcon = icons[currentSectionIndex];

      nextSection.classList.remove("hidden");
      nextIcon.classList.add("show");

      updateProgressIndicator();
    }

    isTransitioning = false;
  });
}

function updateProgressIndicator() {
  const progressPercentage =
    ((currentSectionIndex + 1) / sections.length) * 100;
  progressIndicator.style.width = `${progressPercentage}%`;

  const containerWidth = document.querySelector(
    ".progress-container"
  ).offsetWidth;
  const stepPosition = (progressPercentage / 100) * containerWidth;
  progressStep.style.transform = `translateX(${stepPosition - 15}px)`;
}




const originalColors = new Map();


myButtons.forEach(button => {

  originalColors.set(button, window.getComputedStyle(button).color);

  button.onclick = function() {

    myButtons.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.style.color = originalColors.get(otherButton);
      }
    });

    button.style.background = "green";
    button.style.color = "white";
  }
});
