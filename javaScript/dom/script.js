function submit()
{
    console.log("submit");
    const fn = document.getElementById("fullname").value;
    const fn1 = document.getElementById("email").value;
    const fn2 = document.getElementById("address").value;
    const fn3 = document.getElementById("password").value;
    const fn4 = document.getElementById("confirmPassword").value;
    console.log(fn);
    console.log(fn1);
    console.log(fn2);
    console.log(fn3);
    console.log(fn4);

    document.getElementById("mydata").innerText=fn;
    document.getElementById("fullname").value = "";
      document.getElementById("mydata1").innerText=fn1;
    document.getElementById("email").value = "";
     
      document.getElementById("mydata2").innerText=fn2;
    document.getElementById("address").value = "";
      document.getElementById("mydata3").innerText=fn3;
    document.getElementById("password").value = "";
      document.getElementById("mydata4").innerText=fn4;
    document.getElementById("confirmPassword").value = "";
     
   


   document.getElementById("cardhide").classList.remove("divhide");

}