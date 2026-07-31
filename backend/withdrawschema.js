import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({ path: './backend/.env' })

try {
    await mongoose.connect(process.env.MONGO_URL)
} catch (error) {
    console.log(error)
}

const schema = mongoose.Schema({
    userid: {
        type: String,
        trim: true,
        required: true,
    },
    campaignId: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    raised: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "withdrawn"],
        default: "pending",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const withdrawdb = mongoose.model('withdraw', schema)

export default withdrawdb