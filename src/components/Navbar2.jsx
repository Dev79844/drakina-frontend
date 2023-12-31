import { IoIosSearch, IoMdCart, IoIosArrowRoundBack } from 'react-icons/io';
import { HiBars3 } from 'react-icons/hi2';
import { useState } from 'react';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const Navbar2 = () => {
    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(false);
    const categoriesSet = [
        {key: 1, title:"Category 1"},
        {key: 2, title:"Category 2"},
        {key: 3, title:"Category 3"},
        {key: 4, title:"Category 4"},
        {key: 5, title:"Category 5"},
        {key: 6, title:"Category 6"},
    ]
    
    const categoriesComponentSet = categoriesSet.map((category)=>(<li key={category.key}>{category.title}</li>))
    return (
        <nav className="navbar flex">
            <div href="#" className="text-5xl cursor-pointer">
                <IoIosArrowRoundBack onClick={() => navigate('/')} />
            </div>
            <div className="flex items-center space-x-4 w-10/12">
                <div className="relative w-full flex bg-white rounded-lg">
                    <IoIosSearch className="text-black text-2xl my-2 mx-5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-white w-full text-black rounded-lg p-2 focus:outline-none "
                    />
                </div>
                <Link to="/cart" className="text-3xl mx-9 text-golden">
                    <IoMdCart />
                </Link>
                <div className="text-3xl text-golden cursor-pointer" onClick={()=>{isNavOpen ? setIsNavOpen(false) : setIsNavOpen(true)}}>
                    <HiBars3 />
                </div>
                <ul className={`navul flex-column z-[60] items-center w-full overflow-hidden max-h-0 opacity-0 transition-height duration-1000 ease-in-out ${isNavOpen ? "max-h-[50rem] opacity-100" : "max-h-0 opacity-0"} border-[1px] border-golden absolute top-[4.2rem] left-[-1rem] p-3 z-10 bg-black`}>
                    <li className="main-ul-li-2">
                        <Link to="/products">Shop Now</Link>
                    </li>
                    <li className="main-ul-li-2">
                        About Us
                    </li>
                    <li className="flex justify-center text-center">
                        <ul className="dropdown top-[1.7rem] left-1/2 flex-column justify-center items-center h-auto overflow-hidden bg-black transition-height duration-500 ease-in-out w-full">
                            <div className="border-y-2 border-golden w-full my-5">
                                {categoriesComponentSet}
                            </div>
                        </ul>
                    </li>
                    <div className={`signin mx-4 py-1 hover:bg-goldenLight text-center`} >
                        {Cookies.get('token') 
                        ? (
                            <Link to="/login">Profile</Link>
                        )
                        : (
                            <Link to="/login">Sign in</Link>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar2