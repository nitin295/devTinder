const express = require('express');


const app = express();

//Request Handler
// app.use('/',(req,res)=>{
//     res.send("server is running on 3000");
// })


app.get('/user', (req,res,next)=>{
    res.send({
        firstname:"Nitin"
    })
    next();
},
 (req,res)=>{
    res.send({
        lastname:"choudhary"
    })
})

app.post('/user', (req,res)=>{
    res.send('data stored 2-------')
})



app.listen(3000, ()=>{
    console.log("Server is running---");
    
})