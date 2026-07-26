
const Review = ()=>{
    return(
        <section className="bg-black h-fit p-5 flex items-center flex-wrap gap-5">
            <div className="bg-white h-full rounded-2xl p-5 flex flex-col items-center gap-5">
                <h1 className="text-xl font-bold">Leave A Comment</h1>
                <textarea name="" id="" className="bg-gray-100 w-90 h-40 rounded-2xl p-3"></textarea>
                <button className="w-full p-3 rounded-3xl text-white bg-blue-600 cursor-pointer font-bold hover:scale-101">Send</button>
            </div>
            <div className="bg-red-400 h-80">

            </div>
        </section>
    )
}

export default Review