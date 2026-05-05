console.log(" Print  even numbers from 2 to 10 ")
for(let i = 2; i<=10; i+=2)
{
    console.log(i);
}
console.log(" Print  odd numbers from 1 to 9 ")
for(let a = 1; a<=10; a+=2)
{
    console.log(a);
}
console.log("  Print numbers from  1  to  20   with increment of 2.")
for(let c = 1; c<=20; c+=2)
{
    console.log(c);
}
console.log("square")
for(let e = 1; e<=20; e+=2)
{
    console.log(e*e);
}
console.log("  Print numbers from  5  to  50   with increment of 5.")
for(let d = 1; d<=10; d++)
{
    console.log(d*5);
}
console.log("Print the  table of 15 up to 10 steps.")
for(let b = 1; b<=10; b++)
{
    console.log(15+"*" +b+"="+(15*b));
}



// for each loops


arr = [10,10,10,4,7,7];
arr.forEach((element)=>{console.log(element);
})