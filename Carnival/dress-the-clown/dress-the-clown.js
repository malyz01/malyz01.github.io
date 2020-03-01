// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

const parts = ["head", "body", "shoes"];
let part = 1;
let style = { head: 3, body: 4, shoes: 4 };
const canvas = document.getElementById("canvas");
canvas.width = document.getElementById("head").width;
canvas.height = document.getElementById("head").height;
const context = canvas.getContext("2d");

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    choosePart(e.key);
    document.getElementById("picker").innerHTML = parts[part];
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    document.getElementById(parts[part]).src = `./images/${parts[part] +
      chooseStyle(e.key)}.png`;
  }
});

function choosePart(arrow) {
  if (arrow === "ArrowUp") {
    if (part === 0) {
      part = 2;
    } else {
      part--;
    }
  }
  if (arrow === "ArrowDown") {
    if (part === 2) {
      part = 0;
    } else {
      part++;
    }
  }
  return part;
}

function chooseStyle(arrow) {
  if (arrow === "ArrowLeft") {
    if (style[parts[part]] === 0) {
      style[parts[part]] = 5;
    } else {
      style[parts[part]]--;
    }
  }
  if (arrow === "ArrowRight") {
    if (style[parts[part]] === 5) {
      style[parts[part]] = 0;
    } else {
      style[parts[part]]++;
    }
  }
  return style[parts[part]];
}

function makeCanvas() {
  var imageObj2 = new Image();
  imageObj2.src = `./images/body${style.body}.png`;
  context.drawImage(imageObj2, 0, 0, canvas.width, canvas.height);

  var imageObj1 = new Image();
  imageObj1.src = `./images/head${style.head}.png`;
  context.drawImage(imageObj1, 0, 0, canvas.width, canvas.height);

  var imageObj3 = new Image();
  imageObj3.src = `./images/shoes${style.shoes}.png`;
  context.drawImage(imageObj3, 0, 0, canvas.width, canvas.height);
}

function saveImage() {
  makeCanvas();
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(canvas.msToBlob(), "My-Clown.png");
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = "My-Clown.png";
    a.click();
    document.body.removeChild(a);
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
}
