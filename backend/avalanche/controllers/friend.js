const Friend = require('../models/Friend');


exports.friend = (req, res, next) => {
    const userAId = req.userId;
    const userBId = req.params.userId;

    const friend = new Friend({
        userA: userAId,
        userB: userBId,
    });

    friend.save()
    .then(result => {
        res.status(200).json({
            message: "user friended",
            friended: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not friended",
            friended: false,
        });
    });
}

exports.accept = () => {
    const friendId = req.params.friendId;
    
    Friend.findById(friendId)
    .then(result => {
        return result.save();
    })
    .then(response => {
        res.status(200).json({
            message: "friend request accepted",
            accepted: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "friend request not accepted",
            accepted: false,
        });
    });
}


exports.reject = () => {
    const friendId = req.params.friendId;
    
    Friend.findById(friendId)
    .then(result => {
        return result.save();
    })
    .then(response => {
        res.status(200).json({
            message: "friend request rejected",
            rejected: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "friend request not rejected",
            rejected: false,
        });
    });
}


exports.unfriend = (req, res, next) => {
    const otherId = req.params.userId;
    const selfId = req.userId;

     Friend.findOneAndDelete({$or: [
        {userA: selfId, userB: otherId},
        {userA: otherId, userB: selfId},
    ]})
    .then(result => {
        res.status(200).json({
            message: "user unfriended",
            unfriended: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not unfriended",
            unfriended: false,
        });
    });
}


exports.getFriends = (req, res, next) => {
    const userId = req.userId;

    Friend.find({
        $or: [
            { userA: userId },
            { userB: userId },
        ],
    })
    .populate('userA')
    .populate('userB')
    .then(result => {
        const friends = [];
        for(let key in result) {
            const user = result[key].userA.id.toString() === userId.toString() ? result[key].userB : result[key].userA;
            friends.push({
                id: result[key].id,
                user: user,
            });
        }
        res.status(200).json({
            message: "friends received",
            received: true,
            friends: friends,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "friends not received",
            received: false,
            friends: null,
        });
    });
}

exports.getFriendsCount = (req, res, next) => {
    const userId = req.params.userId;

    Friend.find({
        $or: [
            { userA: userId },
            { userB: userId },
        ],
    })
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "friends count received",
            received: true,
            friendCount: count,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "friends count not received",
            received: false,
            friendCount: 0,
        });
    });
}

exports.getRequests = (req, res, next) => {
    const userId = req.userId;

    Friend.find({
        $or: [
            { userA: userId },
            { userB: userId },
        ],
        status: "pending",
    })
    .populate('userA')
    .populate('userB')
    .then(result => {
        const friends = [];
        for(let key in result) {
            const user = result[key].userA.id.toString() === userId.toString() ? result[key].userB : result[key].userA;
            friends.push({
                id: result[key].id,
                user: user,
            });
        }
        res.status(200).json({
            message: "requests received",
            received: true,
            requests: friends,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "requests not received",
            received: false,
            requests: null,
        });
    });
}

exports.isfriend = (req, res, next) => {
    const selfId = req.userId;
    const otherId = req.params.userId;

    Friend.find({ $or: [
            {userA: selfId, userB: otherId},
            {userA: otherId, userB: selfId},
        ],
    })
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "is friend received",
            received: true,
            isfriend: count === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "is friend not received",
            received: false,
            isfriend: null,
        });
    });
}