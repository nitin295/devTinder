const express = require('express');
const User = require('../models/user');
const {userAuth} = require('../middlewares/auth');
const {validEditdata} = require('../utils/validation');

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

router.patch('/profile/edit',userAuth , async (req,res) => {
    try {        
        if(!validEditdata(req)){
            throw new error('Data is not correct')
        }

        const loggedInUser = await req.user;        
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key]
        });
        await loggedInUser.save();
        res.json({
            status: 200,
            message: 'saved successful',
            data: loggedInUser

        })

        
    } catch (error) {
        res.status(400).send('Something wents wrong');
    }
})

module.exports = router;