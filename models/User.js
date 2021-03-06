import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{ type: mongoose.Types.ObjectId, ref:'Link'}]
})

export default mongoose.model('User', schema)
