

const Navbar = ()=>{
    return(
        <div className="p-3 bg-gray-800 *:text-white">
            <nav className="flex justify-between">
                <h1 className="font-bold font-mono">RAISEFUND</h1>
                <ul className="flex gap-5 *:cursor-pointer *:font-mono *:hover:text-gray-950">
                    <li>home</li>
                    <li>about</li>
                    <li>contact</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar