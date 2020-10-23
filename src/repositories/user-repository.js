const { Users, Relation } = require('../models/User')
const bcrypt = require('bcryptjs')

class UserRepository {

    constructor() {
        this.model = Users
    }

    async createUser(userData) {
        const user = await this.model.create(userData, {
            include: {
                association: Relation
            }
        })

        return user.dataValues
    }

    async findAll(parameters) {

        const search = await this.model.findAll({ where: parameters, attributes: { exclude: ['password'] }, include: Relation })

        const users = search.map(data => {
            return data.dataValues
        })

        return users
    }

    async findOne(userID) {

        const user = await this.model.findByPk(userID, { attributes: { exclude: ['password'] }, include: Relation })

        return user
    }

    async deleteUser(userId) {

        const user = await this.model.findByPk(userId, { include: Relation })

        await user.destroy()

        return
    }

    async editUser(userID, userData, method) {

        const user = await this.model.findByPk(userID, { include: Relation })

        user.name = userData.name || user.name
        user.email = userData.email || user.email
        user.password = userData.password || user.password
        user.telephone = userData.telephone || user.telephone

        user.address.street = userData.address.street || user.address.street
        user.address.number = userData.address.number || user.address.number
        user.address.city = userData.address.city || user.address.city
        user.address.state = userData.address.state || user.address.state
        user.address.country = userData.address.country || user.address.country

        if (method == 'PUT' && !userData.password) {

            this.model.removeHook('beforeSave', 'hashPassword')

        } else {

            this.model.addHook('beforeSave', 'hashPassword', async (user) => {

                const hash = await bcrypt.hash(user.password, 10)

                user.password = hash
            })
        }

        await user.save()

        return user.dataValues
    }
}

module.exports = new UserRepository