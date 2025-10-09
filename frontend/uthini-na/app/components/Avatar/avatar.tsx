'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import CreateAvatarButton from '../Buttons/avatar/addAvatarbutton';
import AvatarItem from './avataritems';


export type AvatarType= {
    id: string; 
    image_url: string;

}

interface AvatarProps {
    user_id?: string | null;

}
const Avatar: React.FC<AvatarProps> = ({ user_id ,}) => {
    const[avatar, setAvatar] = useState<AvatarType>({
        id:'',
        image_url: ''
    });

    
    const getAvatar = async (userId: string) => {
        try {
            const response = await apiService.get(`/api/avatar/get?user_id=${userId}`);
            if (response && response.data && response.data.length > 0) {
                setAvatar(response.data[0]); // Assuming the first setting is the relevant one
            }
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    }

    


    useEffect(() => {
        if (user_id) {
            getAvatar(user_id);
        }
    }, [user_id]);
    return (
        <div className='grid grid-flow-row gap-4 place-items-center'> 
  
        <Image
            src={avatar.image_url}
            height={200}
            width={200}
            alt='avatar'
            />

            <div>
                <CreateAvatarButton/>
            </div>

        </div>

    );
};

export default Avatar;