const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    feed: {
        type: Schema.Types.ObjectId,
        ref: 'Feed',
        required: false,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: false,
    },
    access: {
        type: Schema.Types.Array,
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


module.exports = mongoose.model('Dashboard', DashboardSchema);
