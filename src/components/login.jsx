import { useState } from "react"

const Login = () => {
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    })

    const handleinput = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handlelogin = async (e)=>{
        e.preventDefault()
        if (!formdata.email || !formdata.password) {
            console.log('empty...')
            return
        }
        try {
            const response = await fetch('http://localhost:3000/user/login',{
                method:'POST',
                credentials: "include",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email:formdata.email,
                    password:formdata.password
                })
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                window.location.href="/user/dashboard"
            }
            if (!response.ok) {
                throw new Error(data.error || 'something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-90 h-fit bg-white rounded-3xl p-8 flex flex-col gap-10 shadow-gray-800 shadow-md">
                <h1 className="font-bold text-xl self-center">Login</h1>
                <form className="flex flex-col gap-5" onSubmit={handlelogin}>
                    <div className="flex flex-col gap-4">
                        <input name="email" onChange={handleinput} className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="email" />
                        <input name="password" onChange={handleinput} className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="password" min="0" />
                        <span className="flex justify-between">
                            <p className="text-xs">don't have a account?</p>
                            <a className="text-xs text-blue-500" href="/user/signup">signup</a>
                        </span>
                    </div>
                    <button type="submit" className="bg-gray-900 text-white rounded-3xl font-semibold p-3 hover:scale-101 cursor-pointer">Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login