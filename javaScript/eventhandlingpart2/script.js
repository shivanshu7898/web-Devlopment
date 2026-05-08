document.getElementById("redbox").addEventListener("mouseover", fillRedColor);
document.getElementById("greenbox").addEventListener("mouseover", fillblueColor);
document.getElementById("bluebox").addEventListener("mouseover", fillskyColor);
document.getElementById("redbox").addEventListener("mouseout", remove);
document.getElementById("greenbox").addEventListener("mouseout", remove);
document.getElementById("bluebox").addEventListener("mouseout", remove);




function remove(){
    document.getElementById("bulb1").style.backgroundColor = "white";
}
function fillRedColor(){
    document.getElementById("bulb1").style.backgroundColor = "#DC3545";
}
function fillblueColor(){
    document.getElementById("bulb1").style.backgroundColor = "blue";
}
function fillskyColor(){
    document.getElementById("bulb1").style.backgroundColor = "lightblue";
}