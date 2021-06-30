const Chat = require('../models/Chat');

const socket = require('../socket');

exports.addChat = (req, res, next) => {
    const selfId = req.userId;
    const receiverId = req.body.receiverId;
    const roomId = req.body.roomId;
    const text = req.body.text;
    const mediaIds = req.body.mediaIds;
    const feedId = req.body.feedId;

    const chat = new Chat({
        sender: selfId,
        receiver: receiverId,
        room: roomId,
        text: text,
        media: mediaIds,
        feedId: feedId,
    });

    console.log('created chat');

    chat.save()
    .then(result => {
        return result.populate('sender').populate('receiver').populate('media').execPopulate();
    })
    .then(result => {
        console.log(result);
        socket.getIo().emit('add', {
            chat: result,
        });

        res.status(200).json({
            message: "chat added",
            added: true,
        });
    })
    .catch(error => {
        console.log(error.message);
        socket.getIo().emit('add', {
            chat: null,
            error: error.message,
        });
        res.status(200).json({
            message: "chat not added",
            added: false,
            error: error.message,
        });
    });
}

exports.fetchChats = (req, res, next) => {
    const roomId = req.params.roomId;
    
    Chat.find({room: roomId})
    .populate('sender')
    .populate('reciever')
    .populate('media')
    .sort({ createdAt: -1 })
    .then(result => {
        res.status(200).json({
            message: "chats received",
            received: true,
            chats: result,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "chats not received",
            received: false,
            chats: null,
        });
    });
}

exports.deleteChat = (req, res, next) => {
    const chatId = req.params.chatId;

    Chat.findByIdAndDelete(chatId)
    .then(result => {
        res.status(200).json({
            message: "chat deleted",
            deleted: true,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "chat not deleted",
            deleted: false,
        });
    }); 
}