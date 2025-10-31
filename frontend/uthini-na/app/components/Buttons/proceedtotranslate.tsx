import Link from "next/link";
interface proceedToTranslateProps {
    link?: React.ReactNode
    label?: string | React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const ProceedToTranslatebtn: React.FC<proceedToTranslateProps > = ({label, className, onClick,icon,link}) => {
    return (
        <Link href={String(link)}>
            <div
            onClick={onClick}
            className={`grid grid-flow-col cursor-pointer pttbtn pttbtn-text place-items-center 
            ${className}`}>
                <div>
                    {label}
                </div>

                <div className="grid grid-rows-3 place-items-center pttbtn-icon p-2">
                    {icon}
                </div>
            </div>
        </Link>
    )
}

export default ProceedToTranslatebtn;