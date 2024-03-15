const { Lodging, User, sequelize, Type } = require('../models')
const { Op } = require("sequelize");
const { v2: cloudinary } = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


module.exports = class lodgingController {
    static async postLodging(req, res, next) {
        try {
            delete req.body.authorId
            req.body.authorId = req.user.id

            let data = await Lodging.create(req.body)
            res
                .status(201)
                .json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getAllPubLodging(req, res, next) {
        const { filter, sort, page, search } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;
        //search
        // console.log(paramQuerySQL);
        if (search !== '' && typeof search !== 'undefined' && !paramQuerySQL.where) {
            paramQuerySQL.where = {
                name: { [Op.iLike]: `%${search}%` }
            };
        } else if (search !== '' && typeof search !== 'undefined' && paramQuerySQL.where) {
            paramQuerySQL.where.name =
                { [Op.iLike]: `%${search}%` }
        }
        // console.log(paramQuerySQL);


        // filtering by category
        if (filter !== '' && typeof filter !== 'undefined') {
            const query = filter.type.split(',').map((item) => ({
                [Op.eq]: item,
            }));
            if (!paramQuerySQL.where) {
                paramQuerySQL.where = {
                    typeId: { [Op.or]: query }
                };
            } else {
                paramQuerySQL.where.typeId ={
                    [Op.or]: query
                }
            }
        }
        // console.log(paramQuerySQL);

        // sorting
        if (sort !== '' && typeof sort !== 'undefined') {
            let query;
            if (sort.charAt(0) !== '-') {
                query = [[sort, 'ASC']];
            } else {
                query = [[sort.replace('-', ''), 'DESC']];
            }
            paramQuerySQL.order = query;
        }

        // pagination
        if (page !== '' && typeof page !== 'undefined') {
            if (page.size !== '' && typeof page.size !== 'undefined') {
                limit = page.size;
                paramQuerySQL.limit = limit;
            }

            if (page.number !== '' && typeof page.number !== 'undefined') {
                offset = page.number * limit - limit;
                paramQuerySQL.offset = offset;
            }
        } else {
            limit = 10; // limit 5 item
            offset = 0;
            paramQuerySQL.limit = limit;
            paramQuerySQL.offset = offset;
        }

        paramQuerySQL.include = [{
            model: User,
            attributes: ['userName']
        }, {
            model: Type,
            attributes: ['name']
        }]

        try {
            const data = await Lodging.findAll(paramQuerySQL);
            if (!data) {
                throw { name: "NotFound" }
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    static async getPubById(req, res, next) {
        try {
            let { id } = req.params
            let data = await Lodging.findByPk(id)
            if (!data) {
                throw { name: 'NotFound' }
            }
            res
                .status(200)
                .json(data)
        } catch (error) {
            next(error)
        }
    }
    static async putById(req, res, next) {
        try {
            let { id } = req.params
            delete req.body.authorId
            req.body.authorId = req.user.id
            let data = await Lodging.update(req.body, {
                where: { id }
            })
            let editedData = await Lodging.findByPk(id)
            // console.log(editedData);
            if (!editedData) {
                throw { name: 'NotFound' }
            }
            
            res
                .status(200)
                .json(editedData)
        } catch (error) {
            next(error)
        }
    }
    static async patchById(req, res, next) {
        try {
          if (!req.file) {
            throw{name:"NotFound"}
          }
                const base64 = Buffer.from(req.file.buffer).toString('base64')
                const dataURI = `data:${req.file.mimetype};base64,${base64}`

                const result = await cloudinary.uploader.upload(dataURI)

                await Lodging.update({ imgUrl: result.secure_url }, {
                    where: { id: req.params.id }
                })
                let data = await Lodging.findByPk(req.params.id)
                res
                    .status(200)
                    .json(data.imgUrl)
        } catch (error) {
            next(error)
        }
    }
    static async deleteById(req, res, next) {
        try {
            let { id } = req.params

            let find = await Lodging.findByPk(id)

            let data = await Lodging.destroy({
                where: { id }
            })
            if (!data) {
                throw { name: 'NotFound' }
            }
            res
                .status(200)
                .json({
                    message: `${find.name} success to delete`
                })
        } catch (error) {
            next(error)
        }
    }



}