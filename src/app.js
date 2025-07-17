const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth')
const app = express();


app.use('/admin',adminAuth, (req,res)=>{
    res.send('Admin is loggedIn--')
})

app.use('/user', userAuth, (req,res)=>{
    res.send("Get all the data of users----")
})



app.listen(3000, ()=>{
    console.log("Server is running---");
    
})