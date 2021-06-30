const Friend = require('../models/Friend');
const Follow = require('../models/Follow');

const getFriendOfUserDfs = async (userId) => {
    const friendSet = new Set();
    if(visited.indexOf(userId) !== -1) {
        return friendSet;
    }

    visited.push(userId);
    friendSet.add(userId);
    
    const result = await Friend.find({
        $or: [
            { userA: userId },
            { userB: userId },
        ],
    });

    for(let key in result) {
        const friendUserId = result[key].userA.toString() === userId.toString() ? result[key].userB.toString() : result[key].userA.toString();
        if(visited.indexOf(friendUserId) === -1) {
            const friendSet1 = await getFriendOfUserDfs(friendUserId);
            const friendArr = Array.from(friendSet1);
            friendArr.forEach(val => {
                friendSet.add(val);
            });
        }
    }

    return friendSet;
}

const getFriendOfUserBfs = async (userId) => {
    const visited = [];
    const friendSet = new Set();
    if(visited.indexOf(userId) !== -1) {
        return friendSet;
    }

    visited.push(userId);

    const queue = [];
    queue.push({
        uid: userId,
        user: {},
        layer: 0,
    });
    
    
    while(queue.length !== 0) {
        const friend = queue.shift();
        const uid = friend.uid;
        const user = friend.user;
        const layer = friend.layer;

        visited.push(uid);

        if(layer > 1) {
            friendSet.add(user);
        }
        
        const result = await Friend.find({
            $or: [
                { userA: uid },
                { userB: uid },
            ],
        }).populate('userA').populate('userB');

        for (let key in result) {
            const friendUserId = result[key].userA.id.toString() === uid.toString() ?
                result[key].userB.id.toString() : result[key].userA.id.toString();
            const friendUser = result[key].userA.id.toString() === uid.toString() ?
                result[key].userB : result[key].userA;
            
            if(visited.indexOf(friendUserId) === -1) {
                queue.push({
                    uid: friendUserId,
                    user: friendUser,
                    layer: layer + 1,
                });
            }
        }
    }


    return friendSet;
}


exports.getFriendSuggestions = async (req, res, next) => {
    const userId = req.userId;

    const suggestionSet = await getFriendOfUserBfs(userId);
    const suggestions = Array.from(suggestionSet);

    res.status(200).json({
        message: "Friends suggestions received",
        received: true,
        suggestions,
    });
}


const getFollowOfUserBfs = async (userId) => {
    const visited = [];
    const followSet = new Set();
    if(visited.indexOf(userId) !== -1) {
        return followSet;
    }

    const queue = [];
    queue.push({
        uid: userId,
        user: {},
        layer: 0,
    });

    console.log('pushed : ', queue[0]);
    
    
    while(queue.length !== 0) {
        const follow = queue.shift();
        
        const uid = follow.uid;
        const user = follow.user;
        const layer = follow.layer;
        console.log('popped : ', uid, 'layer : ', layer);
        if(visited.indexOf(uid) === -1) {
            visited.push(uid);
    
            console.log(visited);
            
            if(layer > 1) {
                followSet.add(user);
            }
            
            const result = await Follow.find({ follower: uid }).populate('followed');
    
            for(let key in result) {
                const followedUserId = result[key].followed.id;
                const followedUser = result[key].followed;
                if(visited.indexOf(followedUserId) === -1) {
                    queue.push({
                        uid: followedUserId,
                        user: followedUser,
                        layer: layer + 1,
                    });
                    console.log('pushed : ',  followedUserId, 'layer : ', layer+1);
                }
            }

        }

        
    }

    return followSet;
}

exports.getFollowSuggestions = async (req, res, next) => {
    const userId = req.userId;

    const suggestionSet = await getFollowOfUserBfs(userId);
    const suggestions = Array.from(suggestionSet);

    res.status(200).json({
        message: "Follow suggestions received",
        received: true,
        suggestions,
    });
}