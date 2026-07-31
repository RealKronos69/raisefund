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
import paymentdb from './paymentschema.js'
import withdrawdb from './withdrawschema.js'
import crypto from 'crypto'
import auth from './middleware/auth.js'
import explore from './routes/explore.js'
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
app.use('/explore', explore)

app.get('/api', (req, res) => {

  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ loggedIn: false })
    }
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

app.get('/api/getuser', auth, async (req, res) => {
  try {
    // const token = req.cookies.token
    // if (!token) {
    //   return res.status(401).json({message:'token not found'})
    // }
    // const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userdb.findOne({ _id: req.user.id }).select("name email")
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'error' })
  }
})

app.post('/create-order', auth, async (req, res) => {
  try {
    const { donateid, amount } = req.body
    const options = {
      amount: Number(amount) * 100, // ₹500 => 50000 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options)
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({message:'something went wrong'})
  }
})

app.post('/verify-payment',auth, async (req, res) => {
  try {
    const {
      donateid,
      message,
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

    await donatedb.findOneAndUpdate({ userid: donateid }, {
      $inc: {
        raised: amount
      }
    })
    await userdb.findOneAndUpdate({ _id: donateid }, {
      $inc: {
        totalraised: amount
      }
    })
    await userdb.findOneAndUpdate({ _id: decoded.id }, {
      $inc: {
        totaldonated: amount,
        totaldonations: 1
      },
    })
    await paymentdb.insertOne({ donator: decoded.id, reciever: donateid, amount: amount, orderID: razorpay_order_id, message: message })
    res.json({ message: 'successfull payment!', status: true })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false
    })
  }

})

app.post('/withdraw', auth, async (req, res) => {
  try {
    const campaign = await donatedb.findOneAndUpdate(
      {
        campaignId: req.body.campaignId,
        userid: req.user.id
      },
      {
        status: "pending"
      }
    )
    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found"
      })
    }
    await withdrawdb.insertOne(req.body)
    res.status(201).json({ message: 'withdrawal request submitted!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'withdrawal request failed!' })
  }
})

app.listen(3000)