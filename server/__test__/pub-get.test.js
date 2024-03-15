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
  let type = {
    name : "Standard"
  }
  let lodging = {
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
  test('should read all lodgings', async () => {
    let { status, body } = await request(app).get('/pub')
    expect(status).toBe(200)
  })
  test('should read lodgings with filter typeId 1', async () => {
    let { status, body } = await request(app).get('/pub?filter[type]=1')
    expect(status).toBe(200)
  })
  test('should read lodgings with filter typeId 1', async () => {
    let { status, body } = await request(app).get('/pub?page[size]=1&page[number]=1')
    expect(status).toBe(200)
    expect(body.length).toBe(1)
  })
})