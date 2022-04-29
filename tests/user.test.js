const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()


const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
}

const nonExistent = {
    name: 'Joe',
    email: 'fake@example.com',
    password: '56what!!'
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})


test('should sign up a new user', async ()=> {
    await request(app).post('/users').send({
        name:"J.R.",
        email:"testllll@yahoo.com",
        password:"computer12345",

    }).expect(201)

})

test('should log in an existing user', async ()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not log in non existing user', async ()=>{
    await request(app).post('/users/login').send({
        email: nonExistent.email,
        password: nonExistent.password
    }).expect(400)
})
