import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"

const PayRecieved = () => {
    const [recieved, setrecieved] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchinfo = async () => {
            try {
                const res = await fetch('http://localhost:3000/user/donation/recievedinfo', {
                    credentials: 'include'
                })
                const data = await res.json()
                if (res.ok) {
                    setrecieved(data)
                }
                if (res.status===401) {
                    navigate('/user/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchinfo()
    }, [])
    return (
        <section className="bg-gray-900 h-full flex justify-around">
            <div className="w-90 bg-gray-200 h-full flex flex-col gap-5 p-5 overflow-y-auto scrollbar-none">
                {recieved.map((e) => {
                    return (
                        <div key={e._id} className="w-full h-fit bg-white shrink-0 p-2">
                            <h1 className="text-sm font-bold">From : </h1>
                            <div>
                                amount : {e.amount}
                            </div>
                            <div>
                                <p className="wrap-break-word">message : {e.message}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default PayRecieved