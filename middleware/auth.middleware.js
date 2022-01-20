import jwt from 'jsonwebtoken'
import config from "config";

export const auth =  (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next()
    }

    try {
        const token = req.headers.authorization.split( ' ')[1]

        if (!token){
            return res.status(401).json({message: 'Пройдите авторизацию'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecretKey'))
        req.user = decoded
        next()
    } catch (e) {
        res.status(500).json({message: 'Server-side problem'})
    }
}