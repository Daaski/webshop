import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer <sometoken>
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}