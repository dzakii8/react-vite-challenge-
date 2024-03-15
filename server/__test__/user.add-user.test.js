const app = require('../app')
const request = require('supertest')
const { signToken } = require("../jwt")
const { hashPassword } = require('../bcrypt');

const {sequelize, User} = require('../models');
const {queryInterface} = sequelize

let access_token

beforeAll( async ()=>{
  let user3 = {
    userName : "admin",
    email : "admin@mail.com",
    password : "admin",
    role : "Admin",
    phoneNumber : "082121",
    address : "Depok"
  }
  let data = await User.create(user3)
  // console.log(data.id,"<<<<<<>>>>>>");
  access_token = signToken({id : data.id})
  // console.log(access_token);
})
afterAll(async()=>{
  await queryInterface.bulkDelete("Users", null, {
    truncate : true,
    cascade : true, 
    restartIdentity : true
  })
})

describe('post /add-user', ()=>{
  test('should create new user',async ()=>{
    let user =    {
      userName : "user3",
      email : "user3@mail.com",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').send(user).set('Authorization', `Bearer ${access_token}`)
    expect(status).toBe(201)
    expect(body).toEqual({
      userName : "user3",
      email : "user3@mail.com",
      phoneNumber : "082121",
      address : "Depok"
    })
  })
  test('should fail if email is null',async ()=>{
    let user =    {
      userName : "user3",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${access_token}`).send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "email is required"
    })
  })
  test('should fail if password is null',async ()=>{
    let user =    {
      userName : "user3",
      email : "user3@mail.com",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${access_token}`).send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "password is required"
    })
  })
  test('should fail if email is empty string',async ()=>{
    let user =    {
      userName : "user3",
      email : "",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${access_token}`).send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "email is required"
    })
  })
  test('should fail if password is empty string',async ()=>{
    let user =    {
      userName : "user3",
      email : "user3@mail.com",
      password : "",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${access_token}`).send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "password is required"
    })
  })
  test('should fail if email is already used',async ()=>{
    let user =    {
      userName : "user3",
      email : "admin@mail.com",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${access_token}`).send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "email is already used"
    })
  })
  test('should fail if format email not valid',async ()=>{
    let user =    {
      userName : "user3",
      email : "user3",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `Bearer ${access_token}`).send(user)
    expect(status).toBe(400)
    expect(body).toEqual({
      message: "email not valid"
    })
  })
  test('should fail if access token not available',async ()=>{
    let user =    {
      userName : "user3",
      email : "user3@mail.com",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').send(user)
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "you are not authorized"
    })
  })
  test('should fail if access token not valid',async ()=>{
    let user =    {
      userName : "user3",
      email : "user3@mail.com",
      password : "admin",
      phoneNumber : "082121",
      address : "Depok"
    }
    let {status, body} = await request(app).post('/users/add-user').set('Authorization', `sdfsfasffafasdff`).send(user)
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "you are not authorized"
    })
  })
})
