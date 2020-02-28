// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
let myTable = [];
let random = 1;
let selected = "";
let score = 0;
let highscore = 0;
let gameStarted = false;
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("resetBtn");

var rows = document.getElementById("myTable").rows;
for (var i = 0; i < rows.length; i++) {
  for (var j = 0; j < rows[i].cells.length; j++) {
    myTable.push(rows[i].cells[j]);
  }
}

document.addEventListener("click", e => {
  if (e.target.className === "mole" && gameStarted) {
    playSound();
    genMole();
    score++;
    document.getElementById("score").innerHTML = score;
  }
});

function startGame() {
  document.getElementById("scoreboard").classList.remove("hide");
  document.getElementById("playBtn").classList.add("hide");
  gameStarted = true;
  timer();
}

function resetGame() {
  selected.removeChild(selected.childNodes[0]);
  selected = "";
  score = 0;
  document.getElementById("score").innerHTML = score;
  timer();
}

function timer() {
  var countDown = new Countdown(timerEl, 10);
  countDown.start();
  genMole();
}

function genMole() {
  var el = myTable[genNum()];
  el.appendChild(genImg());
  if (selected !== "") selected.removeChild(selected.childNodes[0]);
  selected = el;
}

function genImg() {
  var genImgTag = document.createElement("img");
  genImgTag.src = "./mole.PNG";
  genImgTag.className = "mole";
  return genImgTag;
}

function genNum() {
  var num = Math.floor(Math.random() * 25);
  while (random === num) {
    num = Math.floor(Math.random() * 25);
  }
  random = num;
  return num;
}

function playSound() {
  const myAudio = new Audio("./whack-audio.wav");
  myAudio.play();
}

function notification() {
  if (score === 0)
    return setTimeout(() => alert(`You have to hit the mole to score!`), 100);
  if (score > highscore) {
    highscore = score;
    document.getElementById("highscore").innerHTML = highscore;
    setTimeout(
      () =>
        alert(
          `Congrats! you got ${highscore} point${
            highscore > 1 ? "s" : ""
          }! a new High Score!`
        ),
      100
    );
  } else {
    setTimeout(() => alert(`Well played! you scored: ${score} points!`), 100);
  }
}

function Countdown(elem, seconds) {
  var that = {};
  // contructor
  that.elem = elem;
  that.seconds = seconds;
  that.totalTime = seconds * 100;
  that.usedTime = 0;
  that.startTime = +new Date();
  that.timer = null;

  that.count = function() {
    that.usedTime = Math.floor((+new Date() - that.startTime) / 10);

    var tt = that.totalTime - that.usedTime;
    if (tt <= 0) {
      resetBtn.classList.remove("hide");
      gameStarted = false;
      notification();
      that.elem.innerHTML = "00.00";
      clearInterval(that.timer);
    } else {
      resetBtn.classList.add("hide");
      gameStarted = true;
      var mi = Math.floor(tt / (60 * 100));
      var ss = Math.floor((tt - mi * 60 * 100) / 100);
      var ms = tt - Math.floor(tt / 100) * 100;
      that.elem.innerHTML = that.fillZero(ss) + "." + that.fillZero(ms);
    }
  };

  that.init = function() {
    if (that.timer) {
      clearInterval(that.timer);
      that.elem.innerHTML = "00.00";
      that.totalTime = seconds * 100;
      that.usedTime = 0;
      that.startTime = +new Date();
      that.timer = null;
    }
  };

  that.start = function() {
    if (!that.timer) {
      that.timer = setInterval(that.count, 10);
    }
  };

  that.stop = function() {
    if (that.timer) clearInterval(that.timer);
  };

  that.fillZero = function(num) {
    return num < 10 ? "0" + num : num;
  };

  return that;
}
