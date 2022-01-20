import Link from "../models/Link.js"
import {Router} from "express"
import {auth} from "../middleware/auth.middleware.js"
import config from "config"
import shortid from "shortid"

const router = Router()

router.post('/gen', auth, async (req, res) =>{
    try{
        const baseURL = config.get('baseURL')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from})

        if (existing){
            return res.status(200).json({link: existing})
        }

        const to = baseURL + '/to/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({link})


    } catch (e) {
        res.status(500).json({message: "Server-side problem"})
    }
})

router.get('/', auth, async (req, res) =>{
    try{
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: "Server-side problem"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try{
        const link = await Link.findById(req.params.id)
        res.status(200).json(link)
    } catch (e) {
        res.status(500).json({message: "Server-side problem"})
    }
})


export default router