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
                    <div className="grid grid-flow-col gap-2 place-items-center">
                        <Link href="/login">
                        <div className="btnav">Login</div>
                        </Link>
                        <div>/</div>
                        <Link href="/signup">
                        <div className="btnav">Sign-up</div>
                        </Link>
                    
                    </div>
                    
                    

                
                )}

        </>

    )
}

export default UserNav;
