import ToProfileButton from "../Buttons/navigation/toprofilebutton";
import Themetoggle from "../Buttons/themetoggle";

const Navbar = () => {
    return (
        <nav className="lightmode-nav w-full fixed top-0 left-0 z-10 p-5">
            <div className="grid grid-flow-col grid-cols-4 justify-center place-items-center gap-10">
                <div className="">
                <Themetoggle />
                </div>

                <div className=" col-start-4 justify-self-end">
                 <ToProfileButton />
                </div>


            </div>
            
        </nav>
    )

}

export default Navbar;