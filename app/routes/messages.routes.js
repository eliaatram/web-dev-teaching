const express = require('express')
const router = express.Router()

const messages = require('../services/messages.service')

router.get('/', messages.getMessages)
router.get('/:messageId', messages.getMessageByID)
router.post('/add/message', messages.addMessage)
router.put('/edit/:name', messages.editMessage)
router.delete('/delete/:name', messages.deleteMessage)

module.exports = router