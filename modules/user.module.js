//module berisi fungsi2 yang berkaitan dengan query database
const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _user{
    listUser = async () => {
        try {
            const list = await prisma.user.findMany()
            //console.log(list);
            return{
                status: true,
                data: list
            }
        }catch(e){
            console.log('listUser user module error', e);
            return{
                status: false,
                e
            }
        }
    }

    createUser = async (body) => {
        try{
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)
            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            
            const password = bcrypt.hashSync(body.password, 10)
            const add = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: password
                }
            })
            return {
                status: true,
                code: 201,
                data: add
            }
        }catch(error){
            console.error('Create user module error', error);
            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body) => {
        try{
            const schema = Joi.object({
                id: Joi.number().required(),
                name: Joi.string(),
                email: Joi.string(),
                password: Joi.string()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)
            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            if(body.password){
                body.password = bcrypt.hashSync(body.password, 10)
            }

            const update = await prisma.user.update({
                where: {
                    id: body.id
                }, 
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password
                }
            })
            return {
                status: true,
                code: 201,
                data: update
            }
        }catch(error) {
            console.error('Update user module error', error);
            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
        try{
            const schema = Joi.number().required()

            const validation = schema.validate(id)
            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return {
                status: true,
                code: 200,
                data: del
            }
        } catch(error){
            console.error('Delete user module error', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()