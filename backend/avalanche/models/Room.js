const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Room', roomSchema);