const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth')
const app = express();


app.use('/admin',adminAuth, (req,res)=>{
    // throw new Error("--------");

    try {
        res.send('Admin is loggedIn--');
    } catch (error) {
        res.status(500).send("Ther is some error---")
    }
    
})

app.use('/user', userAuth, (req,res)=>{
    res.send("Get all the data of users----")
})


app.use('/',(err, req, res, next)=>{
    if (err){
        res.status(500).send("Something wents wrong")
    }
})



app.listen(3000, ()=>{
    console.log("Server is running---");
    
})