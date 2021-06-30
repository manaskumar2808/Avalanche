const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');
const saveRoutes = require('./routes/save');
const replyRoutes = require('./routes/reply');
const storyRoutes = require('./routes/story');
const galleryRoutes = require('./routes/gallery');
const friendRoutes = require('./routes/friend');
const followRoutes = require('./routes/follow');
const requestRoutes = require('./routes/request');
const chatRoutes = require('./routes/chat');
const suggestionRoutes = require('./routes/suggestion');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        } else if(file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+'-'+file.originalname);
    },
});


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


app.use(multer({storage: storage, fileFilter: fileFilter}).any());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));
// app.use('/profile-images', express.static(path.join(__dirname, 'profile-images')));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/story', storyRoutes);
app.use('/comment', commentRoutes);
app.use('/like', likeRoutes);
app.use('/save', saveRoutes);
app.use('/reply', replyRoutes);
app.use('/gallery', galleryRoutes);
app.use('/friend', friendRoutes);
app.use('/follow', followRoutes);
app.use('/request', requestRoutes);
app.use('/chat', chatRoutes);
app.use('/suggestion', suggestionRoutes);


mongoose.connect('mongodb+srv://manas28:subham2808@cluster0.fnmec.mongodb.net/avalanche', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(result => {
    const server = app.listen(2000);
    const io = require('./socket').init(server, {
        upgradeTimeout: 30000,
    });
    io.on('connection', (socket) => {
        socket.on('join', (data) => {
            console.log(data.message);
            socket.emit('join', data.message);
        });

        socket.on('leave', (data) => {
            console.log(data.message);
        });

        socket.on('typing', (data) => {
            console.log(data);
            socket.emit('partialTyping', data);
        });

        socket.on('disconnect', (reason) => {
            console.log('disconnected '+reason);
        });
    });
})
.catch(error => {
    console.log(error);
});

