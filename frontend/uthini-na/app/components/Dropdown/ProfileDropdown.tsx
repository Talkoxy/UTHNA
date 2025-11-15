'use client';

import { useState,useEffect } from 'react';
import Link from 'next/link';
// import Custombtn from '../Buttons/custombutton'; // REMOVED: Unused
import LogoutButton from '../Buttons/logoutbutton';
// import AddSettingsModal from '../Modals/CreateSettingsModal'; // REMOVED: Unused
// import useAddSettingsModal from '../Hooks/useCreateSettingsModal'; // REMOVED: Unused
// import { ClientSettingsType } from '../ClientSettings/clientsettings'; // REMOVED: Unused
import Image from 'next/image';
import apiService from '@/app/services/apiService';
import { AvatarType } from '../Avatar/avatar';

interface ProfileDropdownProps {
    userId?: string | null;

}

const ProfileDropdown = ({ userId}: ProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const[avatar, setAvatar] = useState<AvatarType>({
        id: '',
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
    };
    
    // Fetch user settings when userId changes                                  
    useEffect(() => {
        if (userId) {
            getAvatar(userId);
        }
    }, [userId]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };
    


    return (
        <div className="grid grid-flow-row relative place-items-center justify-center ">

            <div onClick={toggleDropdown} className='grid place-items-center' >
            
                {avatar?.image_url ? (
                    <Image
                        src={avatar.image_url}
                        height={35}
                        width={35}
                        alt="User Avatar"
                        className='rounded-full object-cover'
                    />
                ) : (
                    <Image
                        src='/avatar.png' // Fallback image here
                        height={35}
                        width={35}
                        alt="Default Avatar"
                    />
                )}

            
            </div>

            <div className='grid place-items-center'>
                {isOpen && (
                    <div className="grid justify-center profile-dropdown-menu">
                        <div>
                            <Link href={`/profile/${userId}`}>
                                <div className="dropdown-item" onClick={handleLinkClick}>
                                    Profile
                                </div>
                            </Link>

                        </div>
                        <div>
                            
                        </div>

                        <div className="dropdown-item" onClick={handleLinkClick}>
                            <LogoutButton />
                        </div>
                    </div>
                )}
            </div>


        </div>


    );
};

export default ProfileDropdown;
