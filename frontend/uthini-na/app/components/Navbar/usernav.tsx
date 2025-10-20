'use client'
import ToProfileButton from "../Buttons/navigation/toprofilebutton";
import Link from "next/link";

interface NavProps {
    userId?: string | null;
}

const UserNav:React.FC <NavProps>= ({userId}) => {

    return(
        <>
        {userId ?(
                <div className="grid place-items-center justify-center">
                    <ToProfileButton />
                </div>
                ) : (
                    <Link href="/login">
                        <div className="btn-nav">Login</div>
                    </Link>
                
                )}

        </>

    )
}

export default UserNav;