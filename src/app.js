const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user')


const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {

    // creating new instance for user model 
    const user = new User(req.body);    
    // const user = new User({
    //     firstName: 'Nitin',
    //     lastName: 'Choudhary',
    //     email: 'nitinchoudhary0306@gmail.com',
    //     password: 'Nitin@1996',
    //     gender: 'Male'
    // });

    try {
        await user.save()
        res.send('User data is saved successfull')   
    } catch (error) {
        res.status(400).send("Error in signup" + error.message)
    }
})

connectDB()
.then(() => {
    console.log('Connected to the database--');
    app.listen(3000,() => {
        console.log("Server is running on port 3000--")
    })
})
.catch((err) => {
    console.log(err)
})