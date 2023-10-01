'use strict';

const initialGameData = {
  paints: {
    white: PaintFactory.createPaint(),
    black: PaintFactory.createPaint()
    // Add new colors here as needed, e.g., red: new Paint()
  },
  activePainting: new Painting(),
  activeColor: 'black',
  colors: ["black", "white"],
  update: 0.001
}

let gameData = {
  ...initialGameData
}

function selectPaint(color) {
  const thisPaint = gameData.paints[color];
  if (!thisPaint) {
    console.error(`Unknown color: ${color}`);
    return null;  // or throw an error, or handle this situation in some other way
  }
  return thisPaint
}

function clickPaint(color) {
  const thisPaint = selectPaint(color)
  thisPaint.clickPaint()
  updateVisuals()
}

function upgrade(upgradable, color) {
  const thisPaint = selectPaint(color)
  thisPaint.upgrade(upgradable)
  updateVisuals
}

function selectPaintForPainting(color) {
  gameData.activeColor = color;
  for (let i = 0; i < gameData.colors.length; i++) {
    const thisColor = gameData.colors[i]
    var thisElement = document.getElementById(thisColor + "PaintSelect");
    if (thisColor === color) {
      thisElement.style.border = '1px solid red';
    } else { 
      thisElement.style.border = 'none'; 
    }
  }
}

/**
 * Updates the timer for a given color if automation is enabled.
 */
function updateTimer(color) {
  const thisPaint = selectPaint(color)
  if (thisPaint.automation === true) {
    thisPaint.increaseTimer(10)
  }
}

/**
 * Moves the progress bar for each color based on the timer and speed values.
 */
function moveProgressBar() {
  // Iterate through all colors
  for (let i = 0; i < gameData.colors.length; i++) {
    const thisColor = gameData.colors[i];
    const thisPaint = selectPaint(thisColor);

    // Get the DOM element of the progress bar
    const thisElement = document.getElementById(`${thisColor}CurrentProgress`);
    // Calculate the width and update the element
    const width = Math.round(thisPaint.timer / thisPaint.speed.value * 100);
    thisElement.style.width = width + "%";
    // Optional: update the text within the progress bar
    //thisElement.innerHTML = width + "%";
  }
}

/**
 * Updates the visuals on the page to reflect the current game state.
 */
function updateVisuals() {
  for (let i = 0; i < gameData.colors.length; i++) {
    const thisColor = gameData.colors[i];
    const thisPaint = selectPaint(thisColor);

    const paintAmountElement = document.getElementById(`${thisColor}PaintAmount`);
    const upgradeBarElement = document.getElementById(`${thisColor}UpgradeBar`);
    const upgradeSpeedElement = document.getElementById(`${thisColor}UpgradeSpeed`);
    const upgradeClickElement = document.getElementById(`${thisColor}UpgradeClick`);

    paintAmountElement.innerHTML = `${thisPaint.amount} ${thisColor} Paint`
    upgradeBarElement.innerHTML = 
      `Upgrade ${thisColor} Paint (currently level ${thisPaint.bar.nUpgrades}) Cost: ${thisPaint.bar.upgradeCost} ${thisColor} Paint`; 
    upgradeSpeedElement.innerHTML =
      `Upgrade ${thisColor} Paint (currently level ${thisPaint.speed.nUpgrades}) Cost: ${thisPaint.speed.upgradeCost} ${thisColor} Paint`;
     upgradeClickElement.innerHTML =
      `Upgrade ${thisColor} Paint (currently level ${thisPaint.click.nUpgrades}) Cost: ${thisPaint.click.upgradeCost} ${thisColor} Paint`;

  }
}

/**
 * The function to be run at each interval tick.
 */
function onIntervalTick() {
  for (let i = 0; i < gameData.colors.length; i++) {
    updateTimer(gameData.colors[i]);
  }
  moveProgressBar();
  updateVisuals();
}

const timerLoop = window.setInterval(onIntervalTick, 10)

function hardReset() {

  // Reset the objects as that does not happen properly
  const newPaints = {
    white: PaintFactory.createPaint(),
    black: PaintFactory.createPaint()
    // Add new colors here as needed
  };

  const newActivePainting = new Painting()

  gameData = {
    ...initialGameData,
    paints: newPaints,
    activePainting: newActivePainting // Replace the paints property with the new object
  }
  updateVisuals()

}

function saveGame() {
  // Create a new object to store the serialized game data
  const serializedGameData = {
    ...gameData,
    paints: {}
  };

  // Serialize each Paint object and store it in the serializedGameData
  for (const color in gameData.paints) {
    serializedGameData.paints[color] = PaintFactory.toData(gameData.paints[color]);
  }
  serializedGameData.painting = Painting.toData(gameData.activePainting);

  // Store the serialized game data in local storage
  localStorage.setItem("paintByNumbersSave", JSON.stringify(serializedGameData));
}

function recreatePaintInstances(paintData) {
  const newPaintData = {};
  for (let color in paintData) {
    newPaintData[color] = PaintFactory.fromData(paintData[color]);
  }
  return newPaintData;
}

function loadGame() {
  const savedGame = localStorage.getItem('paintByNumbersSave');
  if (savedGame !== null) {
    const parsedData = JSON.parse(savedGame);
    const loadedPaints = recreatePaintInstances(parsedData.paints);
    gameData = {
      ...parsedData,
      paints: loadedPaints,
      activePainting: Painting.fromData(parsedData.activePainting)  // Assuming a similar static fromData method in Painting class
    };
  } else {
    gameData = initialGameData;
  }
}

window.onload = function() {
  loadGame();
  setupCanvas();
};

const saveGameLoop = setInterval(saveGame, 15000);

function setupCanvas() {

var canvas = document.getElementById("paintingCubes");

for (let h = 0; h < gameData.activePainting.height; h++) {
  // create a new div element
  var row = document.createElement("div");
  row.classList.add('grid');

  // and give it some content
  for (let w = 0; w < gameData.activePainting.width; w++) {
    var thisSquare = h * gameData.activePainting.width + w;
    var button = document.createElement("button");
    var thisSquareColorNumber = gameData.activePainting.colors[thisSquare];
    button.innerHTML = thisSquareColorNumber;
    button.setAttribute("squareNumber", gameData.activePainting.colors[thisSquare]);
    button.setAttribute("index", thisSquare);

    // Making sure the grid is shown properly when the game is loaded
    if (gameData.activePainting.isSquareFilled(thisSquare)) {
      button.style.backgroundColor = gameData.activePainting.colorNumberToName[thisSquareColorNumber];
      button.innerHTML = "";
    }
    row.appendChild(button);

    button.addEventListener("click", function (event) {
      var squareColorNumber = event.target.getAttribute("squareNumber");
      var activePaint = selectPaint(gameData.activeColor);
      var index = event.target.getAttribute("index");
    
      if (gameData.activeColor === gameData.activePainting.colorNumberToName[squareColorNumber] 
          && activePaint.amount > 0
          && !gameData.activePainting.isSquareFilled(index)) {
        gameData.activePainting.fillSquare(index);
        this.style.backgroundColor = gameData.activeColor;
        this.innerHTML = "";
        activePaint.amount -= 1;
      }
        });

    // add the newly created element and its content into the DOM
    canvas.appendChild(row);

  }

}

}

