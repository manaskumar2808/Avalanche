const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HighlightSchema = new Schema({
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
        type: Schema.Types.Array,
        ref: 'Gallery',
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


module.exports = mongoose.model('Highlight', HighlightSchema);
