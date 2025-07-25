const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ["interested","ignored","accepted","rejected"],
            message: '{VALUE} is not supported'
        }
    }
},
{
    timestamps: true,
});
// ascending order 1 desc -1
// compound indexing
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1})

connectionRequestSchema.pre('save', function(next){
    const connectionRequest = this;
    if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
        throw new Error('you can not send request to yourself')
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    'ConnectionRequest',
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;