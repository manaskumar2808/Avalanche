const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let user;

    User.findOne({email: email})
    .then(result => {
        if(!result) {
            const error = new Error("No user with such email!");
            error.statusCode = 422;
            throw error;
        }
        console.log('user : ', result);
        user = result;
        return bcrypt.compare(password, user.password);
    })
    .then(isValid => {
        console.log('checking password validity');
        if(!isValid) {
            const error = new Error("Incorrect password!");
            error.statusCode = 422;
            throw error;
        }

        const token = jwt.sign({
            userId: user.id, 
        }, 'secret', {
            expiresIn: '24h',
        });

        res.status(200).json({
            message: "user logged in", 
            token: token,
            userId: user.id,
            expiryDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString(),
        });
    })
    .catch(error => {
        console.log(error.message);
        res.status(200).json({
            message: "user not logged in", 
            error: error.message,
            token: null,
            userId: null,
        });
    });
}

exports.signup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let profileImageUrl;
    let themeImageUrl;
    const themeIndex = req.body.themeIndex;
    const phoneNo = req.body.phoneNo;
    const age = req.body.age;

    if(req.files) {
        const profileImage = req.files.find(f => f.fieldname === 'profileImage');
        if(profileImage)
            profileImageUrl = profileImage.path;

        const themeImage = req.files.find(f => f.fieldname === 'themeImage');
        if(themeImage)
            themeImageUrl = themeImage.path;
    }

    User.findOne({userName: userName})
    .then(user => {
        if(user) {
            const error = new Error("This email is occupied!");
            error.statusCode = 422;
            throw error;
        }
        return bcrypt.hash(password, 12);
    })
    .then(passwordHash => {
        console.log('creating user');
        const user = new User({
            userName: userName,
            email: email,
            password: passwordHash,
            firstName: firstName,
            lastName: lastName,
            profileImageUrl: profileImageUrl,
            themeImageUrl: themeImageUrl,
            themeIndex: themeIndex,
            phoneNo: phoneNo,
            age: age,
        });

        console.log('user created');
        
        return user.save();
    })
    .then(result => {
        console.log('jwt signup');
        const token = jwt.sign({
            userId: result.id, 
        }, 'secret', {
            expiresIn: '24h',
        });

        console.log('jwt done');

        res.status(200).json({
            message: "user signed up", 
            token: token,
            userId: result.id,
            expiryDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString(),
        });
    })
    .catch(error => {
        console.log(error.message);
        res.status(200).json({
            message: "user not signed up", 
            token: null,
            userId: null,
            error: error.message,
        });
    });
}