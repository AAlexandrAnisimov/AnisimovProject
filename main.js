import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import routerAuth from './routes/auth.routes.js'
import routerLinks from './routes/link.routes.js'
import routerRedirect from './routes/redirect.routes.js'
import * as path from "path";

const PORT = config.get('PORT') || 5000

const app = express()
app.use(express.json({extended: true}))

app.use('/api/auth', routerAuth)
app.use('/api/link', routerLinks)
app.use('/to', routerRedirect)

if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(--__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start(){
    try{
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`App has been started ON ${PORT}`)
        })
    } catch (e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()