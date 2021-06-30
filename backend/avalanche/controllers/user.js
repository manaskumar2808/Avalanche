const User = require('../models/User');

exports.getUsers = (req, res, next) => {
    User.find({id: {$ne: req.userId}})
    .then(result => {
        res.status(200).json({
            message: "users received",
            received: true,
            users: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "users not received",
            received: false,
            users: null,
        });
    });
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
    .then(result => {
        if(!result) {
            const error = new Error("No user found!");
            throw error;
        }
        res.status(200).json({
            message: "user received",
            received: true,
            user: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not received",
            received: false,
            user: null,
        });
    });
}

exports.getCurrentUser = (req, res, next) => {
    const userId = req.userId;

    User.findById(userId)
    .then(result => {
        if(!result) {
            const error = new Error("No user found!");
            throw error;
        }
        res.status(200).json({
            message: "current user received",
            received: true,
            currentUser: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "current user not received",
            received: false,
            currentUser: null,
        });
    });
}

exports.addUser = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const profileImageUrl = req.body.profileImageUrl;
    const phoneNo = req.body.phoneNo;
    const age = req.body.age;
    const themeImageUrl = req.body.themeImageUrl;
    const themeIndex = req.body.themeIndex;

    const user = new User({
        userName,
        email,
        firstName,
        lastName,
        profileImageUrl,
        phoneNo,
        age,
        themeImageUrl,
        themeIndex,
    });

    user.save()
    .then(result => {
        res.status(201).json({
            message: "user created",
            created: true,
            userId: result.id,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not created",
            created: false,
            userId: null,
        });
    });
}

exports.updateUser = (req, res, next) => {
    const userId = req.userId;
    const userName = req.body.userName;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo = req.body.phoneNo;
    const age = req.body.age;
    const themeIndex = req.body.themeIndex;
    let profileImageUrl;
    let themeImageUrl;

    let user;

    if(req.files) {
        const profileImage = req.files.find(f => f.fieldname === 'profileImage');
        if(profileImage)
            profileImageUrl = profileImage.path;

        const themeImage = req.files.find(f => f.fieldname === 'themeImage');
        if(themeImage)
            themeImageUrl = themeImage.path;
    }

    User.findByIdAndUpdate(userId)
    .then(result => {
        user = result;

        user.userName = userName;
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        if(profileImageUrl) {
            user.profileImageUrl = profileImageUrl;
        }
        user.phoneNo = phoneNo;
        user.age = age;
        if(themeImageUrl) {
            user.themeImageUrl = themeImageUrl;
        }
        user.themeIndex = themeIndex;

        return user.save();
    })
    .then(result => {
        res.status(201).json({
            message: "user updated",
            updated: true,
            userId: result.id,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not updated",
            updated: false,
            userId: null,
        });
    }); 
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    
    User.findByIdAndDelete(userId)
    .then(result => {
        res.status(200).json({
            message: "user deleted",
            deleted: true,
            userId: userId,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "user not deleted",
            deleted: false,
            userId: userId,
        });
    });
}