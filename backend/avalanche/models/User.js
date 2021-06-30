const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 60,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    profileImageUrl: {
        type: String,
        required: false,
    },
    phoneNo: {
        type: String, 
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    themeImageUrl: {
        type: String,
        required: false,
    },
    themeIndex: {
        type: Number,
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


module.exports = mongoose.model('User', UserSchema);
