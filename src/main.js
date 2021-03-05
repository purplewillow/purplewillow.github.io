const initialGameData = {
    blackPaint: new Paint(),
    whitePaint: new Paint(),
    colors: ["black", "white"],
    update: 0.001
}

let gameData = {
  ...initialGameData
}

function selectPaint(color) {
  if (color == 'black') {
    thisPaint = gameData.blackPaint
  }
  else if (color == 'white') {
    thisPaint = gameData.whitePaint
  }
  return thisPaint
}

function clickPaint(color) {
  thisPaint = selectPaint(color)
  thisPaint.clickPaint()
  updateVisuals()
}

function upgradeBar(color) {
  thisPaint = selectPaint(color)
  thisPaint.increaseBar()
  updateVisuals()  
}

function updateVisuals() {
  for (i = 0; i < gameData.colors.length; i++) {
    thisColor = gameData.colors[i]
    thisPaint = selectPaint(thisColor)
    document.getElementById(thisColor + "PaintAmount").innerHTML = thisPaint.amount + " " + thisColor + " Paint"
    document.getElementById(thisColor + "UpgradeBar").innerHTML = 
      "Upgrade " + thisColor + " Paint (currently level " + 
      thisPaint.bar.strength + ") Cost: " + thisPaint.bar.upgradeCost + " "
      thisColor + " Paint"
  }
}

function moveProgressBar() {
  for (i = 0; i < gameData.colors.length; i++) {
    var thisElement = document.getElementById(gameData.colors[i] + "CurrentProgress");
    var thisPaint = selectPaint(gameData.colors[i])
    width = Math.round(thisPaint.timer / thisPaint.speed.maxTimer * 100);
    thisElement.style.width = width + "%";
    //thisElement.innerHTML = width + "%";
  }
}

function hardReset() {
  gameData = {
    ...initialGameData
  }
  updateVisuals()
}

function updateTimer(color) {
  thisPaint = selectPaint(color)
  if (thisPaint.automation = true) {
    thisPaint.increaseTimer(10)
  }
}

var timerLoop = window.setInterval(function() {
  for (i = 0; i < gameData.colors.length; i++) {
    updateTimer(gameData.colors[i])
  }
  moveProgressBar()
  updateVisuals()

  document.getElementById("testText").innerHTML = 'do you see me?'
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
