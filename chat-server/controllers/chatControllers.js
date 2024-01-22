const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//creation of a new chat
//understand by repeating it again, very imp api for the app
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    //if no userid is sent
    if (!userId) {
        console.log("UserId Param not sent with request")
        return res.sendStatus(400)
    }

    //if the chat actually exist because of $and, if found populate the users and latestMessage
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")

            res.status(200).send(FullChat)
        } catch (err) {
            res.status(400)
            throw new Error(err.message)
        }
    }
})

//fetch all the chats 
const fetchChat = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                })
            })

        res.status(200).send(result)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)
    }
})

module.exports = { accessChat, fetchChat }