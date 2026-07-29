import { useState, useRef, useEffect } from "react"

const Form = () => {
    const [detail, setdetail] = useState({
        name: '',
        email: '',
        phone: '',
        amount: 10000,
        raised: 0,
        cause: ''
    })

    const handleInput = (e) => {
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!detail.name || !detail.email || !detail.phone || !detail.cause || !detail.amount) {
            console.log('empty')
            return
        }
        console.log(detail)
        try {
            const response = await fetch('http://localhost:3000/user/donation', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:detail.name,
                    email:detail.email,
                    phone:detail.phone,
                    amount:detail.amount,
                    raised:detail.raised,
                    cause:detail.cause
                })
            })
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error(data.error||'something went wrong');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-md h-fit w-90 p-5 flex flex-col justify-center gap-5">
                <h1 className="text-lg font-semibold text-gray-700">Donation Form</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-sm font-semibold text-gray-700">Full Name:</h1>
                        <input value={detail.name} onChange={handleInput} name="name" className="bg-gray-100 w-full p-3 focus:outline-0 rounded-md border-b-2" type="text" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-700">email:</h1>
                        <input value={detail.email} onChange={handleInput} name="email" className="bg-gray-100 w-full p-3 focus:outline-0 rounded-md border-b-2" type="email" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-700">phone number:</h1>
                        <input value={detail.phone} onChange={handleInput} name="phone" className="bg-gray-100 w-full p-3 focus:outline-0 rounded-md border-b-2" type="text" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-700">amount:</h1>
                        <h1 className=" font-semibold text-green-500">{detail.amount}</h1>
                        <input min={10} max={10000} value={detail.amount} onChange={handleInput} name="amount" className="w-full accent-green-500" type="range" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-gray-700">cause:</h1>
                        <textarea value={detail.cause} onChange={handleInput} name="cause" className="bg-gray-100 w-full p-3 focus:outline-0 rounded-md text-xs border-b-2" type="text" />
                    </div>
                    <button type="submit" className="bg-gray-900 text-white font-semibold p-4 w-full rounded-md hover:scale-101 cursor-pointer">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default Form