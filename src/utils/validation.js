const validator = require('validator');


const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName){
        throw new Error('Firstname and lastname is required')
    }
    else if(!validator.isEmail(emailId)){
        throw new Error('Email is required')
    }
    // else if (!validator.isStrongPassword(password)){
    //     throw new Error('Strong password is required')
    // }
}


module.exports = {
    validateSignUpData
}