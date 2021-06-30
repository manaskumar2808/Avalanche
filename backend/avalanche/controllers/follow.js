const Follow = require('../models/Follow');

exports.follow = (req, res, next) => {
    const follower = req.userId;
    const followed = req.params.userId;

    const follow = new Follow({
        follower: follower,
        followed: followed,
    });

    follow.save()
    .then(result => {
        res.status(200).json({
            message: "user followed",
            followed: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not followed",
            followed: false,
        });
    });
}

exports.unfollow = (req, res, next) => {
    const selfId = req.userId;
    const otherId = req.params.userId;
    
    Follow.findOneAndDelete({
        follower: selfId,
        followed: otherId,
    })
    .then(result => {
        res.status(200).json({
            message: "user unfollowed",
            unfollowed: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not unfollowed",
            unfollowed: false,
        });
    });
}

exports.getFollowers = (req, res, next) => {
    const userId = req.params.userId;

    Follow.find({followed: userId})
    .populate('follower')
    .then(result => {
        const followers = [];
        for(let key in result) {
            followers.push({
                id: result[key].id,
                user: result[key].follower,
            });
        }

        res.status(200).json({
            message: "followers received",
            received: true,
            followers: followers,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "followers not received",
            received: false,
            followers: null,
        });
    });
}

exports.getFollowersCount = (req, res, next) => {
    const userId = req.params.userId;

    Follow.find({followed: userId})
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "followers received",
            received: true,
            followersCount: count,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "followers not received",
            received: false,
            followersCount: null,
        });
    });
}

exports.getFolloweds = (req, res, next) => {
    const userId = req.params.userId;

    Follow.find({follower: userId})
    .populate('followed')
    .then(result => {
        const followeds = [];
        for(let key in result) {
            followeds.push({
                id: result[key].id,
                user: result[key].followed,
            });
        }

        res.status(200).json({
            message: "followeds received",
            received: true,
            followeds: followeds,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "followeds not received",
            received: false,
            followeds: null,
        });
    });
}


exports.getFollowedsCount = (req, res, next) => {
    const userId = req.params.userId;

    Follow.find({follower: userId})
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "followeds received",
            received: true,
            followedsCount: count,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "followeds not received",
            received: false,
            followedsCount: null,
        });
    });
}


exports.isfollower = (req, res, next) => {
    const selfId = req.userId;
    const otherId = req.params.userId;

    Follow.find({follower: otherId, followed: selfId})
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "is follower received",
            received: true,
            isfollower: count === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "is follower not received",
            received: false,
            isfollower: null,
        });
    });
}


exports.isfollowing = (req, res, next) => {
    const selfId = req.userId;
    const otherId = req.params.userId;

    Follow.find({followed: otherId, follower: selfId})
    .countDocuments()
    .then(count => {
        res.status(200).json({
            message: "is following received",
            received: true,
            isfollowing: count === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "is following not received",
            received: false,
            isfollowing: null,
        });
    });
}

