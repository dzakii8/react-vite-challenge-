const app = require('../app')
const request = require('supertest')
const { signToken } = require("../jwt")
const { hashPassword } = require('../bcrypt');

const { sequelize, User,Type } = require('../models');
const { queryInterface } = sequelize

let access_token

beforeAll(async () => {
  let user3 = {
    userName: "admin",
    email: "admin@mail.com",
    password: "admin",
    role: "Admin",
    phoneNumber: "082121",
    address: "Depok"
  }
  await queryInterface.bulkInsert("Types", [
    {
      name: "Standard",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Deluxe",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Suite",
      createdAt : new Date(),
      updatedAt : new Date()
    }
] ,{})
  let data = await User.create(user3)
  // console.log(data.id,"<<<<<<>>>>>>");
  access_token = signToken({ id: data.id })
  // console.log(access_token);
})
afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
  await queryInterface.bulkDelete("Types", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
  await queryInterface.bulkDelete("Lodgings", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
})

describe('post /lodgings', () => {
  test('should create new lodgings', async () => {
    let lodging = {
      "name": "Hotel fafasf",
      "facility": "gym, spa",
      "roomCapacity": 2,
      "imgUrl": "https://example.com/hotel_abc.jpg",
      "location": "City b",
      "price": 100000,
      "typeId": 2,
      "authorId": 1
    }
    let { status, body } = await request(app).post('/lodgings').set('Authorization', `Bearer ${access_token}`).send(lodging)
    expect(status).toBe(201)
    expect(body).toMatchObject(lodging)
  })
  test('should fail if not logged', async () => {
    let lodging = {
      "name": "Hotel fafasf",
      "facility": "gym, spa",
      "roomCapacity": 2,
      "imgUrl": "https://example.com/hotel_abc.jpg",
      "location": "City b",
      "price": 100000,
      "typeId": 2,
      "authorId": 1
    }
    let { status, body } = await request(app).post('/lodgings').send(lodging)
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "you are not authorized"
    })
  })
  test('should fail if token not valid', async () => {
    let lodging = {
      "name": "Hotel fafasf",
      "facility": "gym, spa",
      "roomCapacity": 2,
      "imgUrl": "https://example.com/hotel_abc.jpg",
      "location": "City b",
      "price": 100000,
      "typeId": 2,
      "authorId": 1
    }
    let { status, body } = await request(app).post('/lodgings').set('Authorization', `Bearer fasfsafasf`).send(lodging)
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "you are not authorized"
    })
  })
  test('should fail if req.body do not match ', async () => {
    let lodging = {
      "facility": "gym, spa",
      "roomCapacity": 2,
      "imgUrl": "https://example.com/hotel_abc.jpg",
      "location": "City b",
      "price": 100000,
      "typeId": 2,
      "authorId": 1
    }
    let { status, body } = await request(app).post('/lodgings').set('Authorization', `Bearer ${access_token}`).send(lodging)
    expect(status).toBe(400)
    expect(body).toHaveProperty('message')
  })
})