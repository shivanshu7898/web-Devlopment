function submit()
{
    console.log("submit");
    const fn = document.getElementById("fullname").value;
    console.log(fn);

    document.getElementById("mydata").innerText=fn;
    document.getElementById("fullname").value = "";

   

}