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
    window.location.href = "dashboard.html";
  }
});



let db;
let selectedLevel = ''; // Variable to store the selected difficulty level

// Initialize IndexedDB
function initDB() {
    const request = indexedDB.open('userDatabase', 1);

    request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event.target.error);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('IndexedDB initialized');
        displayStoredValue();
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('userStore', { keyPath: 'id' });
        console.log('Object store created');
    };
}

// Save data to IndexedDB
function saveToIndexedDB() {
    const inputField = document.getElementById('name');
    const userInput = inputField.value.trim();

    if (userInput && selectedLevel) {
        const transaction = db.transaction(['userStore'], 'readwrite');
        const objectStore = transaction.objectStore('userStore');

        const data = {
            id: 1,
            value: userInput,
            level: selectedLevel
        };

        const request = objectStore.put(data);

        request.onsuccess = () => {
            console.log('Data Saved:', data);
            displayStoredValue();
            inputField.value = ''; // Clear input field after saving
        };

        request.onerror = (event) => {
            console.error('Error saving data:', event.target.error);
        };
    } else {
        alert('Please enter a name and select a difficulty level');
    }
}

// Display stored data from IndexedDB
function displayStoredValue() {
    const transaction = db.transaction(['userStore'], 'readonly');
    const objectStore = transaction.objectStore('userStore');

    const request = objectStore.get(1);

    request.onsuccess = (event) => {
        const result = event.target.result;
        const nameDisplay = document.getElementById('user-email');
        const levelDisplay = document.getElementById('user-level');

        if (result) {
            nameDisplay.textContent = `Name: ${result.value}`;
            levelDisplay.textContent = `Difficulty Level: ${result.level}`;
        } else {
            nameDisplay.textContent = 'Name: Not available';
            levelDisplay.textContent = 'Difficulty Level: Not available';
        }
    };

    request.onerror = (event) => {
        console.error('Error retrieving data:', event.target.error);
    };
}


function selectDifficulty(event) {
    selectedLevel = event.target.getAttribute('section-2');
    console.log('Selected Level:', selectedLevel);
}


window.addEventListener('load', () => {
    initDB();

    document.getElementById('button1').addEventListener('click', selectDifficulty, saveToIndexedDB);
    document.getElementById('button2').addEventListener('click', selectDifficulty, saveToIndexedDB);
    document.getElementById('button3').addEventListener('click', selectDifficulty, saveToIndexedDB);

    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', saveToIndexedDB);
});