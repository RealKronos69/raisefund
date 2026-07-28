import { useState, useRef, useEffect } from 'react'
import gitimg from '../assets/github.png'
import fundimg from '../assets/fund.png'
import userimg from '../assets/user.png'
import Navbar from './navbar'

const Home = () => {
    const cardobj = [
        {
            title: "Trusted Campaigns",
            msg: "Every fundraiser is reviewed to help create a safe and trustworthy platform for donors and those seeking support."
        },
        {
            title: "Secure Donations",
            msg: "Donate with confidence through secure payment processing, ensuring every contribution is handled safely and transparently."
        },
        {
            title: "Make a Real Impact",
            msg: "Your support, no matter the amount, helps individuals and communities move closer to achieving their goals."
        }
    ]

    const [islogged,setislogged] = useState(false)

    useEffect(()=>{
        const fetchinfo = async ()=>{
            const res = await fetch('http://localhost:3000/api',{
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setislogged(true)
            }else{
                setislogged(false)
            }
        }
        fetchinfo()
    },[])

    const [card, setcard] = useState(cardobj)
    return (
        <section className="">
            <div className='p-3 bg-gray-100 flex gap-5'>
                {islogged===false && <a href='/user/signup' className='bg-gray-900 text-white p-3 rounded-3xl text-xs font-semibold hover:scale-101 cursor-pointer pl-5 pr-5 hover:bg-gray-800'>Create Account</a>}
                <a href='https://github.com/realkronos69' className='bg-white text-gray-800 p-3 rounded-3xl text-xs font-bold hover:scale-101 cursor-pointer pl-5 pr-5 hover:bg-gray-200 flex justify-center items-center gap-2 shadow-2xl'><img className='w-5 h-5' src={gitimg} alt="" />GitHub</a>
                <a href='/user/dashboard' className='bg-red-500 p-3 rounded-3xl text-xs font-bold hover:scale-101 cursor-pointer hover:bg-red-300 flex justify-center items-center gap-2 shadow-2xl'><img className='w-5 h-5 invert' src={userimg} alt="" /></a>

            </div>
            <section className='bg-gray-900 p-5 h-120 flex justify-center flex-col items-center gap-5 w-full'>
                <h1 className='text-white font-bold text-3xl max-w-90 text-center'><span className='text-yellow-200'>RaiseFund</span>, A Crowd Funding Website!</h1>
                <p className='text-white max-w-90 text-center'>At RaiseFund, we believe that a small act of kindness can create a life-changing impact. Our platform connects people in need with individuals who are willing to help, making fundraising simple, transparent, and accessible.</p>
            </section>
            <section className='p-5 bg-gray-900'>
                <div className='w-full h-fit flex gap-10 flex-wrap justify-center p-2'>
                    {card.map((e) => {
                        return (
                            <div key={e.title} className='w-90 h-50 bg-white border-2 border-gray-500 rounded-2xl text-center flex flex-col gap-5 justify-center p-5 hover:bg-gray-300'>
                                <h1 className='font-bold text-xl text-gray-900'>{e.title}</h1>
                                <p>{e.msg}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className=' p-5 flex gap-10 flex-wrap bg-gray-900'>
                <div className='bg-white rounded-2xl h-fit p-5 flex-col flex gap-5 shadow-black shadow-md'>
                    <h1 className='text-2xl font-bold'>📢 Join Our Community</h1>
                    <p className='font-semibold text-gray-700'>Together, We Can Make a Difference, Whether you're starting a fundraiser or supporting someone else's journey, you're becoming part of a community that believes in helping others. Join RaiseFund today and be a part of something bigger than yourself.</p>
                    <button className='bg-blue-500 text-white p-3 rounded-3xl text-xs font-bold hover:scale-101 cursor-pointer w-30 hover:bg-blue-400 flex justify-center items-center gap-2 shadow-2xl'>Join Group</button>
                </div>
            </section>
        </section>
    )
}

export default Home