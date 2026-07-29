import donation from '../donationschema.js'
import userdb from '../userschema.js'
import express from 'express'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.get('/', async (req, res) => {
    const cards = await donation.find()
    res.json(cards)
})

router.post('/', async (req, res) => {
    await donation.insertOne(req.body)
    res.json({ message: 'submitted!' })
})

router.get('/userstats', async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: 'token not found'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userdb.findOne({ _id: decoded.id })
        console.log(user)

        res.json({
            donated: user.totaldonated,
            raised: user.totalraised,
            donations: user.totaldonations,
        })
    } catch (error) {
        console.log(RangeError)
    }
})


export default router