import express from 'express'
import cors from 'cors'
import Razor from 'razorpay'
import dotenv from 'dotenv'
dotenv.config({
  path: "./backend/.env",
});
const app = express()


const razorpay = new Razor({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
})

app.use(express.json())
app.use(cors())
app.post('/api',async (req,res)=>{
    const {name,message,amount} = req.body
    console.log(name,message,amount)
    const options = {
      amount: Number(amount) * 100, // ₹500 => 50000 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options)
    res.json(order)
})

app.listen(3000)