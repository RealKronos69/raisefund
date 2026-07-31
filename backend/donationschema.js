import mongoose from 'mongoose'
import dotenv from 'dotenv'
import crypto from "crypto"
dotenv.config({ path: "./backend/.env" })

try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected")
} catch (err) {
    console.error(err)
}

const schema = new mongoose.Schema({
    userid: {
        type: String,
        trim: true,
    },
    campaignId: {
        type: String,
        trim: true,
        default: () => crypto.randomBytes(10).toString("hex"),
    },
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    raised: {
        type: Number,
        trim: true
    },
    cause: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "pending", "withdrawn"],
        default: "active",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const donation = mongoose.model('donations', schema)

export default donation