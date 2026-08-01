import donationdb from '../schema/donationschema.js'
import paymentdb from '../schema/paymentschema.js'
import userdb from '../schema/userschema.js'
import withdrawdb from '../schema/withdrawschema.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/',auth, async (req, res) => {
    await donationdb.insertOne({userid:req.user.id,...req.body})
    res.status(201).json({ message: 'submitted!' })
})

router.get('/otherfunds', async (req, res) => {
    const cards = await donationdb.find()
    res.json(cards)
})
router.get('/userfunds',auth, async (req, res) => {
    try {
        // const token = req.cookies.token
        // if (!token) {
        //     return res.status(401).json({ message: 'token not found' })
        // }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const cards = await donationdb.find({ email: req.user.email })
        res.json(cards)
    } catch (error) {

    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await donationdb.findByIdAndDelete(req.params.id)
        res.json({
            message: "Donation request deleted",
            status: true
        });
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', status: false })
    }
})


router.get('/userstats',auth, async (req, res) => {
    try {
        // const token = req.cookies.token
        // if (!token) {
        //     return res.status(401).json({
        //         message: 'token not found'
        //     })
        // }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userdb.findById(req.user.id)

        res.json({
            donated: user.totaldonated,
            raised: user.totalraised,
            donations: user.totaldonations,
        })
    } catch (error) {
        console.log(error)
    }
})


router.get('/donatedinfo', auth, async (req, res) => {
    try {
        // const token = req.cookies.token
        // if (!token) {
        //     return res.status(401).json({
        //         message: 'token not found'
        //     })
        // }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const donationinfo = await paymentdb.find({ donator: req.user.id }).populate("reciever","name")
        // {id:donationinfo._id,amount:donationinfo.amount,message:donationinfo.message}
        // console.log(donationinfo)
        res.status(200).json(donationinfo)
    } catch (err) {
        res.status(500).json({ message: 'some error occured', status: false })
    }
})

router.get('/recievedinfo', auth, async (req, res) => {
    try {
        const donationinfo = await paymentdb.find({ reciever: req.user.id }).populate("donator", "name")
        // {id:donationinfo._id,amount:donationinfo.amount,message:donationinfo.message}
        res.status(200).json(donationinfo)
    } catch (err) {
        res.status(500).json({ message: 'some error occured', status: false })
    }
})

router.get('/withdrawinfo', auth, async (req, res) => {
    try {
        const withdrawinfo = await withdrawdb.find({ userid: req.user.id })
        // {id:donationinfo._id,amount:donationinfo.amount,message:donationinfo.message}
        res.status(200).json(withdrawinfo)
    } catch (err) {
        res.status(500).json({ message: 'some error occured', status: false })
    }
})


export default router