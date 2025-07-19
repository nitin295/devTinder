const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');


const app = express();

app.use(express.json());
// Post: for sign Up to User--
app.post('/signup', async (req, res) => {
    // validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // hashing the password
    const passwordBcrypt = await bcrypt.hash(password, 10);

    // creating new instance for user model 
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordBcrypt
    });    
    try {
        await user.save()
        res.send('User data is saved successfull')   
    } catch (error) {
        res.status(400).send("Error in signup" + error.message)
    }
});

// Get: single User behalf of User.emaliId
app.get('/getUsers', async (req,res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail});   
        if(users.length === 0){
            res.status(404).send('User not found');
        } 
        else {
            res.send(users);
        }
    } catch (error) {
       res.status(401).send('Something wents wrongs') 
    }
});

// Get: all the Users
app.get('/userFeeds', async (req,res) => {
    try {
        const allUsers = await User.find({});
        if(!allUsers){
            res.status(404).send('Not get all users:Something wents wrong')
        }
        else{
            res.send(allUsers)
        }
    } catch (error) {
        res.status(404).send('Something wents wrong')
    }
});

// Delete: delete user by userId
app.delete('/deleteUser', async (req,res) => {
    const userId = req.body.userId;    
    try {
       const deleteUser = await User.findByIdAndDelete( userId );
       res.send('User is deleted successfully') 
    } catch (error) {           
        res.status(400).send('Something wents wrong',error)
    }
})

// Patch: update user data 
app.patch('/updateUser/:userId', async (req,res) => {    
    const userId = req.params?.userId;
    const updatedData = req.body;    
    try {
        const ALLOW_UPDATS = [
            'firstName',
            'lastName',
            'password',
            'gender'
        ]
        const isAllowUpdate = Object.keys(updatedData).every((key) => {
            return ALLOW_UPDATS.includes(key)
        })
        if(!isAllowUpdate){
            throw new Error('fields are not allowed')
        }else {
            
        }    

       const updateUser = await User.findByIdAndUpdate( userId, updatedData, {
            returnDocument: 'after',
            runValidators: true
        } );
        res.status(200).send('user is updated successfully')
    } catch (error) {
        res.status(400).send('Something went wrong')
    }
})

// Post: login Api
app.post('/login', async (req,res) => {
    try {
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error('Enter email in correct formate')
        }
                
        const user = await User.findOne({ emailId });
        if(!user){
            throw new Error('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.status(200).send('Login successfully');
        }
        else{
            res.status(401).send('Invalid credential')
        }
        
    } catch (error) {
       res.status(401).send('Invalid credentials');
    }
})




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