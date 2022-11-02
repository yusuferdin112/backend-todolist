const AuthController = require("./controllers/AuthController")
const UserController = require("./controllers/UserController")

const _routes = [
    ['users', UserController], //http://localhost:8000/api/users
    ['', AuthController], //http://localhost:8000/api/login
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        //http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes