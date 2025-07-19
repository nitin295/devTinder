const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value){
            if(!['male','female','other'].includes(value.toLowerCase())){
                throw new Error('Gender data is not valid')
            }
        }
    }
},
{
    timestamps: true,
});

userSchema.method.getJwt = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id }, 'Nitin@1996', { expiresIn: '1d'});
    return token;
};

userSchema.method.password = async function(inputPassword){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(inputPassword, passwordHash);     
    return isPasswordValid;
};


module.exports = mongoose.model('User',userSchema);