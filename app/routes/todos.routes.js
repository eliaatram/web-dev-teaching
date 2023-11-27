const express = require('express')
const router = express.Router()

const todos = require('../services/todos.service')

router.get('/', todos.getTodos)
router.post('/add/todo', todos.addTodo)
router.put('/:index', todos.getTodosIndex)
router.delete('/:index', todos.deleteTodo)

module.exports = router