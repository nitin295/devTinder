const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {validateSignUpData} = require('../utils/validation');


const router = express.Router();

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req,res) => {
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
        // const isPasswordValid = await user.getPassword(password);
        
        if(isPasswordValid){
            // create JWT 
            const token = await jwt.sign({_id: user._id }, 'Nitin@1996', { expiresIn: '1d'});
            // const token = User.getJwt();
            // add JWT cookies and send back the response to user 
            res.cookie('token', token)
            res.status(200).send('Login successfully');
        }
        else{
            res.status(401).send('Invalid credential')
        }
        
    } catch (error) {
       res.status(401).send('Invalid credentials');
    }
})


module.exports = router;