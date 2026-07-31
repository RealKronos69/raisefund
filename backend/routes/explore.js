import express from 'express'
import userdb from '../userschema.js'
const router = express.Router()


router.get('/leaderboard',async (req,res)=>{
    try {
        const data = await userdb.find().sort({totaldonated:-1}).limit(5).select("name totaldonated")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({status:false})
    }
})

export default router 