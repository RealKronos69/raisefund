const PayDonated = () => {
    return (
        <section className="bg-red-700 h-full flex justify-around">
            <div className="w-90 bg-blue-300 h-full flex flex-col gap-5 p-5 overflow-y-auto scrollbar-none">
                <div className="w-full h-fit bg-white shrink-0 p-2">
                    <h1 className="text-sm font-bold">To :</h1>
                    <div>
                        amount : 10000$
                    </div>
                    <div>
                        <p>message :</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PayDonated