"use client";
import Link from "next/link";

interface TranslatebtnProps{
    link?: React.ReactNode
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Translatebtn: React.FC<TranslatebtnProps> = ({label, className, onClick,icon,link}) => {
    return (
        <>
            {link ?(
            <Link href={String(link)}>
                <div onClick={onClick} className={`cursor-pointer translate_btn place-items-center ${className}`}>
                    <div className="items-center">
                        {label}
                        {icon}
                    </div>
                </div>
                
             </Link>
            ):(
            <div>
                <div onClick={onClick} className={`cursor-pointer translate_btn place-items-center ${className}`}>
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

export default Translatebtn;