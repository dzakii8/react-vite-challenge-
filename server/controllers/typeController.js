const {Type} = require('../models')

module.exports = class typeController{
    static async getAll(req,res,next){
        try {
            let data = await Type.findAll()
            
            res
            .status(200)
            .json(data)
        } catch (error) {
            next(error)
        }
    }
    static async postType(req,res,next){
        try {
            let data = await Type.create(req.body)
            res
            .status(201)
            .json(data)
        } catch (error) {
            next(error)
        }
    }
    static async putById(req,res,next){
        try {
            let {id} = req.params
            let data = await Type.update(req.body,{
                where : { id }
            })
            if (!data) {        
                throw {name : 'NotFound'}
            }
            let editedData = await Type.findByPk(id)

            res
            .status(201)
            .json(editedData)
        } catch (error) {
            next(error)
        }
    }
}