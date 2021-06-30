const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    text: {
        type: String, 
        required: true,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: false,
    },
    replier: {
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


module.exports = mongoose.model('Reply', ReplySchema);