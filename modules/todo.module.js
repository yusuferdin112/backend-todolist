const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _todo{
    listTodo = async (body) => {
        try {
            const list = await prisma.todo.findMany({
                where: {
                    userId: body.userId
                },
                include: {
                    user: true
                }
            })
            
            return{
                status: true,
                data: list
            }
        }catch(e){
            console.log('listTodo todo module error', e);
            return{
                status: false,
                e
            }
        }
    }

    createTodo = async (body) => {
        try{
            const schema = Joi.object({
                userId: Joi.number().required(),
                description: Joi.string().required()
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

            const add = await prisma.todo.create({
                data: {
                    userId: body.userId,
                    description: body.description
                }
            })
            return {
                status: true,
                code: 201,
                data: add
            }
        }catch(error){
            console.error('Create todo module error', error);
            return {
                status: false,
                error
            }
        }
    }

    updateTodo = async (body) => {
        try{
            const schema = Joi.object({
                id: Joi.number().required(),
                userId: Joi.number(),
                description: Joi.string()
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
            
            const update = await prisma.todo.update({
                where: {
                    id: body.id
                }, 
                data: {
                    userId: body.userId,
                    description: body.description
                }
            })
            return {
                status: true,
                code: 201,
                data: update
            }
        }catch(error) {
            console.error('Update todo module error', error);
            return {
                status: false,
                error
            }
        }
    }

    deleteTodo = async (id) => {
        try{
            const del = await prisma.todo.delete({
                where: {
                    id: id
                }
            })
            return {
                status: true,
                data: del
            }
        } catch(error){
            console.error('Delete todo module error', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _todo()