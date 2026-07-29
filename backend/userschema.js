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
        required: true,
        trim:true,
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
        trim:true
    },
    totaldonated:{
        type:Number,
        trim:true,
        default:0
    },
    totalraised:{
        type:Number,
        trim:true,
        default:0
    },
    totaldonations:{
        type:Number,
        trim:true,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const db = mongoose.model('userinfo',schema)

export default db