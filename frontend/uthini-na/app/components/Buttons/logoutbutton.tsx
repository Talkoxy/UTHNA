'use client'

import { useRouter } from "next/navigation";

import { resetAuthCookies } from "@/app/lib/actions";



const LogoutButton = () => {

    const router= useRouter();

    const submitLogout = async () => {
        resetAuthCookies();
        router.push('/')
    }

    return(
        <div onClick={submitLogout}>
            logout
        </div>
    )


}
export default LogoutButton;