// -    -   -   -   -  //
// JAVASCRIPT CARNIVAL //
// -    -   -   -   -  //
const image = { uni1: 0, uni2: 0, uni3: 0 };
const names = { uni1: "Alpha", uni2: "Beta", uni3: "Charlie" };

document.addEventListener("click", e => {
  if (e.target.id) {
    const el = document.getElementById(e.target.id);
    if (image[e.target.id] === 3) return final(el, e.target.id);
    if (image[e.target.id] < 3) image[e.target.id]++;
    el.src = `./images/unicorn-${image[e.target.id]}.png`;
  }
});

function final(el, id) {
  el.classList.add("unicorn");
  new Audio("../../sounds/horse.mp3").play();
  setTimeout(() => {
    alert(`${names[id]}: My Balloon is about to pop!!!`);
    el.classList.remove("unicorn");
  }, 500);
}
