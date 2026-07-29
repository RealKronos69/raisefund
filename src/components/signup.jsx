import { useState,useRef,useEffect } from "react"

const Signup = () => {
    const [formData,setFormData] = useState({
        name : '',
        email : '',
        password : '',
        confirmpassword : ''
    })

    const handleinput = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handlesignup = async (e)=>{
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password || !formData.confirmpassword) {
            console.log('empty')
            return
        }
        if (formData.password!==formData.confirmpassword) {
            console.log("password didn't matched")
            return
        }
        try {
            const response = await fetch('http://localhost:3000/user/signup',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:formData.name,
                    email:formData.email,
                    password:formData.password
                })
            })
            const data = await response.json()
            if (response.ok) {
                window.location.href='/user/login'
            }
            if (!response.ok) {
                throw new Error(data.error || 'something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-90 h-fit bg-white rounded-3xl p-5 flex flex-col gap-10 shadow-gray-800 shadow-md">
                <h1 className="font-bold text-xl self-center">Sign Up</h1>
                <form className="flex flex-col gap-5" onSubmit={handlesignup}>
                    <div className="flex flex-col gap-3">
                    <input onChange={handleinput} value={formData.name} name="name" className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="name" />
                    <input onChange={handleinput} value={formData.email} name="email" className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="email" />
                    <input onChange={handleinput} value={formData.password} name="password" className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="password" min="0" />
                    <input onChange={handleinput} value={formData.confirmpassword} name="confirmpassword" className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="confirm password" min="0" />
                    <span className="flex justify-between">
                        <p className="text-xs">already have a account?</p>
                        <a className="text-xs text-blue-500" href="/user/login">login</a>
                    </span>
                </div>
                <button type="submit" className="bg-gray-900 text-white rounded-3xl font-semibold p-3 hover:scale-101 cursor-pointer">Create Account</button>
                </form>
            </div>
        </section>
    )
}

export default Signup