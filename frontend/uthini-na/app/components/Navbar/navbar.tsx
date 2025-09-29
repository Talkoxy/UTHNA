'use client'

import ToProfileButton from "../Buttons/navigation/toprofilebutton";
import Themetoggle from "../Buttons/themetoggle";
import { ConnectIcon, TranslateIcon } from "../icons";
import AddSettingsModal from '../Modals/CreateSettingsModal';
import useAddSettingsModal from "../Hooks/useCreateSettingsModal";
import NavbarItem from "./navbaritem";
import { link } from "fs/promises";
import Link from "next/link";
import { ClientSettingsType } from '../ClientSettings/clientsettings';


const Navbar = () => {
    return (
        <nav className="lightmode-nav w-full fixed top-0 left-0 z-10 p-4">
            <div className="grid grid-flow-col grid-cols-3 place-items-center justify-center ">
                <div >
                    <Link href={'/welcome'} >
                        <img src="/images/UthiniNaNavbar.png" width={100} height={100} alt="To home page" />
                    </Link>
                </div>

                <div className="grid grid-flow-col grid-cols-2  gap-60">

                    <div>
                        <NavbarItem label='Translate' icon={<TranslateIcon />} link='/translate' />
                    </div>

                    <div>
                        <NavbarItem label='Connect' icon={<ConnectIcon />} link='/connect' />
                    </div>

                </div>


                <div className="grid place-items-center justify-center">
                    <ToProfileButton />
                </div>


            </div>

        </nav>
    )

}

export default Navbar;