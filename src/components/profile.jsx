import { useRef, useState, useEffect } from "react"
import Menu from './menu'
const Profile = () => {

    return (
        <section className="h-screen bg-white">
            <div className="h-15 w-full bg-gray-900"></div>
            <section className="">
                <div className="flex flex-col gap-5 p-5 items-center">
                    <div className="w-40 h-40 bg-gray-100 rounded-full border-2"></div>
                    <div>
                        <div>
                            <h1 className="font-bold">name</h1>
                            <p>gyanendra verma</p>
                        </div>
                        <div className="">
                            <h1 className="font-bold">email</h1>
                            <p className="overflow-hidden">gyanendraverma@gmail.com</p>
                        </div>
                    </div>
                    <button className="bg-gray-900 text-white p-3 rounded-3xl w-50 hover:scale-101 cursor-pointer">edit profile</button>
                </div>
                <div className="bg-amber-300 w-full flex flex-wrap">


                </div>
            </section>
        </section>
    )
}

export default Profile