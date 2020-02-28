// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //

const parts = ["head", "body", "shoes"];
let part = 1;
let style = 4;

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    choosePart(e.key);
    document.getElementById("picker").innerHTML = parts[part];
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    document.getElementById(parts[part]).src = `./images/${
      parts[part]
    }${chooseStyle(e.key)}.png`;
  }
});

function choosePart(arrow) {
  if (arrow === "ArrowUp") {
    if (part === 0) {
      part = 2;
    } else {
      part -= 1;
    }
  }
  if (arrow === "ArrowDown") {
    if (part === 2) {
      part = 0;
    } else {
      part += 1;
    }
  }
  return part;
}

function chooseStyle(arrow) {
  if (arrow === "ArrowLeft") {
    if (style === 0) {
      style = 5;
    } else {
      style -= 1;
    }
  }
  if (arrow === "ArrowRight") {
    if (style === 5) {
      style = 0;
    } else {
      style += 1;
    }
  }
  return style;
}
