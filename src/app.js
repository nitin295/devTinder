const express = require('express');


const app = express();

//Request Handler
// app.use('/',(req,res)=>{
//     res.send("server is running on 3000");
// })


app.get('/user', (req,res)=>{
    res.send({
        firstname:"Nitin"
    })
})

app.post('/user', (req,res)=>{
    res.send('data stored-------')
})



app.listen(3000, ()=>{
    console.log("Server is running---");
    
})