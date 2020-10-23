const UserRepository = require('../repositories/user-repository')
const userValidating =  require('../validators/user-validate')

exports.list = async (req, res) => {
    try {

        const userSearch = req.params.id ? await UserRepository.findOne(req.params.id) : await UserRepository.findAll(req.query)
    
        return res.status(200).json(userSearch)

    } catch (error) {

        if(/ERROR/.test(error.original.severity)) return res.status(400).json({ error: 'Make sure this id is correct' })

        return res.status(400).json({ error: 'Make sure to send all the necessary query parameters' })
    }
}

exports.create = async (req, res) => {
    try {
        
        await userValidating(req.body)

        const user = await UserRepository.createUser(req.body)

        return res.status(201).json(user)

    } catch (error) {

        if (error.validatingError) return res.status(400).json(error.validatingError)

        return res.status(400).send('An error ocurred while creating user')
    }
}

exports.delete = async (req, res) => {
    try {
        
        await UserRepository.deleteUser(req.params.id)

        return res.status(200).json({ message: 'User deleted successful.' })

    } catch (error) {

        if(/ERROR/.test(error.original.severity)) return res.status(400).json({ error: 'Make sure this id is correct' })

        return res.status(400).json({ error: 'An error ocurred while deleting user' })
    }
}

exports.edit = async (req, res) => {
    try {

        await userValidating(req.body, req.method)

        const user = await UserRepository.editUser(req.params.id, req.body, req.method)

        return res.status(200).json(user)
        
    } catch (error) {

        if(/ERROR/.test(error.original.severity)) return res.status(400).json({ error: 'Make sure this id is correct' })

        return res.status(400).json({ error: 'An error ocurred while editing user' })
    }
}