const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://charynitin454:Nitin%401996@learningnode.gqhpgwm.mongodb.net/"
    );
};

module.exports = connectDB;