const initialGameData = {
  blackPaint: new Paint(),
  whitePaint: new Paint(),
  activePainting: new Painting(),
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

function upgrade(upgradable, color) {
  thisPaint = selectPaint(color)
  thisPaint.upgrade(upgradable)
  updateVisuals
}

function updateVisuals() {
  for (i = 0; i < gameData.colors.length; i++) {
    thisColor = gameData.colors[i]
    thisPaint = selectPaint(thisColor)
    document.getElementById(thisColor + "PaintAmount").innerHTML = thisPaint.amount + " " + thisColor + " Paint"
    document.getElementById(thisColor + "UpgradeBar").innerHTML =
      "Upgrade " + thisColor + " Paint (currently level " +
      thisPaint.bar.nUpgrades + ") Cost: " + thisPaint.bar.upgradeCost + " "
    thisColor + " Paint"
    document.getElementById(thisColor + "UpgradeSpeed").innerHTML =
      "Upgrade " + thisColor + " Paint (currently level " +
      thisPaint.speed.nUpgrades + ") Cost: " + thisPaint.speed.upgradeCost + " "
    thisColor + " Paint"
    document.getElementById(thisColor + "UpgradeClick").innerHTML =
      "Upgrade " + thisColor + " Paint (currently level " +
      thisPaint.click.nUpgrades + ") Cost: " + thisPaint.click.upgradeCost + " "
    thisColor + " Paint"
  }
}

function moveProgressBar() {
  for (i = 0; i < gameData.colors.length; i++) {
    var thisElement = document.getElementById(gameData.colors[i] + "CurrentProgress");
    var thisPaint = selectPaint(gameData.colors[i])
    width = Math.round(thisPaint.timer / thisPaint.speed.value * 100);
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

var timerLoop = window.setInterval(function () {
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

var saveGameLoop = window.setInterval(function () {
  localStorage.setItem("painByNumbersSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("paintByNumbersSave"))
if (savegame !== null) {
  gameData = savegame
  if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

var heightPainting = 5;
var widthPainting = 5;

var canvas = document.getElementById("paintingCubes");

for (var h = 0; h < gameData.activePainting.height; h++) {
  // create a new div element
  var row = document.createElement("div");
  row.classList.add('grid');

  // and give it some content
  for (var w = 0; w < gameData.activePainting.width; w++) {
    var thisSquare = h*gameData.activePainting.width + w;
    var button = document.createElement("button");
    button.innerHTML = gameData.activePainting.colors[thisSquare];
    button.setAttribute("squareNumber", gameData.activePainting.colors[thisSquare])
    row.appendChild(button);

    button.addEventListener("click", function (event) {
      // var btn = event.target;
      if (this.getAttribute("squareNumber") == 0) {
        this.style.backgroundColor = "white"};
        this.innerHTML = "";
      if (this.getAttribute("squareNumber") == 1) {
        this.style.backgroundColor = "red"};
        this.innerHTML = "";
    });

    // add the newly created element and its content into the DOM
    canvas.appendChild(row);

  }

}
