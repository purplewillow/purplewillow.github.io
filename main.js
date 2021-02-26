const initialGameData = {
    blackPaint: 0,
    whitePaint: 0,
    paintPerClick: 1,
    blackWorkerCost: 10,
    blackWorkerAmount: 0,
    whiteWorkerCost: 10,
    whiteWorkerAmount: 0,
    update: 0.001
}

let gameData = {
  ...initialGameData
}

function makePaintAutomatically() {
  gameData.blackPaint += gameData.blackWorkerAmount
  gameData.whitePaint += gameData.whiteWorkerAmount
  updateVisuals()
}

function makePaint(color) {
  if (color == 'black') {
    gameData.blackPaint += gameData.paintPerClick
  }
  else if (color == 'white') {
    gameData.whitePaint += gameData.paintPerClick
  }
  updateVisuals()
}

function buyPaintWorker(color) {
  if (color == 'black') {
    if (gameData.blackPaint >=gameData.blackWorkerCost) {
      gameData.blackPaint -= gameData.blackWorkerCost
      gameData.blackWorkerAmount += 1
      gameData.blackWorkerCost *= 2
    }
  }
  if (color == 'white') {
    if (gameData.whitePaint >=gameData.whiteWorkerCost) {
      gameData.whitePaint -= gameData.whiteWorkerCost
      gameData.whiteWorkerAmount += 1
      gameData.whiteWorkerCost *= 2
    }
  }
  updateVisuals()  
}

function updateVisuals() {
  document.getElementById("whitePaint").innerHTML = gameData.whitePaint + " White Paint"
  document.getElementById("buyWhiteWorker").innerHTML = 
    "Upgrade White Paint (currently level " + 
    gameData.whiteWorkerAmount + ") Cost: " + gameData.whiteWorkerCost +
    " White Paint"
    document.getElementById("blackPaint").innerHTML = gameData.blackPaint + " Black Paint"
    document.getElementById("buyBlackWorker").innerHTML = 
      "Upgrade Black Paint (currently level " + 
      gameData.blackWorkerAmount + ") Cost: " + gameData.blackWorkerCost +
      " Black Paint"
}

function hardReset() {
  gameData = {
    ...initialGameData
  }
  updateVisuals()
}

var mainGameLoop = window.setInterval(function() {
    makePaintAutomatically()
  }, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
  }, 15000)

var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
  if (savegame !== null) {
    gameData = savegame
    if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
  }