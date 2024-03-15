const { verifyToken } = require("../jwt")
const { User } = require('../models')

async function authentication(req, res, next){
    try {
        let token = req.headers.authorization
        // console.log(token);
        if (!token) {
            throw { name: 'InvalidToken' }
        }
        if (token.slice(0, 7) !== 'Bearer ') {
            throw { name: 'InvalidToken' }
        }
        token = token.slice(7)
        let payload = verifyToken(token)
        if (!payload) {
            throw { name: 'InvalidToken' }
        }
        // console.log(payload.id);
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: 'InvalidToken' }
        }
        req.user = {
            id : user.id,
            role : user.role
        }
        next()
    } catch (error) {
        // console.log(error);
        next(error)
    }
}
module.exports = authentication