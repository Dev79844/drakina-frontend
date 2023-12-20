import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";

const NavbarMobile = (props) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <nav className="navbar smMobile:flex tablet:hidden text-xl">
            <div className="logo"></div>
            <HiBars3 onClick={() => { (isNavOpen) ? setIsNavOpen(false) : setIsNavOpen(true) }} />

            <ul className={`navul flex-column items-center w-full overflow-hidden max-h-0 opacity-0 transition-height duration-1000 ease-in-out ${isNavOpen ? "max-h-[50rem] opacity-100" : "max-h-0 opacity-0"} border-[1px] border-emerald absolute top-[7rem] left-0 p-3 z-10 bg-indigo`}>
                <li className="main-ul-li">
                    Shop Now
                </li>
                <li className="main-ul-li">
                    About Us
                </li>
                <li className="main-ul-li">
                    Contact
                </li>
                <li className="flex justify-center text-center">
                    <ul className="dropdown top-[1.7rem] left-1/2 flex-column justify-center items-center h-auto overflow-hidden bg-indigo transition-height duration-500 ease-in-out w-full">
                        <div className="border-y-2 border-emerald w-full my-5">
                            {props.categoriesComponentSet}
                        </div>
                    </ul>
                </li>
                <div className="signin mx-4 py-1 hover:bg-[#725188] text-center">
                    <a href="">Sign in</a>
                </div>
            </ul>
        </nav>
    )
}

export default NavbarMobile