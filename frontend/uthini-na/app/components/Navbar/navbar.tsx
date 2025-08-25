import ToProfileButton from "../Buttons/navigation/toprofilebutton";
import Themetoggle from "../Buttons/themetoggle";

const Navbar = () => {
    return (
        <nav className="lightmode-nav w-full fixed top-0 left-0 z-10 p-4">
            <div className="grid grid-flow-col grid-cols-6 place-items-center content-center gap-10">
                <div className="">
                <Themetoggle />
                </div>

                <div className="col-start-6 justify-self-center">
                 <ToProfileButton />
                </div>


            </div>
            
        </nav>
    )

}

export default Navbar;