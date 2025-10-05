"use client";
import Link from "next/link";

interface AuthenticationButtonProps{
    link?: React.ReactNode
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const AuthenticationButton: React.FC<AuthenticationButtonProps> = ({label, className, onClick,icon,link}) => {
    return (
        <>
            {link ?(
            <Link href={String(link)}>
                <div onClick={onClick} className={`cursor-pointer btn place-items-center ${className}`}>
                    <div className="items-center">
                        {label}
                        {icon}
                    </div>
                </div>
                
             </Link>
            ):(
            <div>
                <div onClick={onClick} className={`cursor-pointer btn place-items-center ${className}`}>
                    <div className="items-center">
                        {label}
                        {icon}
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default AuthenticationButton;