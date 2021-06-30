const Reply = require('../models/Reply');

exports.getReplies = (req, res, next) => {
    Reply.find()
    .populate('replier')
    .then(result => {
        res.status(200).json({
            message: "replies received",
            received: true,
            replies: result,
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "replies not received",
            received: false,
            replies: null,
        });
    });
}

exports.getCommentReplies = (req, res, next) => {
    const commentId = req.params.commentId;

    Reply.find({comment: commentId})
    .populate('replier')
    .sort({'createdAt': -1})
    .then(result => {
        res.status(200).json({
            message: "replies received",
            received: true,
            replies: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "replies not received",
            received: false,
            replies: null,
        });
    });
}


exports.getReply = (req, res, next) => {
    const replyId = req.params.replyId;

    Reply.findById(replyId)
    .populate('replier')
    .then(result => {
        res.status(200).json({
            message: "reply received",
            received: true,
            reply: result,
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "reply not received",
            received: false,
            reply: null,
        });
    });
}

exports.addReply = (req, res, next) => {
    const text = req.body.text;
    const commentId = req.body.commentId;
    const userId = req.userId;

    const reply = new Reply({
        text,
        comment: commentId,
        replier: userId,
    });

    reply.save()
    .then(result => {
        res.status(201).json({
            message: "reply added",
            added: true,
            replyId: result.id,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "reply not added",
            added: false,
            replyId: null,
        });
    });
    
}

exports.updateReply = (req, res, next) => {

}

exports.deleteReply = (req, res, next) => {
    const replyId = req.params.replyId;

    Reply.findByIdAndDelete(replyId)
    .then(result => {
        res.status(200).json({
            message: "reply deleted",
            deleted: true,
            replyId: replyId,
        });
    }).catch(error => {
        res.status(200).json({
            error: error.message,
            message: "reply not deleted",
            deleted: false,
            replyId: replyId,
        });
    });
}