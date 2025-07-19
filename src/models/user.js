const mongoose = require('mongoose');

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


module.exports = mongoose.model('User',userSchema);