const { Router } = require('express')
const userSession = require('../helpers/middleware')
const m$todo = require('../modules/todo.module')
const response = require('../helpers/response')

const TodoController = Router()

TodoController.get('/', userSession, async (req, res) => {
    const list = await m$todo.listTodo({ userId: req.user.id })

    response.sendResponse(res, list)
})

TodoController.post('/', userSession, async (req, res) => {
    const add = await m$todo.createTodo({
        userId: req.user.id, 
        description: req.body.description
    })

    response.sendResponse(res, add)
})

TodoController.put('/', userSession, async (req, res) => {
    const update = await m$todo.updateTodo({
        id: req.body.id,
        userId: req.user.id, 
        description: req.body.description
    })

    response.sendResponse(res, update)
})

TodoController.delete('/:id', async (req, res) => {
    const del = await m$todo.deleteTodo(Number(req.params.id))

    response.sendResponse(res, del)
})

module.exports = TodoController