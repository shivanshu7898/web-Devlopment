let box = document.querySelector("div");

box.addEventListener("mousemove",(event)=>{
   console.log(event);
   
   box.style.top = event.clientY+ "px";
   box.style.left = event.clientX + "px";
   
})






