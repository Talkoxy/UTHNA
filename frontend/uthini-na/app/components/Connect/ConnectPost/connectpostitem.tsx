'use client'
import { ClientSettingsType } from '../../ClientSettings/clientsettings';
import { ConnectPostsType } from './connectposts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import { AvatarType } from '../../Avatar/avatar';


interface ConnectPostsItemProps {
    connectpost: ConnectPostsType;
}

const ConnectPostItem: React.FC<ConnectPostsItemProps> = 
({connectpost}) => {

    const [author,setAuthor] = useState(connectpost.author.id)
    const[avatar, setAvatar] = useState<AvatarType>({
            id: '',
            image_url: ''
        });

    const getAvatar = async (author: string) => {
        try {
            const response = await apiService.get(`/api/avatar/get?user_id=${author}`);
            if (response && response.data && response.data.length > 0) {
                setAvatar(response.data[0]); // Assuming the first setting is the relevant one
            }
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    };

    useEffect(() => {

        if (author) {
            getAvatar(author);
        }
    }, [author]);
 
    
    
    // Use a default avatar image if the URL is missing
    const defaultAvatar = '/avatar.png'; 

    return (
        <div className='grid place-items-center m-15'>
            <div className='connect-post grid  place-items-center'>
                    {/* Username */}
                    <div className=''>
                        <div>
                            <Image
                            src={avatar.image_url}
                            width={50}
                            height={50}
                            alt='user profile photo'
                            />

                        </div>

                        
                    </div>


                    
            
                    {/* 3. POST TEXT CONTENT */}
                    <div className=''>
                        <div className=''>
                            {connectpost.title} 
                        </div>
                        <div className=''> 
                            {connectpost.text}
                        </div>   

                        <div>
                            
                        </div> 
                    </div>
                
            </div>
        </div>
    )
}

export default ConnectPostItem;
