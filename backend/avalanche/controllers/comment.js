const Comment = require('../models/Comment');

exports.getComments = async (req, res, next) => {
    const parent = req.params.parent;

    let comments;

    try {
        switch (parent) {
            case 'feed':
                comments = await Comment.find({ feed: req.params.id, parent: parent })
                    .populate('commentor')
                    .sort({ 'createdAt': -1 });
                break;
            case 'story':
                comments = await Comment.find({ story: req.params.id, parent: parent })
                    .populate('commentor')
                    .sort({ 'createdAt': -1 });
                break;
            default:
                break;
        }

        res.status(200).json({
            message: "comments received",
            received: true,
            comments,
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
            message: "comments not received",
            received: false,
            comments: null,
        });
    }
}

exports.getCommentsCount = async (req, res, next) => {
    const parent = req.params.parent;

    let count;

    try {
        switch (parent) {
            case 'feed':
                count = await Comment.find({ feed: req.params.id, parent: parent }).countDocuments();
                break;
            case 'story':
                count = await Comment.find({ story: req.params.id, parent: parent }).countDocuments();
                break;
            default:
                break;
        }

        res.status(200).json({
            message: "comments count received",
            received: true,
            count,
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
            message: "comments count not received",
            received: false,
            count: null,
        });
    }

}

exports.getComment = (req, res, next) => {
    const commentId = req.params.commentId;

    Comment.findById(commentId)
    .populate('commentor')
    .then(result => {
        res.status(200).json({
            message: "comment received",
            received: true,
            comment: result,
        });
    }).catch(error => {
        res.status(500).json({
            message: "comment not received",
            received: false,
            comment: null,
        });
    });
}

exports.addComment = (req, res, next) => {
    const text = req.body.text;
    const parent = req.body.parent;
    const feedId = req.body.feedId;
    const projectId = req.body.projectId;
    const storyId = req.body.storyId;
    const userId = req.userId;

    const comment = new Comment({
        text,
        parent,
        feed: feedId,
        project: projectId,
        story: storyId,
        commentor: userId,
    });

    comment.save()
    .then(result => {
        res.status(201).json({
            message: "comment added",
            added: true,
            commentId: result.id,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "comment not added",
            added: false,
            commentId: null,
        });
    });
}

exports.updateComment = (req, res, next) => {

}

exports.deleteComment = (req, res, next) => {
    const commentId = req.params.commentId;

    Comment.findByIdAndDelete(commentId)
    .then(result => {
        res.status(200).json({
            message: "comment deleted",
            deleted: true,
            commentId: commentId,
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "comment not deleted",
            deleted: false,
            commentId: commentId,
        });
    });
}