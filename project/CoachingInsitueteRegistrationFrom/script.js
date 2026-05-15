function formSubmit() {
  let name = document.getElementById("fullName").value;
 
  if (/^[A-Za-z\s]+$/.test(name)) {
    console.log(name);
    
  }
  else {
    document.getElementById("nameerror").innerText = "Invalid Name";
  }
  let name1 = document.getElementById("fullName").value=" ";

//   let guardianName = document.getElementById("GuardianName").value;

//   if (/^[A-Za-z\s]+$/.test(guardianName)) {
//     console.log(guardianName);
//   } else {
//     document.getElementById("gError").innerText = "Invalid Guardian Name";
//   }
  let email = document.getElementById("Email").value;
  
  if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/) {
    console.log(email);
  } 
  else {
    document.getElementById("emailError").innerText = "Invalid Email Address";
  }
    

  let Mobile = document.getElementById("MobileNumber").value;
  if (/^[6-9]\d{9}$/.test(Mobile)) {
    console.log(Mobile);
  } else {
    document.getElementById("mobileError").innerText = "Invalid Mobile Number ";
  }
  

  let number1 = document.getElementById("number").value;
  if (/^[6-9]\d{9}$/.test(number1)) {
    console.log(number1);
  } else {
    document.getElementById("gmError").innerText = "Invalid Mobile Number ";
  }
  
  let G = document.getElementById("gname").value;
  if (/^[A-Za-z\s]+$/.test(G)) {
    console.log(G);
  } else {
    document.getElementById("gError").innerText = "Invalid Mobile Number ";
  }
  


  let Qualification = document.getElementById("Qualification").value;
  console.log(Qualification);
    let q = document.getElementById("Qualification").value=" ";
  let Address = document.getElementById("address").value;
  console.log(Address);
   

  let source = document.getElementById("source").value;
  console.log(source);
    let s = document.getElementById("source").value=" ";

  let sourceReq = document.getElementById("sourceReq").value;
  console.log(sourceReq);
    let s1 = document.getElementById("sourceReq").value=" ";

  let PreferredCourse = document.getElementById("PreferredCourse").value;
  console.log(PreferredCourse);
    let p = document.getElementById("PreferredCourse").value=" ";

  let Grade = document.getElementById("Grade").value;
  100 >= Grade && 0 < Grade
    ? console.log(Grade)
    : (document.getElementById("gradeError").innerText = "Invalid Grade Range");
      let g = document.getElementById("Grade").value=" ";


  //  if (!/^[A-Za-z._\d]+@gmail\.com$/.test(email)) {
  //     document.getElementById("emailError").innerText = "Invalid Email Address";
  //   }

  //   if (!/^[A-Za-z\s]+$/.test(name)) {
  //     alert("Please enter a valid Name");
  //   } else {
  //     console.log(name);
  //   }

  //   if (!/^[A-Za-z._\d]+@gmail\.com$/.test(email)) {
  //     alert("Please enter a valid Email");
  //   } else {
  //     console.log(email);
  //   }
}
function formReset() {
  window.location.reload();
}
