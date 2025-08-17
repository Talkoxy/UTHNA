"use client";
import Link from "next/link";

interface CustombtnProps{
    link?: React.ReactNode
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Custombtn: React.FC<CustombtnProps> = ({label, className, onClick,icon,link}) => {
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

export default Custombtn;