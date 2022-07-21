var element = document.querySelector("#main");
var firstScreen = document.querySelector(".firstscreen");
var restartbtn = document.querySelector(".restart");
var footer = document.querySelector(".footer");
var selectAll = document.querySelectorAll(".cube");
var h5 = document.querySelector(".h5_id");
var thumbnail = document.querySelector(".thumb");
var cellsX = [];
var cellsO = [];
var cellsIndicator = 0;
var gameOver = false;
// Win possibilites Checker
var winCheckArr = [
  ["div1", "div2", "div3"],
  ["div4", "div5", "div6"],
  ["div7", "div8", "div9"],
  ["div1", "div4", "div7"],
  ["div2", "div5", "div8"],
  ["div3", "div6", "div9"],
  ["div1", "div5", "div9"],
  ["div3", "div5", "div7"],
];

// First Screen
firstScreen.style = "margin-top: auto;";
document.querySelector(".restart").style = "display:none";
var count = 0;
element.style = "display: none;";

// Start Game
function startGame() {
  thumbnail.style = "display: none;";
  h5.style = "display: none";
  firstScreen.style = "text-align: center;";
  element.style = "display: block;";
  document.querySelector(".btns").style = "display:none";

  for (let cell of selectAll) {
    cell.addEventListener("click", clickFunc);
  }
}
// Adding x or o
function clickFunc(event) {
  let click = event.target;
  click.removeEventListener("click", clickFunc);
  switch (count) {
    case 0:
      var audio = new Audio("audio/sound.mp3");
      audio.play();
      event.target.innerHTML = `<img class="img" src="imgs/x.png"/>`;
      cellsX.push(event.target.id);
      count++;
      cellsIndicator++;
      break;
    case 1:
      var audio = new Audio("audio/sound2.mp3");
      audio.play();
      event.target.innerHTML = `<img class="img" src="imgs/o.png"/>`;
      cellsO.push(event.target.id);
      count--;
      cellsIndicator++;
      break;
  }
  winCheck();
}

// Win Checker
var winArr;
var winCheck = () => {
  var winX;
  var winO;
  for (let i = 0; i < winCheckArr.length; i++) {
    winX = () => {
      if (winCheckArr[i].every((item) => cellsX.includes(item))) {
        winArr = winCheckArr[i];
        return true;
      } else {
        return false;
      }
    };

    winO = () => {
      if (winCheckArr[i].every((item) => cellsO.includes(item))) {
        winArr = winCheckArr[i];
        return true;
      } else {
        return false;
      }
    };

    if (winX() && !gameOver) {
      xHasWon();
      break;
    } else if (winO() && !gameOver) {
      oHasWon();
    }
  }

  if (cellsIndicator == 9 && !winO() && !winX() && !gameOver) {
    itsATie();
  }
};

var xHasWon = () => {
  gameOver = true;
  for (let cell of winArr) {
    document.getElementById(cell).style.backgroundColor = "#ff7c7a";
  }
  setTimeout(() => {
    var audio = new Audio("audio/win.mp3");
    audio.play();
    element.style = "display: none;";
    document.querySelector(".restart").style = "display: block";
    document.getElementById("msg").innerHTML += `Horray!`;
    document.getElementById("msg2").innerHTML += `Player 1 Won!`;
    restartbtn.innerHTML = `<button id="btns" class="btn btn-success mb-3" onclick="window.location.href='index.html'"><i class="fa-solid fa-arrows-rotate text-white"></i> Restart</button> `;
  }, 550);
};

var oHasWon = () => {
  gameOver = true;
  for (let cell of winArr) {
    document.getElementById(cell).style.backgroundColor = "#ffd041";
  }
  setTimeout(() => {
    var audio = new Audio("audio/win.mp3");
    audio.play();
    element.style = "display: none;";
    document.querySelector(".restart").style = "display: block";
    document.getElementById("msg").innerHTML += `Horray!`;
    document.getElementById("msg2").innerHTML += `Player 2 Won!`;
    restartbtn.innerHTML = `<button id="btns" class="btn btn-success mb-3" onclick="window.location.href='index.html'"><i class="fa-solid fa-arrows-rotate text-white"></i> Restart</button> `;
  }, 550);
};

var itsATie = () => {
  gameOver = true;
  cellsIndicator = 0;
  setTimeout(() => {
    var audio = new Audio("audio/even.mp3");
    audio.play();
    element.style = "display: none;";
    document.querySelector(".restart").style = "display: block";
    document.getElementById("msg").innerHTML = `Ohhh =/`;
    document.getElementById("msg2").innerHTML = `Seems Like a Tie`;
    restartbtn.innerHTML = `<button id="btns" class="btn btn-success mb-3" onclick="window.location.href='index.html'"><i class="fa-solid fa-arrows-rotate text-white"></i> Try Agian</button> `;
  }, 450);
};
