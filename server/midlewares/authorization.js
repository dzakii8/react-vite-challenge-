const { verifyToken } = require("../jwt")
const { User, Lodging } = require('../models')

async function authorization(req, res, next){
    try {
        // console.log("hehe");
        let data = await Lodging.findByPk(req.params.id)
        if(!data){
            throw {name : "NotFound"}
        }
        if (req.user.role == "Admin") {
            return next()
        }
        let {id} = req.user
        if (data.authorId != id) {
            throw {name : "Forbidden"}
        }
        next()
    } catch (error) {
        // console.log(error);
        next(error)
    }
}
async function authorizationRegis(req, res, next){
    try {
        if (req.user.role == "Admin") {
            return next()
        } else {
            throw {name : "Forbidden"}
        }
    } catch (error) {
        next(error)
    }
}
module.exports = {authorization, authorizationRegis}