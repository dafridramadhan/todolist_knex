const knex = require('../../databases')
const { check, validationResult } = require('express-validator');

module.exports = {
    createTodolist: async(req, res) => {
        const { title, description, user_id } = req.body;
        await check('title').isString().notEmpty().run(req)
        await check('description').isString().notEmpty().run(req)
        const result = validationResult(req)
        if(!result.isEmpty()) return res.status(400).json({ errors: result.array() })
        const todolist = await knex('todolists').insert({
            user_id,
            title,
            description
        })
        if(todolist.length == 0) return res.status(400).json({ message: 'Failed create todolist'})
        return res.status(200).json({ message: 'Success create todolist'})
    },
    getTodolists: async(req, res) => {
        const todolist = await knex('todolists')
        if (todolist.length == 0) return res.status(404).json({ message: 'Todolist is empty' })
        return res.status(200).json({ data: todolist })
    },
    getTodolistByUser: async(req, res) => {
        const { user_id } = req.params
        const todolist = await knex('todolists').where('user_id', user_id)
        if(todolist.length == 0) return res.status(404).json({ message: 'Todolist is empty' })
        return res.status(200).json({ data: todolist })
    },
    getTodolist: async(req, res) => {
        const { id } = req.params
        const todolist = await knex('todolists').where('id', id).first()
        if(!todolist) return res.status(404).json({ message: 'Todolist not found' })
        return res.status(200).json({ data: todolist })
    },
    updateTodolist: async(req, res) => {
        const { id } = req.params
        const { title, description } = req.body
        await check('title').isString().notEmpty().run(req)
        await check('description').isString().notEmpty().run(req)
        const result = validationResult(req)
        if(!result.isEmpty()) return res.status(400).json({ errors: result.array() })
        const todolist = await knex('todolists').where('id', id).update({
            title,
            description
        })
        if(todolist.length == 0) return res.status(400).json({ message: 'Failed update todolist'})
        return res.status(200).json({ message: 'Success update todolist '})
    },
    deleteTodolist: async(req, res) => {
        const { id } = req.params
        const todolist = await knex('todolists').where('id', id).del()
        if(todolist.length == 0) return res.status(400).json({ message: 'Failed delete todolist'})
        return res.status(200).json({ message: 'Success delete todolist' })
    }
}