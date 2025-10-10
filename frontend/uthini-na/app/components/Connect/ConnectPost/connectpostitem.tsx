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
        <div className='grid place-items-center p-6'> 
        {/* The main post container */}
        <div className='connect-post'> 
            {/* Top row for user info and post content */}
            <div className='post-header'>
                {/* 1. USER INFO - Column 1 */}
                <div className='userInfo'>
                    <div>
                        {avatar?.image_url && (
                            <Image
                                src={avatar.image_url} // You can now safely use the non-optional chain here
                                height={70}
                                width={70}
                                alt="User Avatar"
                            />
                        )}
                    </div>
                    <div className='username'>
                        @{connectpost.author.username}
                    </div>
                </div>

                {/* 2. POST CONTENT - Column 2 */}
                <div className='postContent'>
                    <div className='postTitle'>
                        {connectpost.title} 
                    </div>
                    <div className='postText'> 
                         {connectpost.text}
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    )
}

export default ConnectPostItem;
