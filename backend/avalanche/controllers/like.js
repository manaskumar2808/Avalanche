const Like = require('../models/Like');

exports.like = (req, res, next) => {
    const feedId = req.body.feedId;
    const chatId = req.body.chatId;
    const projectId = req.body.projectId;
    const storyId = req.body.storyId;
    const commentId = req.body.commentId;
    const replyId = req.body.replyId;
    const parent = req.body.parent;
    const userId = req.userId;

    const like = new Like({
        parent,
        feed: feedId,
        chat: chatId,
        project: projectId,
        story: storyId,
        comment: commentId,
        reply: replyId,
        liker: userId,
    });

    like.save()
    .then(result => {
        res.status(201).json({
            message: "liked",
            liked: true,
        });
    })
    .catch(error => {
        res.status(201).json({
            error: error.message,
            message: "not liked",
            liked: false,
        });
    });
}

exports.unlike = (req, res, next) => {
    let feedId = null;
    let chatId = null;
    let projectId = null;
    let storyId = null;
    let commentId = null;
    let replyId = null;
    const parent = req.params.parent;
    const userId = req.userId;

    switch(parent) {
        case 'feed':
            feedId = req.params.id;
            break;
        case 'chat':
            chatId = req.params.id;
            break;
        case 'project':
            projectId = req.params.id;
            break;
        case 'story':
            storyId = req.params.id;
            break;
        case 'comment':
            commentId = req.params.id;
            break;
        case 'reply':
            replyId = req.params.id;
            break;
        default:
            feedId = req.params.id;
            break;
    }

    Like.findOneAndDelete({
        parent: parent,
        feed: feedId,
        chat: chatId,
        project: projectId,
        story: storyId,
        comment: commentId,
        reply: replyId,
        liker: userId,
    })
    .then(result => {
        res.status(200).json({
            message: "unliked",
            unliked: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "not unliked",
            unliked: false,
        });
    });
}


exports.likesCount = (req, res, next) => {
    let feedId = null;
    let chatId = null;
    let projectId = null;
    let storyId = null;
    let commentId = null;
    let replyId = null;
    const parent = req.params.parent;
    const id = req.params.id;
    const userId = req.userId;

    switch(parent) {
        case "feed":
            feedId = id;
            break;
        case "chat":
            chatId = id;
            break;
        case "project":
            projectId = id;
            break;
        case "story":
            storyId = id;
            break;
        case "comment":
            commentId = id;
            break;
        case "reply":
            replyId = id;
            break;
        default:
            feedId = id;
            break;
    }

    Like.find({
        parent,
        feed: feedId,
        chat: chatId,
        project: projectId,
        story: storyId,
        comment: commentId,
        reply: replyId,
    })
    .countDocuments()
    .then(result => {
        res.status(200).json({
            message: "likes count received",
            received: true,
            count: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "likes count not received",
            received: false,
            count: null,
        });
    });
}


exports.isliked = (req, res, next) => {
    let feedId = null;
    let chatId = null;
    let projectId = null;
    let storyId = null;
    let commentId = null;
    let replyId = null;
    const parent = req.params.parent;
    const id = req.params.id;
    const userId = req.userId;

    switch(parent) {
        case "feed":
            feedId = id;
            break;
        case "chat":
            chatId = id;
            break;
        case "project":
            projectId = id;
            break;
        case "story":
            storyId = id;
            break;
        case "comment":
            commentId = id;
            break;
        case "reply":
            replyId = id;
            break;
        default:
            feedId = id;
            break;
    }

    Like.find({
        liker: userId, 
        feed: feedId, 
        chat: chatId, 
        project: projectId, 
        story: storyId,
        comment: commentId,
        reply: replyId,
        parent: parent,
    })
    .countDocuments()
    .then(result => {
        res.status(200).json({
            message: "isliked received",
            received: true,
            isliked: result === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "isliked not received",
            received: false,
            isliked: null,
        });
    });
}

