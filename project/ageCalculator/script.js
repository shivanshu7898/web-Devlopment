document.querySelector("form").addEventListener("submit",(event)=>{


    event.preventDefault();

    const dob = document.getElementById("DOB").value;
    const curDate = document.getElementById("currentDate").value;
    console.log(dob);
    console.log(curDate);
    

    const age = Number(curDate.split("-")[0])- Number(dob.split("-")[0]);
  
    console.log(age);


    document.getElementById("myAge").innerText=age;



})