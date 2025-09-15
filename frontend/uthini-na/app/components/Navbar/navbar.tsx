'use client'

import ToProfileButton from "../Buttons/navigation/toprofilebutton";
import Themetoggle from "../Buttons/themetoggle";
import { ConnectIcon, TranslateIcon } from "../icons";
import AddSettingsModal from '../Modals/CreateSettingsModal';
import useAddSettingsModal from "../Modals/Hooks/useAddSettingsModal";
import NavbarItem from "./navbaritem";


const Navbar = () => {
    const addSettingsModal= useAddSettingsModal()

    const createSettingsmodal = () =>{
      addSettingsModal.open()
    }

    
    return (
        <nav className="lightmode-nav w-full fixed top-0 left-0 z-10 p-4">
            <div className="grid grid-flow-col place-items-center justify-center Navbar">
                <div className="">
                    <NavbarItem label='Translate' icon={<TranslateIcon/>}/>
                </div>

                <div className="">
                    <NavbarItem label='Connect' icon={<ConnectIcon/>} />
                </div>

                <div className="">
                    <ToProfileButton />
                </div>

                
            </div>

            
        </nav>
    )

}

export default Navbar;