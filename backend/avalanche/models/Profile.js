const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friends: {
        type: Schema.Types.Array,
        ref: 'User',
        required: false,
    },
    followers: {
        type: Schema.Types.Array,
        ref: 'User',
        required: false,
    },
    following: {
        type: Schema.Types.Array,
        ref: 'User',
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


module.exports = mongoose.model('Profile', ProfileSchema);
