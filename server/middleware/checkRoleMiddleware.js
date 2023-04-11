import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export default function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //Bearer <sometoken>
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Доступ запрещён"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}


