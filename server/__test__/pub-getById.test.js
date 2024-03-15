const app = require('../app')
const request = require('supertest')
const { signToken } = require("../jwt")
const { hashPassword } = require('../bcrypt');

const { sequelize, User,Type,Lodging } = require('../models');
const { queryInterface } = sequelize

let access_token
let lodging

beforeAll(async () => {
  let user3 = {
    userName: "admin",
    email: "admin@mail.com",
    password: "admin",
    role: "Admin",
    phoneNumber: "082121",
    address: "Depok"
  }
  let type = {
    name : "Standard"
  }
  lodging = {
    name : "Hotel fafasf",
    facility : "gym, spa",
    roomCapacity : 2,
    imgUrl : "https://example.com/hotel_abc.jpg",
    location : "City b",
    price : 100000,
    typeId : 1,
    authorId : 1
  }
  let data = await User.create(user3)
  let dataType = await Type.create(type)
  let dataLodging = await Lodging.create(lodging)
  // console.log(data.id,"<<<<<<>>>>>>");
  access_token = signToken({ id: data.id })
  // console.log(access_token);
})
afterAll(async () => {
  await queryInterface.bulkDelete("Lodgings", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
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
})

describe('get /pub', () => {
  test('should read lodgings with id = 1', async () => {
    let { status, body } = await request(app).get('/pub/1').set('Authorization', `Bearer ${access_token}`)
    expect(status).toBe(200)
    expect(body).toMatchObject(lodging)
  })
  test('should fail if no data with id = req.params.id', async () => {
    let { status, body } = await request(app).get('/logings/100').set('Authorization', `Bearer ${access_token}`)
    expect(status).toBe(404)
    // expect(body).toEqual({
    //   message: "you are not authorized"
    // })
  })
})