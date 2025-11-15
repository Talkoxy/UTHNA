import { ConnectIcon, TranslateIcon } from "../icons";
import NavbarItem from "./navbaritem";

import Link from "next/link";
import { CrownIcon } from "../icons";

import Image from "next/image"; 
import UserNav from "./usernav";
import { getUserId } from "@/app/lib/actions";

import { connection } from 'next/server'


const Navbar = async () => {

    await connection()

    const user_id = await getUserId()
    
    return (
        <nav className="glass-nav w-full fixed top-0 left-0 z-10 p-3">
            <div className="grid grid-flow-col place-items-center">
                <div className="grid place-content-start pr-200">
                    <Link href={'/'} >
                        <Image 
                            src="/images/UthiniNaNavbar.png" 
                            width={40} 
                            height={40} 
                            alt="To home page" 
                            className="nav-logo"
                        />
                    </Link>
                </div>
                

                <div className="grid grid-cols-4 place-items-center md:gap-20 "> {/* Adjusted grid for 3 items */}

                    <div>
                        <NavbarItem label='Translate' link='/translate' />
                    </div>

                    <div>
                        <NavbarItem label='Connect' link='/connect' />
                    </div>

                    <div>
                        
                    </div>

                    <div className="place-items-center">
                        <UserNav userId={user_id}/>
                    </div>

                </div>

                

            </div>

        </nav>
    )

}

export default Navbar;