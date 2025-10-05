"use client"
import { ConnectPostsType } from './connectposts';
import Image from 'next/image';


interface ConnectPostsItemProps {
    connectpost: ConnectPostsType;
}

const ConnectPostItem: React.FC<ConnectPostsItemProps> = 
({connectpost}) => {

    return (
        <div>
            <div className='grid place-items-center pt-30'>
                <div className='grid grid-flow-row gap-2 place-items-center card p-4'>
                    <div className='p-4 settings-avatar'>
                        <Image
                        src={connectpost.image}
                        width={200}
                        height={200}
                        alt='user profile photo'
                        />
                    </div>
                    <div className='grid place-items-center pt-6'>
                        <div>
                            <div className=''>{connectpost.title} </div>
                        </div>
                        <div>
                            <div className=''> {connectpost.text}</div>
                        </div>    
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default ConnectPostItem;