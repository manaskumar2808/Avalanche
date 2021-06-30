const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaveSchema = new Schema({
    parent: {
        type: String,
        required: true,
        default: "feed",
    },
    feed: {
        type: Schema.Types.ObjectId,
        ref: 'Feed',
        required: false,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: false,
    },
    saver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});


module.exports = mongoose.model('Save', SaveSchema);