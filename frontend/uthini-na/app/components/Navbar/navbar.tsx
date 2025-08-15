import Themetoggle from "../Buttons/themetoggle";

const Navbar = () => {
    return (
        <div className="navbar lightmode-nav w-full fixed top-0 left-0 z-10 p-6">
            navbar
            <div>
                <Themetoggle />
            </div>
            
        </div>
    )

}

export default Navbar;