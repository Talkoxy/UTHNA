'use client'

import ToProfileButton from "../Buttons/navigation/toprofilebutton";
// Removed unused imports: Themetoggle, AddSettingsModal, useAddSettingsModal
import { ConnectIcon, TranslateIcon } from "../icons";
import NavbarItem from "./navbaritem";
// Removed unused imports: link, ClientSettingsType
import Link from "next/link";
import { CrownIcon } from "../icons";
// Removed unused imports: CreateAvatarButton
import Image from "next/image"; // Added for optimization

const Navbar = () => {
    
    return (
        <nav className="lightmode-nav w-full fixed top-0 left-0 z-10 p-4">
            <div className="grid grid-flow-col grid-cols-3 place-items-center justify-center ">
                <div >
                    <Link href={'/'} >
                        {/* FIX: Replaced <img> with Next.js <Image /> for optimization */}
                        <Image 
                            src="/images/UthiniNaNavbar.png" 
                            width={100} 
                            height={100} 
                            alt="To home page" 
                        />
                    </Link>
                </div>

                <div className="grid grid-flow-col grid-cols-3  gap-20 md:gap-60"> {/* Adjusted grid for 3 items */}

                    <div>
                        <NavbarItem label='Translate' icon={<TranslateIcon />} link='/translate' />
                    </div>

                    <div>
                        <NavbarItem label='Connect' icon={<ConnectIcon />} link='/connect' />
                    </div>

                    <div>
                        <NavbarItem label= "Upgrade" icon={<CrownIcon />} link='/upgrade'/>
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