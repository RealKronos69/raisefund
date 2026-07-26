import { useState, useRef, useEffect } from 'react'

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
    const [card, setcard] = useState(cardobj)
    return (
        <section className="">
            <section className='bg-black p-5 h-150 flex justify-center flex-col items-center gap-5 w-full'>
                <h1 className='text-white font-bold text-3xl max-w-90 text-center'><span className='text-yellow-200'>RaiseFund</span>, A Crowd Funding Website!</h1>
                <p className='text-white max-w-90 text-center'>At RaiseFund, we believe that a small act of kindness can create a life-changing impact. Our platform connects people in need with individuals who are willing to help, making fundraising simple, transparent, and accessible.</p>
            </section>
            <section className='p-5 bg-gray-800'>
                <div className='w-full h-fit flex gap-10 flex-wrap justify-center p-5'>
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
            <section className='p-5 bg-gray-800'>

            </section>
        </section>
    )
}

export default Home