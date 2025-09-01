import ToProfileButton from "../Buttons/navigation/toprofilebutton";
import Themetoggle from "../Buttons/themetoggle";

const Navbar = () => {
    return (
        <nav className="lightmode-nav w-full fixed top-0 left-0 z-10 p-4">
            <div className="grid grid-flow-col place-items-center ">
                <div className="justify-self-center">
                 <ToProfileButton />
                </div>
            </div>
            
        </nav>
    )

}

export default Navbar;