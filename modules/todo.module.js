const prisma = require('../helpers/database')

class _todo{
    listTodo = async () => {
        try {
            const list = await prisma.todo.findMany()
            //console.log(list);
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