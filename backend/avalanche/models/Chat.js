const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    text: {
        type: String, 
        required: false,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    media: [{
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: false,
    }],
    feedId: {
        type: Schema.Types.ObjectId,
        ref: 'Feed',
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


module.exports = mongoose.model('Chat', ChatSchema);
