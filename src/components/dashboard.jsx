import { useRef, useState, useEffect } from "react"
import msgimg from '../assets/message.png'
import Menu from './menu'
const Dashboard = () => {

    return (
        <section className="h-screen bg-white">
            <div className="bg-gray-900 h-12 flex items-center justify-end p-3">
                <button className="cursor-pointer"><img className="w-8 h-8" src={msgimg} alt="" /></button>
            </div>
            <section>
                <div className="bg-red-400 p-5 flex flex-wrap gap-5">
                    <div className="border-2 w-60 h-40 rounded-2xl"></div>
                    <div className="border-2 w-60 h-40 rounded-2xl"></div>
                    <div className="border-2 w-60 h-40 rounded-2xl"></div>
                </div>
                <h1 className="p-3 font-bold">your funds</h1>
                <div className="bg-blue-200 p-5 flex gap-5 items-center flex-wrap">
                    <div className="border-2 w-70 h-70 rounded-2xl p-3 flex flex-col gap-5 justify-between bg-white">
                        <div className="flex flex-col gap-5">
                            <div className="p-3 bg-gray-200 rounded-3xl text-sm font-bold">ID:102039</div>
                        </div>
                        <div className="flex gap-1">
                            <h1 className="font-semibold">raised amount:</h1>
                            <div>1000/10000</div>
                        </div>
                        <p className="w-full overflow-y-auto wrap-break-word p-2">####</p>
                        <button className="bg-gray-900 text-white cursor-pointer hover:scale-101 rounded-3xl w-full p-3">remove</button>
                    </div>
                </div>
                <h1 className="p-3 font-bold">Active Funds</h1>
                <div className="bg-amber-200 flex flex-wrap gap-5 items-center justify-center p-5">
                    <div className="border-2 w-70 h-80 rounded-2xl p-3 flex flex-col gap-5 justify-between bg-white">
                        <div className="flex flex-col gap-5">
                            <div className="p-3 bg-gray-200 rounded-3xl text-sm font-bold">gyanendra verma</div>
                            <div className="p-3 bg-blue-400 rounded-3xl text-sm font-bold">ID:102039</div>
                        </div>
                        <div className="flex gap-1">
                            <h1 className="font-semibold">raised amount:</h1>
                            <div>1000/10000</div>
                        </div>
                        <p className="p-2 w-full overflow-y-auto wrap-break-word">####</p>
                        <button className="bg-gray-900 text-white cursor-pointer hover:scale-101 rounded-3xl w-full p-3">support</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Dashboard