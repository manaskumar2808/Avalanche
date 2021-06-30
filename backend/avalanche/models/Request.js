const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
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
    type: {
        type: String,
        required: true,
        default: 'friend',
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
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

module.exports = mongoose.model('Request', RequestSchema);