const express = require('express');
const router = express.Router();
const User = require('../models/user')

// Get: single User behalf of User.emaliId
router.get('/getUsers', async (req,res) => {
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
router.get('/userFeeds', async (req,res) => {
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
router.delete('/deleteUser', async (req,res) => {
    const userId = req.body.userId;    
    try {
       const deleteUser = await User.findByIdAndDelete( userId );
       res.send('User is deleted successfully') 
    } catch (error) {           
        res.status(400).send('Something wents wrong',error)
    }
})

// Patch: update user data 
router.patch('/updateUser/:userId', async (req,res) => {    
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

module.exports = router;