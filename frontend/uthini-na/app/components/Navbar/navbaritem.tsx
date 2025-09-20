"use client";
import Link from "next/link";

interface NavbarItemProps{
    link?: string;
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
                <div onClick={onClick} className={`cursor-pointer ${className}`}>
                    <div className="place-items-center grid grid-flow-col gap-1">
                        <div>
                            <div className="navbar-item">
                                {label}
                            </div>
                        </div>
                        
                        
                        <div className="grid grid-rows-2 Navbar-Icon">
                            <div className="">
                                {icon}
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                
             </Link>
            ):(
            <div>
                <div onClick={onClick} className={`cursor-pointer  ${className}`}>
                     <div className="place-items-center grid grid-flow-col gap-1">
                        <div>
                            {label}
                        </div>
                        
                        <div className="grid grid-rows-2 Navbar-Icon">
                            <div>
                                {icon}
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
                
            )}
        </>
    )
}

export default NavbarItem;