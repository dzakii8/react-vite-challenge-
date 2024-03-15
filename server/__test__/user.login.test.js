const app = require('../app')
const request = require('supertest')
const { signToken,verifyToken } = require("../jwt")
const { hashPassword } = require('../bcrypt');

const {sequelize, User} = require('../models');
const {queryInterface} = sequelize

let data
beforeAll( async ()=>{
  let admin = {
    userName : "admin",
    email : "admin@mail.com",
    password : "admin",
    role : "Admin",
    phoneNumber : "082121",
    address : "Depok"
  }
  data = await User.create(admin)
})
afterAll(async()=>{
  await queryInterface.bulkDelete("Users", null, {
    truncate : true,
    cascade : true, 
    restartIdentity : true
  })
})

describe('post /login', ()=>{
  test('should success to login and get access token',async ()=>{
    let user =    {
      email: "admin@mail.com",
      password : "admin",
    }
    let {status, body} = await request(app).post('/users/login').send(user)
    expect(status).toBe(200)
    expect(body).toEqual({"access_token":signToken({id : data.id})})
  })
  test('should fail if email is undefine/null',async ()=>{
    let user =    {
      password : "admin",
    }
    let {status, body} = await request(app).post('/users/login').send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "email and password is required"
    })
  })
  test('should fail if password is undefine/null',async ()=>{
    let user =    {
      email : "admin@mail.com",
    }
    let {status, body} = await request(app).post('/users/login').send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "email and password is required"
    })
  })
  test('should fail if email is not registered',async ()=>{
    let user =    {
      email : "admin1@mail.com",
      password : "admin"
    }
    let {status, body} = await request(app).post('/users/login').send(user)
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "Email wrong"
    })
  })
  test('should fail if password is wrong',async ()=>{
    let user =    {
      email : "admin@mail.com",
      password : "admin1"
    }
    let {status, body} = await request(app).post('/users/login').send(user)
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "Password wrong"
    })
  })
})
