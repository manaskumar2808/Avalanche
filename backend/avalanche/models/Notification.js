const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userA: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userB: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,  
    },
    feeds: {
        type: Schema.Types.Array,
        ref: 'Feed',
        required: false,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: false,
    },
    request: {
        type: Boolean,
        required: true,
        default: false,
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

module.exports = mongoose.model('Notification', NotificationSchema);