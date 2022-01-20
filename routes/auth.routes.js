import {Router} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator';
import User from '../models/User.js'
import config from "config";
const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be >6').isLength({min:6})

    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array(), message:'Client-side problem'})
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if (candidate){
            return res.status(400).json({message: 'This user has already exist'})
        }

        const hashedPassword = await bcrypt.hash(password, 6)
        const user = new User({email, password:hashedPassword})

        await user.save()

        res.status(201).json({message: 'The user have been registered'})
    } catch(e) {
        res.status(500).json({message: "Server-side problem"})
    }

})

router.post('/login',
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Wrong password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array(), message:'Client-side problem'})
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user)
        {
            return res.status(400).json({message: 'Can`t find this user'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
        {
            return res.status(400).json({message: 'Wrong password'})
        }

        const token = jwt.sign({userId: user.id}, config.get('jwtSecretKey'), {expiresIn: '1h'})

        res.status(200).json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: "Server-side problem"})
    }
})

export default router