const initialGameData = {
    blackPaint: 0,
    whitePaint: 0,
    paintPerClick: 1,
    blackWorkerCost: 10,
    blackWorkerAmount: 0,
    whiteWorkerCost: 10,
    whiteWorkerAmount: 0,
    blackPaintTimer: 0,
    blackPaintTimerMax: 5000,
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

function moveProgressBar() {
  var elem = document.getElementById("blackCurrentProgress");
  if (gameData.blackWorkerAmount > 0) {
    width = Math.round(gameData.blackPaintTimer / gameData.blackPaintTimerMax * 100);
  }
  else {
    width = 0;
  }
  elem.style.width = width + "%";
  elem.innerHTML = width + "%";
}

function hardReset() {
  gameData = {
    ...initialGameData
  }
  updateVisuals()
}

var timerLoop = window.setInterval(function() {
  if (gameData.blackWorkerAmount > 0) {
    gameData.blackPaintTimer += 10;
    if (gameData.blackPaintTimer >= gameData.blackPaintTimerMax) {
      gameData.blackPaintTimer -= gameData.blackPaintTimerMax
      gameData.blackPaint += gameData.blackWorkerAmount
    }
  }
  moveProgressBar()
  updateVisuals()
}, 10)

//var mainGameLoop = window.setInterval(function() {
//    makePaintAutomatically()
//    moveProgressBar()
//  }, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
  }, 15000)

var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
  if (savegame !== null) {
    gameData = savegame
    if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
  }