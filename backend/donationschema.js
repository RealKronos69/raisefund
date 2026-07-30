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
    userid:{
        type:String,
        trim:true,
    },
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase: true
    },
    phone:{
        type:String,
        trim:true
    },
    amount:{
        type:Number,
        trim:true
    },
    raised:{
        type:Number,
        trim:true
    },
    cause:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const donation = mongoose.model('donations',schema)

export default donation