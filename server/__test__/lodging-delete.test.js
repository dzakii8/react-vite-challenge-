const app = require('../app')
const request = require('supertest')
const { signToken } = require("../jwt")
const { hashPassword } = require('../bcrypt');

const { sequelize, User,Type,Lodging } = require('../models');
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
  let user4 = {
    userName: "staff",
    email: "staff@mail.com",
    password: "admin",
    role: "Staff",
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
  let dataStaff = await User.create(user4)
  let dataLodging = await Lodging.create({
    name : "Hotel fafasf",
    facility : "gym, spa",
    roomCapacity : 2,
    imgUrl : "https://example.com/hotel_abc.jpg",
    location : "City b",
    price : 100000,
    typeId : 2,
    authorId : 1
  })
  let dataLodging2 = await Lodging.create({
    name : "Hotel fafasf",
    facility : "gym, spa",
    roomCapacity : 2,
    imgUrl : "https://example.com/hotel_abc.jpg",
    location : "City b",
    price : 100000,
    typeId : 2,
    authorId : 1
  })
  // console.log(data.id,"<<<<<<>>>>>>");
  access_token = signToken({ id: data.id })
  access_token_staff = signToken({ id: dataStaff.id })
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
  test('should delete lodgings', async () => {
    let { status, body } = await request(app).delete('/lodgings/1').set('Authorization', `Bearer ${access_token}`)
    expect(status).toBe(200)
    expect(body).toHaveProperty('message')
  })
  test('should fail if not logged', async () => {
    let { status, body } = await request(app).delete('/lodgings/1')
    expect(status).toBe(401)
    expect(body).toEqual({
      message: "you are not authorized"
    })
  })
  test('should fail if token is not valid ', async () => {
    let { status, body } = await request(app).delete('/lodgings/100').set('Authorization', `Bearer sfasfasfsaf`)
    expect(status).toBe(401)
    expect(body).toHaveProperty('message')
  })
  test('should fail if id Lodging not found ', async () => {
    let { status, body } = await request(app).delete('/lodgings/100').set('Authorization', `Bearer ${access_token}`)
    expect(status).toBe(404)
    expect(body).toHaveProperty('message')
  })
  test('should fail if id Lodging not found ', async () => {
    let lodging = {
      "facility": "gym, spa",
      "roomCapacity": 2,
      "imgUrl": "https://example.com/hotel_abc.jpg",
      "location": "City b",
      "price": 100000,
      "typeId": 2,
      "authorId": 1
    }
    let { status, body } = await request(app).delete('/lodgings/100').set('Authorization', `Bearer ${access_token}`)
    expect(status).toBe(404)
    expect(body).toHaveProperty('message')
  })
  test('should fail if staff delete not his own', async () => {
    let { status, body } = await request(app).delete('/lodgings/2').set('Authorization', `Bearer ${access_token_staff}`)
    expect(status).toBe(403)
    expect(body).toHaveProperty('message')
  })
})