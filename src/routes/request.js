const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const user = require('../models/user');

const router = express.Router();

router.post('/request/send/:status/:toUserId', 
    userAuth, 
    async (req, res) => {
    try {        
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // Validate status
        const allowedStatuses = ["interested", "ignored"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                status: 400,
                message: `Invalid status: ${status}`
            });
        }

        const validUserId = await user.findById(toUserId);
        if(!validUserId){
            return res.json({
                status: 400,
                message: 'user id does not exist'
            })
        }

        // if there is existing connection request
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                {
                    fromUserId,toUserId
                },
                {
                    fromUserId: toUserId, toUserId: fromUserId
                }
            ]
        });
        if(existingConnectionRequest){
            return res.json({
                status: 400,
                message: "Connection request already exist"
            })
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const connectionReqData = await connectionRequest.save();

        res.status(200).json({
            status: 200,
            message: `${status} request sent successfully`,
            data: connectionReqData
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
            error: error.message
        });
    }
});

module.exports = router;
