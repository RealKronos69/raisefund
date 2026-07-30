import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config({path:'./backend/.env'})

const auth = (req,res,next)=>{
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({message:"token not found"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

}

export default auth