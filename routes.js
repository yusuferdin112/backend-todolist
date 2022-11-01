const UserController = require("./controllers/UserController")

const _routes = [
    ['users', UserController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes