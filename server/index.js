import express from 'express'
import fileUpload from "express-fileupload";
import dotenv from 'dotenv'
import path from "path";
import cors from 'cors'
import {fileURLToPath} from "url";
import sequelize from './db.js'
import models from './models/models.js'
import router from "./routes/index.js"
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()


const PORT = process.env.PORT || 3080

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`Server was started at `+ PORT)})
    } catch (e) {
        console.log(e)
    }
}

start()