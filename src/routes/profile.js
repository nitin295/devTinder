const express = require('express');
const User = require('../models/user');
const {userAuth} = require('../middlewares/auth')


const router = express.Router();

router.get('/profile', userAuth, async (req,res) => {
    try {
        // const cookie = req.cookies;
        
        // const { token } = cookie;        
        // if(!token){
        //     throw new Error('Please login again');
        // }
        // const decodetoken = jwt.verify(token,'Nitin@1996');
        // const { _id } = decodetoken;
        
        // if(!_id){
        //     throw new Error('Please login again');
        // }
        // const userProfile = await User.findById({ _id });
        const userData = req.user;        
        res.status(200).send(userData);
        
    } catch (error) {
        res.status(401).send('Login again')
    }
});

module.exports = router;