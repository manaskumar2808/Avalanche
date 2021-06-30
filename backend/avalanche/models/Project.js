const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 120,
    },
    description: {
        type: String, 
        required: false,
    },
    content: {
        type: String, 
        required: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gallery: [{
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: false,
    }],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});


module.exports = mongoose.model('Project', ProjectSchema);
