import models from "../models/models.js";
import {ApiError} from "../error/ApiError.js";

const {Type} = models

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

export default new TypeController()