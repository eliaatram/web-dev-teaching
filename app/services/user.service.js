const express = require('express')

const userModel = require('../models/userModel')

const Router = express.Router()

const getUser = async (req, res) => {
    const users = await userModel.find({})

    return res.status(200).json(users)
}

module.exports = {
    getUser
}
