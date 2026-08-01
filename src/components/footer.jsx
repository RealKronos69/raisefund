import gitimg from '../assets/github.png'
import instaimg from '../assets/instagram.png'
import teleimg from '../assets/telegram.png'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="">
            <div className="h-fit bg-gray-900 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 *:p-5">
                <div>
                    <h1 className='text-2xl text-white font-bold'>RAISEFUND</h1>
                    <p className='text-sm leading-6 text-gray-400 mt-2'>Connecting generous people with meaningful causes. Every contribution,
                        big or small, brings hope to someone in need.</p>
                    <p className="mt-6 text-sm font-medium text-white bg-gray-950 p-3">Together, We Raise Hope!</p>
                </div>
                <div>
                    <h1 className='text-lg text-gray-100 font-semibold'>Quick Links</h1>
                    <ul className='*:mt-2 *:hover:text-gray-700 *:cursor-pointer'>
                        <li onClick={() => { navigate("/#HOME") }} className='text-white text-sm'>Home</li>
                        <li onClick={() => { navigate("/user/dashboard#DONATIONS") }} className='text-white text-sm'>Donations</li>
                        <li onClick={() => { navigate("/#LEADERBOARD") }} className='text-white text-sm'>Leaderboard</li>
                        <li onClick={() => { navigate("/#TRENDING") }} className='text-white text-sm'>Trending</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-lg text-gray-100 font-semibold'>Support</h1>
                    <ul className='*:mt-2 *:hover:text-gray-700 *:cursor-pointer'>
                        <li className='text-white text-sm'>FAQ</li>
                        <li className='text-white text-sm'>Contact Us</li>
                        <li className='text-white text-sm'>Privacy Policy</li>
                        <li className='text-white text-sm'>Terms & Condition</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-lg text-gray-100 font-semibold'>Contact</h1>
                    <div className='*:text-white text-sm *:mt-3'>
                        <p>📧 support@raisefund.com</p>
                        <p>📞 +91 XXXXX XXXXX</p>
                        <p>📍 India</p>
                        <ul className="flex gap-5">
                            <li onClick={()=>{window.open("https://www.github.com/realkronos69", "_blank")}} className="w-8 h-8 bg-gray-600 rounded-3xl p-2 cursor-pointer"><img className='invert' src={gitimg} alt="" /></li>
                            <li onClick={()=>{window.open("https://www.instagram.com/gyanendra.verma_/", "_blank")}} className="w-8 h-8 bg-gray-600 rounded-3xl p-2 cursor-pointer"><img className='invert' src={instaimg} alt="" /></li>
                            <li onClick={()=>{window.open("https://t.me/realkronosz", "_blank")}} className="w-8 h-8 bg-gray-600 rounded-3xl p-2 cursor-pointer"><img className='invert' src={teleimg} alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='bg-gray-950 h-10 flex items-center'>
                <p className='text-gray-100 text-xs p-2'>
                    © 2026 RaiseFund. All rights reserved.
                </p>
            </div>

        </footer>

    )
}

export default Footer