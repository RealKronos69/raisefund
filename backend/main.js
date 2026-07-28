import express from 'express'
import cors from 'cors'
import Razor from 'razorpay'
import dotenv from 'dotenv'
import register from './routes/register.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
dotenv.config({
  path: "./backend/.env",
});
const app = express()


const razorpay = new Razor({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
})

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use('/user', register)

app.get('/api', (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ loggedIn: false })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      loggedIn: true,
      user: decoded
    })
  } catch (err) {
    console.log(err);
    res.status(401).json({
      loggedIn: false
    });
  }
})

app.post('/api', async (req, res) => {
  const { name, message, amount } = req.body
  console.log(name, message, amount)
  const options = {
    amount: Number(amount) * 100, // ₹500 => 50000 paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options)
  res.json(order)
})

app.listen(3000)