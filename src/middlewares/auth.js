const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userAuth = async (req,res,next)=> {
   try {
        const { token } = req.cookies;
        const decodeObj = await jwt.verify(token,'Nitin@1996');
        const { _id } = decodeObj;
        if(!_id){
            throw new Error('Something wends wrong');
        }
        const userData = await User.findById( _id );
        if(!userData){
            throw new Error('Something wents wrong');
        }
        req.user = userData;
        next();
   } catch (error) {
        res.status(400).send('Something wents wrong')
   }
}


module.exports = {
    userAuth
}