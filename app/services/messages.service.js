const express = require('express')
const messageModel = require('../models/messageModel')

const getMessages = async (req, res) => {
    messages = await messageModel.find({}).sort({ created_at: 'desc' }).populate('user')
    return res.status(200).json(messages)
}

const getMessageByID = async (req, res) => {
    const { messageId } = req.params

    message = await messageModel.findOne({ _id: messageId })
    return res.status(200).json(message)
}

const addMessage = async (req, res) => {
    const { message } = req.body
    message.user = req.session.user._id

    const messageObj = new messageModel(message)
    await messageObj.save()
    return res.status(200).json(messageObj)

}

const editMessage = async (req, res) => {
    const { name } = req.body.message
    const { messageId } = req.params

    const message = await messageModel.findByIdAndUpdate(messageId, {
        name: name
    }, {
        new: true
    })

    return res.status(200).json(message)
}


const deleteMessage = async (req, res) => {
    const { messageId } = req.params

    await messageModel.findOneAndDelete({ _id: messageId })
    return res.status(200).json({ "msg": "Message well deleted !" })
}

module.exports = {
    getMessages,
    getMessageByID,
    addMessage,
    editMessage,
    deleteMessage
}