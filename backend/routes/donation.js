import donation from '../donationschema.js'
import express from 'express'
const router = express.Router()

router.get('/',async (req,res)=>{
    const cards = await donation.find()
    res.json(cards)
})

router.post('/',async (req,res)=>{
    await donation.insertOne(req.body)
    res.json({message:'submitted!'})
})


export default router