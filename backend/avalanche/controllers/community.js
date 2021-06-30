const Friend = require('../models/Friend');
const Follow = require('../models/Follow');

const getCommunityOfUserBfs = async (userId) => {
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
        friendSet.add(user);
        
        const result = await Friend.find({
            $or: [
                { userA: uid },
                { userB: uid },
            ],
        }).populate('userA').populate('userB');

        for(let key in result) {
            const friendUserId = result[key].userA.id.toString() === uid.toString() ? result[key].userB.id.toString() : result[key].userA.id.toString();
            const friendUser = result[key].userA.id.toString() === uid.toString() ? result[key].userB : result[key].userA;
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


exports.getCommunity = (req, res, next) => {
    const userId = req.userId;


}