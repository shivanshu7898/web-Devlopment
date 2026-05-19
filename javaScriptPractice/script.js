let p = document.querySelectorAll("p");


p.forEach(function(item){
    item.addEventListener("mouseover",()=>{
        item.style.color= "red";
    })
    item.addEventListener("mouseout",()=>{
        item.style.color= "";
    })
})



