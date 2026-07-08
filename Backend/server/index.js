import express from "express";  


const app = express();

app.use(express.json()); 

app.listen(4500 || 5000,()=>{
    console.log("server starting now....");
    
})

