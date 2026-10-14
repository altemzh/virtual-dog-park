// Virtual Dog Park – interactive "My Virtual Dog" feature.
// The encyclopedia above it is plain HTML and CSS.

// ---------- Rules ----------
const MAX_NAME_LENGTH = 20;
const MAX_HAPPINESS = 100;
const MIN_HAPPINESS = 0;
const HAPPINESS_PER_ACTION = 10; // Feed and Play each add 10
const HAPPINESS_LOST_PER_DAY = 5; // Next Day removes 5

// The saved dog lives in this browser's localStorage under this key.
const STORAGE_KEY = "virtualDogParkPetV1";

// Which picture to show for each breed
const BREED_IMAGES = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

// ---------- Find the page elements we need ----------
const adoptForm = document.getElementById("adopt-form");
const breedSelect = document.getElementById("breed-select");
const nameInput = document.getElementById("dog-name");
const nameMessage = document.getElementById("name-message");

const dogPanel = document.getElementById("dog-panel");
const dogImage = document.getElementById("dog-image");
const nameDisplay = document.getElementById("dog-name-display");
const breedDisplay = document.getElementById("dog-breed-display");
const dayDisplay = document.getElementById("dog-day-display");
const stageDisplay = document.getElementById("dog-stage-display");
const happinessDisplay = document.getElementById("dog-happiness-display");
const growthText = document.getElementById("growth-text");
const growthBar = document.getElementById("growth-bar");

const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");
const nextDayButton = document.getElementById("next-day-button");
const startOverButton = document.getElementById("start-over-button");

// ---------- State ----------
// null means "no dog yet". After adoption it holds name, breed, day and happiness.
let dog = null;

// ---------- Growth rule (the one shared place that decides the stage) ----------
// Day 1 -> Puppy, Days 2-3 -> Young Dog, Day 4 onward -> Adult Dog
function stageFor(day) {
  if (day <= 1) {
    return "Puppy";
  }
  if (day <= 3) {
    return "Young Dog";
  }
  return "Adult Dog";
}

// ---------- Saving and loading ----------

// Save the current dog to localStorage (as a JSON text string).
function saveDog() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dog));
}

// Load the saved dog, if there is one. Returns null if nothing valid is saved.
function loadDog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return null;
  }
  try {
    const data = JSON.parse(saved);
    // Only accept data that looks like a real dog
    if (typeof data.name === "string" && BREED_IMAGES[data.breed] &&
        Number.isInteger(data.day) && data.day >= 1 &&
        typeof data.happiness === "number") {
      data.happiness = Math.min(MAX_HAPPINESS, Math.max(MIN_HAPPINESS, data.happiness));
      return data;
    }
  } catch (error) {
    // The saved text was not valid JSON – ignore it.
  }
  return null;
}

// Remove the saved dog completely.
function deleteSavedDog() {
  localStorage.removeItem(STORAGE_KEY);
}

// ---------- Actions ----------

// Create a brand-new dog: Day 1, Puppy, happiness 50.
function adoptDog(name, breed) {
  dog = {
    name: name,
    breed: breed,
    day: 1,
    happiness: 50
  };
  saveDog();
  render();
}

// Change happiness by an amount, keeping it between 0 and 100, then save.
function changeHappiness(amount) {
  dog.happiness = Math.min(MAX_HAPPINESS, Math.max(MIN_HAPPINESS, dog.happiness + amount));
  saveDog();
  render();
}

// Move to the next day: +1 day and -5 happiness (never below 0), then save.
function nextDay() {
  dog.day = dog.day + 1;
  changeHappiness(-HAPPINESS_LOST_PER_DAY); // this also saves and redraws
}

// Ask first. Cancel keeps the dog; OK deletes the saved progress.
function startOver() {
  const confirmed = window.confirm(
    "Start over? This will delete " + dog.name + " and all saved progress."
  );
  if (!confirmed) {
    return; // keep the dog
  }
  deleteSavedDog();
  dog = null;
  adoptForm.reset();
  nameMessage.textContent = "";
  render();
}

// ---------- Drawing the page ----------

// Show either the adoption form or the dog panel, and fill in the dog's details.
// textContent is used so a name like "<b>Rex</b>" is shown as plain text, never as HTML.
function render() {
  if (dog === null) {
    adoptForm.hidden = false;
    dogPanel.hidden = true;
    return;
  }
  adoptForm.hidden = true;
  dogPanel.hidden = false;

  const stage = stageFor(dog.day);

  nameDisplay.textContent = dog.name;
  breedDisplay.textContent = dog.breed;
  dayDisplay.textContent = dog.day;
  stageDisplay.textContent = stage;
  happinessDisplay.textContent = dog.happiness;

  // Growth is shown three ways: words, a bar, and the picture size.
  growthText.textContent = stage;
  const stageNumber = { "Puppy": 1, "Young Dog": 2, "Adult Dog": 3 }[stage];
  growthBar.setAttribute("aria-valuenow", stageNumber);
  growthBar.setAttribute("aria-valuetext", stage);
  dogPanel.classList.remove("stage-puppy", "stage-young", "stage-adult");
  dogPanel.classList.add(["stage-puppy", "stage-young", "stage-adult"][stageNumber - 1]);

  dogImage.src = BREED_IMAGES[dog.breed];
  dogImage.alt = "Illustration of " + dog.name + " the " + dog.breed + ", shown as a " + stage;
}

// ---------- Event listeners ----------

// When the Adopt button is pressed, check the name and adopt the dog.
adoptForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim(); // remove spaces at the start and end

  if (name === "") {
    nameMessage.textContent = "Please enter a name for your dog.";
    nameInput.focus();
    return;
  }
  if (name.length > MAX_NAME_LENGTH) {
    nameMessage.textContent = "The name can be at most 20 characters.";
    nameInput.focus();
    return;
  }

  nameMessage.textContent = "";
  adoptDog(name, breedSelect.value);
});

feedButton.addEventListener("click", function () {
  changeHappiness(HAPPINESS_PER_ACTION);
});

playButton.addEventListener("click", function () {
  changeHappiness(HAPPINESS_PER_ACTION);
});

nextDayButton.addEventListener("click", nextDay);

startOverButton.addEventListener("click", startOver);

// ---------- Start ----------
// Restore a saved dog (if any), then draw the page.
dog = loadDog();
render();
