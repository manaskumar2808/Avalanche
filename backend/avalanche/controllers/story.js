const Story = require('../models/Story');

const setTimerForStory = (storyId) => {
    setTimeout(async () => {
        const story = await Story.findById(storyId);
        story.active = false;
        await story.save();
    },24 * 60 * 60 * 1000);
}

exports.getStories = (req, res, next) => {
    Story.find()
    .populate('maker')
    .populate('media')
    .then(result => {
        res.status(200).json({
            message: "stories received",
            received: true,
            stories: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "stories not received",
            received: false,
            stories: null,
        });
    });
}

exports.getActiveStories = (req, res, next) => {
    Story.find({active: true})
    .sort({createdAt: -1})
    .populate('maker')
    .populate('media')
    .then(result => {
        res.status(200).json({
            message: "stories received",
            received: true,
            stories: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "stories not received",
            received: false,
            stories: null,
        });
    });
}

exports.getStory = (req, res, next) => {
    const storyId = req.params.storyId;

    Story.findById(storyId)
    .populate('maker')
    .populate('media')
    .then(result => {
        res.status(200).json({
            message: "story received",
            received: true,
            story: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "story not received",
            received: false,
            story: null,
        });
    });
}

exports.addStory = (req, res, next) => {
    const userId = req.userId;
    const media = req.body.media;
    const active = true;
    const caption = req.body.caption;

    const story = new Story({
        caption,
        media,
        active,
        maker: userId,
    });

    story.save()
        .then(result => {
        setTimerForStory(result.id);
        res.status(200).json({
            message: "story added",
            added: true,
            storyId: result.id,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "story not added",
            added: false,
            storyId: null,
        });
    });
}

exports.updateStory = (req, res, next) => {

}   

exports.deleteStory = (req, res, next) => {
    const storyId = req.params.storyId;

    Story.findByIdAndDelete(storyId)
    .then(result => {
        res.status(200).json({
            message: "story deleted",
            deleted: true,
            storyId: storyId,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "story not deleted",
            deleted: false,
            storyId: storyId,
        });
    });
}