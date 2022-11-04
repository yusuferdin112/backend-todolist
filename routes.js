const AuthController = require("./controllers/AuthController")
const UserController = require("./controllers/UserController")
const TodoController = require("./controllers/TodoController")

const _routes = [
    ['users', UserController], //http://localhost:8000/api/users
    ['', AuthController], //http://localhost:8000/api/login
    ['todos', TodoController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        //http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes