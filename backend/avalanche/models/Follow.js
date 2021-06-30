const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    followed: {
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


module.exports = mongoose.model('Follow', FollowSchema);