import gitimg from '../assets/github.png'
import instaimg from '../assets/instagram.png'
import teleimg from '../assets/telegram.png'

const Footer = ()=>{
    return(
        <footer className="">
            <div className=" bg-white flex justify-between items-center">
                <h1 className="text-2xl font-extrabold p-5 flex items-center">RAISEFUND</h1>
                <div className="flex gap-5 p-5">
                    <div className="w-10 h-10 bg-gray-200 rounded-3xl p-2 cursor-pointer"><img src={gitimg} alt="" /></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-3xl p-2 cursor-pointer"><img src={instaimg} alt="" /></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-3xl p-2 cursor-pointer"><img src={teleimg} alt="" /></div>
                </div>
            </div>
            <div className="h-50 bg-gray-900"></div>
        </footer>
    )
}

export default Footer