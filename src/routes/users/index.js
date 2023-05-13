const express = require('express')
const { createUser, getUsers, getUser, updateUser, deleteUser} = require('../../resolvers/users')

const router = express.Router()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:uuid', getUser)
router.put('/:uuid', updateUser)
router.delete('/:uuid', deleteUser)

module.exports = router