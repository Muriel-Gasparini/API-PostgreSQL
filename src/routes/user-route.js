const router = require('express').Router()

const userController = require('../controllers/user-controller')

router.get('/:id?', userController.list)

router.post('/', userController.create)

router.delete('/:id', userController.delete)

router.put('/:id', userController.edit)

module.exports = router