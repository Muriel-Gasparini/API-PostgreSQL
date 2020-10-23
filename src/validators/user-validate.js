module.exports = async (data, method) => {

    return new Promise((resolve, reject) => {

        const Joi = require('joi')

        const schema = Joi.object({
    
            name: method == 'PUT' ? Joi.string().max(40).min(3) : Joi.string().max(40).min(3).required(),
    
            email: method == 'PUT' ? Joi.string().max(50).min(8).regex(/.+@.+\..+/) : Joi.string().max(50).min(8).regex(/.+@.+\..+/).required(),
    
            password: method == 'PUT' ? Joi.string().max(255).min(8) : Joi.string().max(255).min(8).required(),
    
            telephone: method == 'PUT' ? Joi.number().integer() : Joi.number().integer().required(),

            address: {
                street: method == 'PUT' ? Joi.string() : Joi.string().required(),
                number: method == 'PUT' ? Joi.number() : Joi.number().required(),
                city: method == 'PUT' ? Joi.string() : Joi.string().required(),
                state: method == 'PUT' ? Joi.string() : Joi.string().required(),
                country: method == 'PUT' ? Joi.string() : Joi.string().required(),
            }
        })
    
        const { error } = schema.validate(data)
    
        if (error) return reject({ validatingError: error.message.replace(/"+/g, '') })
    
        return resolve()
    })
}