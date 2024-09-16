//declare default grid size
let defaultNumGrid = 16;

document.addEventListener('DOMContentLoaded', setDefaultGrid);
//button
const resetBtn = document.querySelector("#reset-btn");
const greenBtn = document.querySelector("#green-btn");
const blackBtn = document.querySelector("#black-btn");
const randomBtn = document.querySelector("#random-btn");
const submitBtn = document.querySelector("#submit-btn");
const eraseBtn = document.querySelector("#erase-btn");


const userInput = document.querySelector("#user-number");
let copyUserInput = document.querySelector("#copy-input");
const hint = document.querySelector("#hint");

//pad
const gamePad = document.querySelector(".gamePad");
const headerBox = document.querySelector(".header");
const buttons = document.querySelectorAll(".button")


resetBtn.addEventListener("click", resetGridColour)
userInput.addEventListener("focus", guideHint);
userInput.addEventListener("keyup", mirrorUserInput);
submitBtn.addEventListener("click", makeCells);
greenBtn.addEventListener("click",applyGreenHoverEffect);
blackBtn.addEventListener("click", applyHoverEffect)
randomBtn.addEventListener("click", applyRandomHoverEffect);
eraseBtn.addEventListener("click", eraseCellColour);


makeCells();

//delare fun audio 
audio = new Audio("Sound Effect/8bit-music-for-game-68698.mp3");
let isPlaying = false;


//Add fun music upon cliking the banner
headerBox.addEventListener("click", () => {
  if (!audio) {
    audio = new Audio("Sound Effect/8bit-music-for-game-68698.mp3");
    audio.play();
    isPlaying = true;
  } else if (isPlaying) {
    audio.pause();
    audio.currentTime = 0; // Reset the audio to the beginning
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
});


buttons.forEach(button => {
  button.addEventListener("click", () => {
    clickSound = new Audio("Sound Effect/mixkit-video-game-retro-click-237.wav")
    clickSound.play();
  });
});


function guideHint(){
  hint.textContent = "Enter a desired numbed between 2 to 99.";
}

function mirrorUserInput(){
  if (userInput.value.trim()===""){
    copyUserInput.textContent = ""
  }
  else{
    copyUserInput.textContent = ` X${userInput.value} `; 
  }
}


function setDefaultGrid(){
  //review this
  for (let i = 0; i < defaultNumGrid; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    gamePad.appendChild(row);

    for (let z = 0; z <defaultNumGrid; z++) {
      let column = document.createElement("div");
      column.classList.add("column");
      row.appendChild(column); // Append column to row, not gamePad
    }
  }
  applyHoverEffect();
  hint.textContent ="";
}

function makeCells() {
  let number = parseInt(userInput.value);
  if (isNaN(number) || number < 2 || number > 99) {
    hint.textContent = "Invalid input. Please enter a number between 2 and 99.";
    number = defaultNumGrid; // Use default grid size
    }
  else {
    hint.textContent = "";
    copyUserInput.textContent = "";
    userInput.value = "";
  

  // Clear existing grid  
    gamePad.innerHTML = "";

  // Create grid
  for (let i = 0; i < number; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    gamePad.appendChild(row);

    for (let z = 0; z < number; z++) {
      let column = document.createElement("div");
      column.classList.add("column");
      row.appendChild(column); // Append column to row, not gamePad
    }
   }
  }
  applyHoverEffect();
}


function applyHoverEffect() {
  let cells = document.querySelectorAll(".gamePad .column");
  cells.forEach(item => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#232931";
    });
  });
}

//why cant i  declare let cells = document.querySelectorAll(".gamePad .column"); in global scope. ask

function applyGreenHoverEffect() {
  // resetGridColour();//clear previous play
  let cells = document.querySelectorAll(".gamePad .column");
  cells.forEach(item => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "rgb(37, 231, 150)";
    });
  });
}

function applyRandomHoverEffect() {
  
  let cells = document.querySelectorAll(".gamePad .column");
  cells.forEach(item => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = generateRandomColour();
    });
  });
}

function resetGridColour(){
  let cells = document.querySelectorAll(".gamePad .column");
  cells.forEach(item => {
    item.style.backgroundColor = "white";
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#232931";
    });
  })
}

function eraseCellColour() {
  let cells = document.querySelectorAll(".gamePad .column");
  cells.forEach(item => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "white";
    });
  });
}

function generateRandomColour() {
  let lettersArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  let colour = "#";
  
  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * lettersArray.length);
    colour = colour+ lettersArray[randomIndex];
  }
  return colour;
}

