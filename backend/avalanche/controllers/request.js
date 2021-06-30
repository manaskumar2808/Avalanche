const Request = require('../models/Request');
const Friend = require('../models/Friend');

exports.getReceivedRequests = (req, res, next) => {
    const userId = req.userId;

    Request.find({ receiver: userId })
    .populate('sender')
    .then(result => {
        const requests = [];
        for(let key in result) {
            requests.push({
                id: result[key].id,
                user: result[key].sender,
                status: "received",
            });
        }
        res.status(200).json({
            message: "received requests received",
            received: true,
            receivedRequests: requests,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "received requests not received",
            received: false,
            receivedRequests: null,
        });
    });
}

exports.getSentRequests = (req, res, next) => {
    const userId = req.userId;

    Request.find({ sender: userId })
    .populate('receiver')
    .then(result => {
        const requests = [];
        for(let key in result) {
            requests.push({
                id: result[key].id,
                user: result[key].receiver,
                status: "sent",
            });
        }
        res.status(200).json({
            message: "sent requests received",
            received: true,
            sentRequests: requests,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "sent requests not received",
            received: false,
            sentRequests: null,
        });
    });
}



exports.addRequest = (req, res, next) => {
    const userId = req.userId;
    const receiverId = req.params.receiverId;

    const request = new Request({
        sender: userId,
        receiver: receiverId,
    });

    request.save()
    .then(result => {
        res.status(200).json({
            message: "request sent",
            added: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "request not sent",
            added: false,
        });
    });
}

exports.isRequested = (req, res, next) => {
    const selfId = req.userId;  
    const otherId = req.params.userId;

    Request.find({
        sender: selfId,
        receiver: otherId,
        status: "pending",
    })
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "is requested received",
            received: true,
            isrequested: count === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "is requested not received",
            received: false,
            isrequested: false,
        });
    });
}


exports.hasRequested = (req, res, next) => {
    const selfId = req.userId;  
    const otherId = req.params.userId;

    Request.find({
        sender: otherId,
        receiver: selfId,
        status: "pending",
    })
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "has requested received",
            received: true,
            hasrequested: count === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "has requested not received",
            received: false,
            hasrequested: false,
        });
    });
}



exports.acceptRequest = (req, res, next) => {
    const otherId = req.params.userId;
    const selfId = req.userId;

    Request.findOneAndDelete({
        sender: otherId,
        receiver: selfId,
        status: "pending",
    })
    .then(result => {
        const friend = new Friend({
            userA: selfId,
            userB: otherId,
        });

        return friend.save();
    })
    .then(result => {
        res.status(200).json({
            message: "request accepted",
            accepted: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "request not accepted",
            accepted: false,
        });
    });
}


exports.rejectRequest = (req, res, next) => {
    const otherId = req.params.userId;
    const selfId = req.userId;

    Request.findOneAndDelete({
        sender: otherId,
        receiver: selfId,
        status: "pending",
    })
    .then(result => {
        res.status(200).json({
            message: "request rejected",
            rejected: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "request not rejected",
            rejected: false,
        });
    });
}


exports.deleteRequest = (req, res, next) => {
    const otherId = req.params.userId;
    const selfId = req.userId;

    Request.findOneAndDelete({
        sender: selfId,
        receiver: otherId,
        status: "pending",
    })
    .then(result => {
        res.status(200).json({
            message: "request deleted",
            deleted: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "request not deleted",
            deleted: false,
        });
    });
}