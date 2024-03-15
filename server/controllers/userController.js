const { User } = require("../models")
const { comparePassword } = require('../bcrypt')
const { signToken } = require("../jwt")

module.exports = class userController {

  static async register(req, res, next) {
    try {
      let user = await User.create(req.body)
      res
        .status(201)
        .json({ userName: user.userName, email: user.email, phoneNumber: user.phoneNumber, address: user.address })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw {
          name: 'BadRequest',
          message: 'email and password is required',
          status: 400
        }
      }
      const user = await User.findOne({
        where: {
          email
        }
      })
      // console.log(user);
      if (!user) {
        throw {
          name: 'Unauthorized',
          message: 'Email wrong',
          status: 401
        }
      }
      // console.log(user);
      const isValidPassword = comparePassword(password, user.password)
      if (!isValidPassword) {
        throw {
          name: 'Unauthorized',
          message: 'Password wrong',
          status: 401
        }
      }
      const access_token = signToken({ id: user.id })
      res
        .status(200)
        .json({ access_token })
    } catch (error) {
      next(error)
    }
  }
}