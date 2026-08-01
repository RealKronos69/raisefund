import express from 'express'
import userdb from '../schema/userschema.js'
import donationdb from '../schema/donationschema.js'
import paymentdb from '../schema/paymentschema.js'
import withdrawdb from '../schema/withdrawschema.js'
const router = express.Router()


router.get('/leaderboard', async (req, res) => {
    try {
        const data = await userdb.find().sort({ totaldonated: -1 }).limit(5).select("name totaldonated")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: false })
    }
})
router.get('/trending', async (req, res) => {
    try {
        const data = await donationdb.find({
            $expr: {
                $lt: ["$raised", "$amount"]
            },
            status: "active"
        }).sort({ raised: -1 }).limit(3)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: false })
    }
})
router.get('/stats', async (req, res) => {
    try {
        const [totalusers, totaldonations, totaltransactions, totalwithdrawal, totalraisedamount] = await Promise.all([
            userdb.countDocuments(),
            donationdb.countDocuments({ status: "active" }),
            paymentdb.countDocuments(),
            withdrawdb.countDocuments(),
            donationdb.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSum: { $sum: "$raised" }
                    }
                }
            ])
        ])


        const data = [
            {
                title: 'Total Users',
                count: totalusers,
                background: 'bg-white'
            },
            {
                title: 'Active Campaigns',
                count: totaldonations,
                background: 'bg-blue-200'
            },
            {
                title: 'Total Transactions',
                count: totaltransactions,
                background: 'bg-yellow-200'
            },
            {
                title: 'Total Fund Raised',
                count: totalraisedamount[0]?.totalSum || 0,
                background: 'bg-green-200'
            },
            {
                title: 'Total Withdrawal',
                count: totalwithdrawal,
                background: 'bg-red-200'
            }
        ]
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: false })
    }
})

export default router 