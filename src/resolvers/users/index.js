const knex = require('../../databases')
const { check, validationResult } = require('express-validator');
const { v4:uuidv4 } = require('uuid');

module.exports = {
    createUser: async(req, res) => {
        const { nrp, name } = req.body;
        await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req);
        await check('name').isString().notEmpty();
        const result = validationResult(req)
        if (!result.isEmpty()) return res.status(400).json({ errors: result.array() })
        const user = await knex('users').insert({
            uuid: uuidv4(),
            nrp,
            name
        })
        if (user.length == 0) return res.status(400).json({ message: 'Failed create user' })
        return res.status(200).json({ message: 'Success create user' })
    },
    getUsers: async(req, res) => {
        const user = await knex('users')
        if(user.length == 0) return res.status(404).json({ message: 'User is empty' })
        return res.status(200).json({ data: user })
    },
    getUser: async(req, res) => {
        const { uuid } = req.params
        const user = await knex('users').where('uuid', uuid).first()
        if(!user) return res.status(404).json({ message: 'User not found' })
        return res.status(200).json({ data: user })
    },
    updateUser: async(req, res) => {
        const { uuid } = req.params
        const { nrp, name } = req.body
        await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req)
        await check('name').isString().notEmpty().run(req)
        const result = validationResult(req)
        if(!result.isEmpty()) return res.status(400).json({ errors: result.array() })
        if( await knex('users').where('nrp', nrp).then(data => data.length) > 1 ) return res.status(400).json({ message: 'NRP already exist' }) 
        const user = await knex('users').where('uuid', uuid).update({
            nrp,
            name
        })
        if(user.length == 0) return res.status(400).json({ message: 'Failed update user' })
        return res.status(200).json({ message: 'Success update user' })
    },
    deleteUser:async(req, res) => {
        const { uuid } = req.params
        const user = await knex('users').where('uuid', uuid).del()
        if (user.length == 0) return res.status(400).json({ message: 'Failed delete user' })
        return res.status(200).json({ message: 'Success delete user' })
    }
}
