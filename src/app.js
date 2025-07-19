const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user')


const app = express();

app.use(express.json());
// Post: for sign Up to User--
app.post('/signup', async (req, res) => {
    // creating new instance for user model 
    const user = new User(req.body);    
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