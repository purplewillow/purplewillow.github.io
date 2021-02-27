class Paint{
  constructor() {
    this.amount = 0
    this.paintPerClick = 1
    this.workerCost = 10
    this.workerAmount = 0
    this.timer = 0
    this.maxTimer = 5000
  }
}

const initialGameData = {
    bkPaint: new Paint(),
    wtPaint: new Paint(),
    update: 0.001
}

let gameData = {
  ...initialGameData
}

/* function makePaintAutomatically() {
  gameData.blackPaint += gameData.blackWorkerAmount
  gameData.whitePaint += gameData.whiteWorkerAmount
  updateVisuals()
} */

function makePaint(color) {
  if (color == 'black') {
    gameData.bkPaint.amount += gameData.bkPaint.paintPerClick
  }
  else if (color == 'white') {
    gameData.wtPaint.amount += gameData.wtPaint.paintPerClick
  }
  updateVisuals()
}

function buyPaintWorker(color) {
  if (color == 'black') {
    if (gameData.bkPaint.amount >=gameData.bkPaint.workerCost) {
      gameData.bkPaint.amount -= gameData.bkPaint.workerCost
      gameData.bkPaint.workerAmount += 1
      gameData.bkPaint.workerCost *= 2
    }
  }
  if (color == 'white') {
    if (gameData.wtPaint.amount >=gameData.wtPaint.workerCost) {
      gameData.wtPaint.amount -= gameData.wtPaint.workerCost
      gameData.wtPaint.workerAmount += 1
      gameData.wtPaint.workerCost *= 2
    }
  }
  updateVisuals()  
}

function updateVisuals() {
  document.getElementById("whitePaint").innerHTML = gameData.wtPaint.amount + " White Paint"
  document.getElementById("buyWhiteWorker").innerHTML = 
    "Upgrade White Paint (currently level " + 
    gameData.wtPaint.workerAmount + ") Cost: " + gameData.wtPaint.workerCost +
    " White Paint"
  document.getElementById("blackPaint").innerHTML = gameData.bkPaint.amount + " Black Paint"
  document.getElementById("buyBlackWorker").innerHTML = 
    "Upgrade Black Paint (currently level " + 
    gameData.bkPaint.workerAmount + ") Cost: " + gameData.bkPaint.workerCost +
      " Black Paint"
}

function moveProgressBar() {
  var elemBlack = document.getElementById("blackCurrentProgress");
  if (gameData.bkPaint.workerAmount > 0) {
    width = Math.round(gameData.bkPaint.timer / gameData.bkPaint.maxTimer * 100);
  }
  else {
    width = 0;
  }
  elemBlack.style.width = width + "%";
  elemBlack.innerHTML = width + "%";

  var elemWhite = document.getElementById("whiteCurrentProgress");
  if (gameData.wtPaint.workerAmount > 0) {
    width = Math.round(gameData.wtPaint.timer / gameData.wtPaint.maxTimer * 100);
  }
  else {
    width = 0;
  }
  elemWhite.style.width = width + "%";
  elemWhite.innerHTML = width + "%";
}

function hardReset() {
  gameData = {
    ...initialGameData
  }
  updateVisuals()
}

var timerLoop = window.setInterval(function() {
  if (gameData.bkPaint.workerAmount > 0) {
    gameData.bkPaint.timer += 10;
    if (gameData.bkPaint.timer >= gameData.bkPaint.maxTimer) {
      gameData.bkPaint.timer -= gameData.bkPaint.maxTimer
      gameData.bkPaint.amount += gameData.bkPaint.workerAmount
    }
  }
  if (gameData.wtPaint.workerAmount > 0) {
    gameData.wtPaint.timer += 10;
    if (gameData.wtPaint.timer >= gameData.wtPaint.maxTimer) {
      gameData.wtPaint.timer -= gameData.wtPaint.maxTimer
      gameData.wtPaint.amount += gameData.wtPaint.workerAmount
    }
  }
  moveProgressBar()
  updateVisuals()
  document.getElementById("testText").innerHTML = gameData.wtPaint.timer + "5"
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