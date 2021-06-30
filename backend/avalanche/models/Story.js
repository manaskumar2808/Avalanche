const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    caption: {
        type: String, 
        required: true,
    },
    maker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    media: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: false,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
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


module.exports = mongoose.model('Story', StorySchema);
