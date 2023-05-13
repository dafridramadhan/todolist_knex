const express = require('express')
const { createTodolist, getTodolists, getTodolistByUser, getTodolist, updateTodolist, deleteTodolist } = require('../../resolvers/todolists')

const router = express.Router()

router.post('/', createTodolist)
router.get('/', getTodolists)
router.get('/user/:user_id', getTodolistByUser)
router.get('/:id', getTodolist)
router.put('/:id', updateTodolist)
router.delete('/:id', deleteTodolist)

module.exports = router