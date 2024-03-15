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
const imageBuffer = Buffer.from('example_image_data', 'utf-8');

describe.skip('post /lodgings', () => {
  test('should replace imgUrl', async () => {

    let { status, body } = await request(app).put('/lodgings/1').set('Authorization', `Bearer ${access_token}`).attach('imgUrl', imageBuffer,{ filename: 'example.jpg', contentType: 'image/jpeg' })
    expect(status).toBe(200)
    expect(body).toHaveProperty('imgUrl')
  })
  test('should fail if not loggedin', async () => {

    let { status, body } = await request(app).put('/lodgings/1').attach('imgUrl', imageBuffer,{ filename: 'example.jpg', contentType: 'image/jpeg' })
    expect(status).toBe(401)
    expect(body).toHaveProperty('message')
  })
  test('should fail if token is not valid ', async () => {
    let { status, body } = await request(app).put('/lodgings/100').set('Authorization', `Bearer sfasfasfsaf`).attach('imgUrl', imageBuffer,{ filename: 'example.jpg', contentType: 'image/jpeg' })
    expect(status).toBe(401)
    expect(body).toHaveProperty('message')
  })
  test('should fail if id Lodging not found ', async () => {
    let { status, body } = await request(app).put('/lodgings/100').set('Authorization', `Bearer ${access_token}`).attach('imgUrl', imageBuffer,{ filename: 'example.jpg', contentType: 'image/jpeg' })
    expect(status).toBe(404)
    expect(body).toHaveProperty('message')
  })
  test('should fail if id Lodging not found ', async () => {
    let { status, body } = await request(app).put('/lodgings/100').set('Authorization', `Bearer ${access_token}`).attach('imgUrl', imageBuffer,{ filename: 'example.jpg', contentType: 'image/jpeg' })
    expect(status).toBe(404)
    expect(body).toHaveProperty('message')
  })
  test('should fail if staff edit not his own', async () => {

    let { status, body } = await request(app).put('/lodgings/1').set('Authorization', `Bearer ${access_token_staff}`).attach('imgUrl', imageBuffer,{ filename: 'example.jpg', contentType: 'image/jpeg' })
    expect(status).toBe(403)
    expect(body).toHaveProperty('message')
  })
  test('should fail if req.body do not match', async () => {
    let lodging = {
      "name": "",
      "facility": "gym, spa",
      "roomCapacity": 2,
      "imgUrl": "https://example.com/hotel_abc.jpg",
      "location": "City b",
      "price": 100000,
      "typeId": 2,
      "authorId": 1
    }
    let { status, body } = await request(app).put('/lodgings/1').set('Authorization', `Bearer ${access_token}`).send(lodging)
    expect(status).toBe(400)
    expect(body).toHaveProperty('message')
  })
})