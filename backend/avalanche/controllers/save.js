const { populate } = require('../models/Save');
const Save = require('../models/Save');

exports.save = (req, res, next) => {
    const feedId = req.body.feedId;
    const projectId = req.body.projectId;
    const storyId = req.body.storyId;
    const parent = req.body.parent;
    const userId = req.userId;

    const save = new Save({
        parent,
        feed: feedId,
        project: projectId,
        story: storyId,
        saver: userId,
    });

    save.save()
    .then(result => {
        res.status(200).json({
            message: "saved",
            saved: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "not saved",
            saved: false,
        });
    });
}

exports.unsave = (req, res, next) => {
    let feedId = null;
    let projectId = null;
    let storyId = null;
    const parent = req.params.parent;
    const userId = req.userId;

    switch(parent) {
        case 'feed':
            feedId = req.params.id;
            break;
        case 'project':
            projectId = req.params.id;
            break;
        case 'story':
            storyId = req.params.id;
            break;
        default:
            feedId = req.params.id;
    }

    Save.findOneAndDelete({
        parent: parent,
        feed: feedId,
        project: projectId,
        story: storyId,
        saver: userId,
    })
    .then(result => {
        res.status(200).json({
            message: "unsaved",
            unsaved: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "not unsaved",
            unsaved: false,
        });
    });
}

exports.savedItems = (req, res, next) => {
    const parent = req.params.parent;
    const userId = req.userId;

    Save.find({parent: parent, saver: userId})
    .populate({
        path: 'feed',
        populate: [{
            path: 'creator',
            model: 'User',
        }, {
            path: 'gallery',
            model: 'Gallery',
        }]
    })
    .sort({'createdAt': -1})
    .then(result => {
        res.status(200).json({
            message: "saves received",
            received: true,
            saves: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "saves not received",
            received: false,
            saves: null,
        });
    });
}

exports.issaved = (req, res, next) => {
    let feedId = null;
    let chatId = null;
    let projectId = null;
    let storyId = null;
    const parent = req.params.parent;
    const id = req.params.id;
    const userId = req.userId;

    switch(parent) {
        case "feed":
            feedId = id;
            break;
        case "project":
            projectId = id;
            break;
        case "story":
            storyId = id;
            break;
        default:
            feedId = id;
            break;
    }

    Save.find({
        saver: userId, 
        feed: feedId, 
        chat: chatId, 
        project: projectId, 
        story: storyId,
    })
    .countDocuments()
    .then(result => {
        res.status(200).json({
            message: "issaved received",
            received: true,
            issaved: result === 1,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "issaved not received",
            received: false,
            issaved: null,
        });
    });
}

