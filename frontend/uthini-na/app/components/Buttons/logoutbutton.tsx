'use client'

import { useRouter } from "next/navigation";

import { resetAuthCookies } from "@/app/lib/actions";
import Custombtn from "./custombutton";


const LogoutButton = () => {

    const router= useRouter();

    const submitLogout = async () => {

        resetAuthCookies();


        router.push('/')
    }

    return(
        <Custombtn label= 'logout' onClick={submitLogout}/>
    )


}
export default LogoutButton;