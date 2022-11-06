const request = require('supertest')
const app = require('./server')

let token

describe('Todo', () => {
    test('Login', async () => {
        const res = await request(app).post('/api/login').send({
            email: "ucuv@gmail.com",
            password: "12345"
        })

        expect(res.statusCode).toBe(200)
        token = res.body.data.token
    })

    test('List Todo', async () => {
        const res = await request(app).get('/api/todos').set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
    })

    test('Add Todo', async () => {
        const res = await request(app).post('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({
            description: 'todo untuk testing'
        })

        expect(res.statusCode).toBe(201)
    })

    test('Update Todo', async () => {
        const res = await request(app).put('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({
            id: 3,
            description: 'merubah todo untuk testing'
        })

        expect(res.statusCode).toBe(201)
    })
})