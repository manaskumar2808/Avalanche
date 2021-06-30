const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    parent: {
        type: String,
        required: true,
        default: "feed",
    },
    type: {
        type: String,
        required: true,
        default: "image",
    },
    imageUrl: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: false,
    },
    audioUrl: {
        type: String,
        required: false,
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


module.exports = mongoose.model('Gallery', GallerySchema);
