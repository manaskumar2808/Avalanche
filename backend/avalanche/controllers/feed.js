const Feed = require('../models/Feed');

exports.getFeeds = (req, res, next) => {
    Feed.find()
    .populate('creator')
    .populate('gallery')
    .sort({ createdAt: -1 })
    .then(result => {
        res.status(200).json({
            message: "feeds recieved",
            received: true,
            feeds: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "feeds not recieved",
            received: false,
            feeds: null,
        });  
    });
}

exports.getUserFeeds = (req, res, next) => {
    const creatorId = req.params.creatorId;

    Feed.find({creator: creatorId})
    .populate('creator')
    .populate('gallery')
    .sort({ createdAt: -1 })
    .then(result => {
        res.status(200).json({
            message: "user feeds recieved",
            received: true,
            userFeeds: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user feeds not recieved",
            received: false,
            userFeeds: null,
        });  
    });
}


exports.getFeed = (req, res, next) => {
    const feedId = req.params.feedId;

    Feed.findById(feedId)
    .populate('creator')
    .populate('gallery')
    .sort({ createdAt: -1 })
    .then(result => {
        res.status(200).json({
            message: "feed recieved",
            received: true,
            feed: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "feed not recieved",
            received: false,
            feed: null,
        });  
    });
}

exports.addFeed = (req, res, next) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    const gallery = req.body.gallery;

    const feed = new Feed({
        title,
        description,
        gallery,
        creator: userId,
    });
    
    feed.save()
    .then(result => {
        res.status(201).json({
            message: 'feed created',
            created: true,
            feedId: result.id,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: 'feed not created',
            created: false,
            feedId: null,
        });
    });
}

exports.updateFeed = (req, res, next) => {

}

exports.deleteFeed = (req, res, next) => {
    const feedId = req.params.feedId;

    Feed.findByIdAndDelete(feedId)
    .then(result => {
        res.status(200).json({
            message: 'feed deleted',
            deleted: true,
        });
    }).catch(error => {
        res.status(200).json({
            error: error.message,
            message: 'feed not deleted',
            deleted: false,
        });
    });
}
