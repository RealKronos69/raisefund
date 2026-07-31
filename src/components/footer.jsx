import gitimg from '../assets/github.png'
import instaimg from '../assets/instagram.png'
import teleimg from '../assets/telegram.png'

const Footer = ()=>{
    return(
        <footer className="">
            <div className=" bg-gray-800 flex justify-between items-center">
                <h1 className="text-2xl font-extrabold p-5 flex items-center"></h1>
                <div className="flex gap-5 p-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-3xl p-2 cursor-pointer"><img className='invert' src={gitimg} alt="" /></div>
                    <div className="w-8 h-8 bg-gray-700 rounded-3xl p-2 cursor-pointer"><img className='invert' src={instaimg} alt="" /></div>
                    <div className="w-8 h-8 bg-gray-700 rounded-3xl p-2 cursor-pointer"><img className='invert' src={teleimg} alt="" /></div>
                </div>
            </div>
            <div className="h-10 bg-gray-900"></div>
        </footer>
    )
}

export default Footer