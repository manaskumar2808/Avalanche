const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
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
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Friend', FriendSchema);