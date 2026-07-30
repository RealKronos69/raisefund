import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({
    path:'./backend/.env'
})

try {
    await mongoose.connect(process.env.MONGO_URL)
} catch (error) {
    console.log(error)
}

const schema = mongoose.Schema({
    donator:{
        type:String,
        required: true,
        trim:true
    },
    reciever:{
        type:String,
        trim:true,
        required: true
    },
    amount:{
        type:Number,
        min:1,
        required: true
    },
    orderID:{
        type:String,
        trim:true,
        required: true,
        unique:true
    },
    message:{
        type:String,
        trim:true,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const paymentdb = mongoose.model('payment',schema)
export default paymentdb