const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const cookiesParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cookiesParser());
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);


// Server is listing on 3000--
connectDB()
.then(() => {
    User.syncIndexes();
    console.log('Connected to the database--');
    app.listen(3000,() => {
        console.log("Server is running on port 3000--")
    })
})
.catch((err) => {
    console.log(err)
}) 