const request = require('supertest')
const app = require('./server')

let token

describe('User', () => {
    test('Login', async () => {
        const res = await request(app).post('/api/login').send({
            email: "ucuv@gmail.com",
            password: "12345"
        })

        expect(res.statusCode).toBe(200)
        token = res.body.data.token
    })

    test('List User', async () => {
        const res = await request(app).get('/api/users')
        expect(res.status).toBe(200)
    })

    test('Create User', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'saya',
            email: 'saya@gmail.com',
            password: '12345'
        })

        expect(res.statusCode).toBe(201)
    })

    test('Update User', async () => {
        const res = await request(app).put('/api/users').send({
            id: 3,
            name: 'saya',
            email: 'saya@gmail.com',
            password: '12345'
        })

        expect(res.statusCode).toBe(201)
    })
})