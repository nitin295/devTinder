const express = require('express');


const app = express();


app.use((req,res)=>{
    res.send("server is running on 3000");
})



app.listen(3000, ()=>{
    console.log("Server is running---");
    
})