import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: "./backend/.env" })

try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected")
} catch (err) {
    console.error(err)
}

const schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase: true
    },
    password:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const db = mongoose.model('userinfo',schema)

export default db