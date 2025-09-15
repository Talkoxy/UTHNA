"use client";
import Link from "next/link";

interface NavbarItemProps{
    link?: React.ReactNode
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({label, className, onClick,icon,link}) => {
    return (
        <>
            {link ?(
            <Link href={String(link)}>
                <div onClick={onClick} className={`cursor-pointer navbar-item place-items-center ${className}`}>
                    <div className="grid grid-flow-col gap-4">
                        <div>
                            {label}
                        </div>
                        
                        <div className="Navbar-Icon">
                            {icon}
                        </div>
                        
                    </div>
                </div>
                
             </Link>
            ):(
            <div>
                <div onClick={onClick} className={`cursor-pointer place-items-center ${className}`}>
                     <div className="grid grid-flow-col gap-2">
                        <div>
                            {label}
                        </div>
                        
                        <div className="Navbar-Icon">
                            {icon}
                        </div>
                        
                    </div>
                </div>
            </div>
                
            )}
        </>
    )
}

export default NavbarItem;