import express from 'express'
import cors from 'cors'
import Razor from 'razorpay'
import dotenv from 'dotenv'
import register from './routes/register.js'
import dform from './routes/donation.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import donatedb from './donationschema.js'
import userdb from './userschema.js'
import crypto from 'crypto'
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
app.use('/user/donation', dform)

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

app.post('/create-order', async (req, res) => {
  const { donateid, name, message, amount } = req.body
  const options = {
    amount: Number(amount) * 100, // ₹500 => 50000 paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options)
  res.json(order)
})

app.post('/verify-payment', async (req, res) => {
  console.log(req.body)
  try {
    const {
      donateid,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        message: "No token found",
        status: false
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)


    const generatedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex")

    if (generatedSignature !== razorpay_signature) {
      return res.json({ message: 'payment verification failed!', status: false })
    }

    await donatedb.findOneAndUpdate({ _id: donateid }, {
      $inc: {
        raised: amount
      }
    })
    await userdb.findOneAndUpdate({ _id: decoded.id }, {
      $inc: {
        totaldonated: amount,
        totaldonations: 1
      },
    })
    res.json({ message: 'successfull payment!', status: true })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false
    })
  }

})

app.listen(3000)