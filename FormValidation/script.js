function submit() {
  let name = document.getElementById("fullName").value;

  //    name<String && String>name? alert("do not write number here!"):(console.log(name));

  if (!/^[A-Za-z\s]+$/.test(name)) {
    document.getElementById("errorName").innerText = "invalid name";
  }

  let Number = document.getElementById("number").value;
  if (!/^[6-9\d{9}]+$/.test(Number)) {
    document.getElementById("errorNumber").innerText = "invalid";
  }
  let Email = document.getElementById("email").value;
  console.log(Email);
  let Password = document.getElementById("password").value;
  console.log(Password);
}
