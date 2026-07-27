import express from 'express'
import db from '../schema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config({ path: './backend/.env' })

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body
    const exists = await db.findOne({ email: req.body.email })
    if (exists) {
        res.json({ message: 'user already exists!' })
        return
    }
    const hashedpass = await bcrypt.hash(password, 5)
    console.log(name, email, password)
    await db.insertOne({ name: name, email: email, password: hashedpass })
    res.status(201).json({ message: 'created!' })
})

router.post('/login', async (req, res) => {
    const user = await db.findOne({ email: req.body.email })
    if (!user) {
        res.json({ message: "user don't exists" })
        return
    }
    const ismatch = await bcrypt.compare(req.body.password, user.password)
    if (!ismatch) {
        res.json({ message: 'wrong password' })
        return
    }
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "20s"
        }
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 20 * 1000
    });
    res.json({ message: 'logged in!', token: token })

})

export default router