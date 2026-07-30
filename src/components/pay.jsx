import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function Pay() {
  const nm = useRef()
  const msg = useRef()
  const amt = useRef()
  const params = useParams()
  const navigate = useNavigate()

  const fetchdata = async (NAME, MESSAGE, AMOUNT) => {
    if (NAME === "" || MESSAGE === "" || AMOUNT === "") {
      console.log('empty')
      return
    }
    if (AMOUNT < 10 || AMOUNT > 10000) {
      console.log('invalid amount')
      return
    }
    const response = await fetch('http://localhost:3000/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        donateid: params.id,
        amount: AMOUNT
      })
    })
    const data = await response.json()
    console.log(data)
    const options = {
      key: "rzp_test_THkOfi3Dh6ISK8",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "RaiseFund",
      description: "Donation",
      // callback_url: "http://localhost:3000/verify-payment",
      // redirect: true,

      handler: async function (response) {
        const res = await fetch("http://localhost:3000/verify-payment", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            donateid: params.id,
            message:MESSAGE,
            amount:AMOUNT,
            ...response
          })
        });
        const data = await res.json()
        if (data.status) {
          navigate("/user/payments");
        }
      },

      prefill: {
        name: "",
        email: "john@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    nm.current.value = ""
    msg.current.value = ""
    amt.current.value = ""
  }
  return (
    <section className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="shadow-md w-80 bg-white rounded-2xl p-5 flex flex-col gap-5 justify-between h-fit">
        <div>
          <h1 className="text-gray-700 font-semibold font-mono pl-1 text-sm">name</h1>
          <input ref={nm} className="bg-gray-100 w-full h-10 p-3 focus:outline-0" type="text" placeholder="" />
        </div>
        <div>
          <h1 className="text-gray-700 font-semibold font-mono pl-1 text-sm">message</h1>
          <textarea ref={msg} className="bg-gray-100 w-full h-20 p-3 focus:outline-0" name="message" rows="4" cols="50" placeholder=""></textarea>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={(e) => { amt.current.value = e.target.textContent }} className="p-3 text-xs bg-gray-800 font-semibold font-mono text-amber-50 rounded-2xl cursor-pointer">10</button>
          <button onClick={(e) => { amt.current.value = e.target.textContent }} className="p-3 text-xs bg-gray-800 font-semibold font-mono text-amber-50 rounded-2xl cursor-pointer">50</button>
          <button onClick={(e) => { amt.current.value = e.target.textContent }} className="p-3 text-xs bg-gray-800 font-semibold font-mono text-amber-50 rounded-2xl cursor-pointer">100</button>
          <button onClick={(e) => { amt.current.value = e.target.textContent }} className="p-3 text-xs bg-gray-800 font-semibold font-mono text-amber-50 rounded-2xl cursor-pointer">500</button>
          <button onClick={(e) => { amt.current.value = e.target.textContent }} className="p-3 text-xs bg-gray-800 font-semibold font-mono text-amber-50 rounded-2xl cursor-pointer">1000</button>
          <button onClick={(e) => { amt.current.value = e.target.textContent }} className="p-3 text-xs bg-gray-800 font-semibold font-mono text-amber-50 rounded-2xl cursor-pointer">10000</button>
        </div>
        <div>
          <h1 className="text-gray-700 font-semibold font-mono pl-1 text-sm">amount</h1>
          <input ref={amt} className="bg-gray-200 w-full h-10 p-3 focus:outline-0 font-mono text-gray-800 font-bold" type="number" min={10} max={10000} step="1" />
        </div>
        <button onClick={() => { fetchdata(nm.current.value, msg.current.value, amt.current.value) }} className="w-full rounded-2xl p-3 bg-yellow-300 hover:scale-101 text-yellow-900 font-mono font-bold cursor-pointer">pay</button>
      </div>
    </section>
  )
}

export default Pay