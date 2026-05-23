async function submit()
{
    const API_URL = ("https://v2.jokeapi.dev/joke/Programming,Miscellaneous");
    const response = await fetch(API_URL);
     const data = await response.json();

     document.getElementById("setup").innerText = data.joke || data.setup;
     document.getElementById("delivery").innerText = data.delivery || "" ;
}
