// function bulbon() {
//   document.getElementById("bulb1").style.backgroundColor = "blue";
// }
// function bulbon1() {
//   document.getElementById("bulb1").style.backgroundColor = "red";
// }
// function bulbon2() {
//   document.getElementById("bulb1").style.backgroundColor = "yellow";
// }
// function bulbon3() {
//   document.getElementById("bulb1").style.backgroundColor = "green";
// }
// function bulboff() {
//   document.getElementById("bulb1").style.backgroundColor = "white";
// }

// document.getElementById("bulbinput").addEventListener("change", changecolor);
// function changecolor() {
//   const color = document.getElementById("bulbinput").value;
//   document.getElementById("bulb1").style.backgroundColor = color;
// }



document.getElementById("boxcolor1").addEventListener("change", boxcolor);
function boxcolor() {
  const color1 = document.getElementById("boxcolor1").value;
  document.getElementById("box").style.backgroundColor = color1;
}

document.getElementById("boxcolor2").addEventListener("change", boxcolor1);
function boxcolor1() {
  const color2 = document.getElementById("boxcolor2").value;
  document.getElementById("h1").style.color = color2;
}
document.getElementById("boxcolor3").addEventListener("change", boxcolor2);
function boxcolor2() {
  const color2 = document.getElementById("boxcolor3").value;
  document.getElementById("p").style.color = color2;
}

function reset(){
    window.location.reload();
}