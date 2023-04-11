import models from "../models/models.js";
import {ApiError} from "../error/ApiError.js";

const {Brand} = models

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const types = await Brand.findAll()
        return res.json(types)
    }

}

export default new BrandController()