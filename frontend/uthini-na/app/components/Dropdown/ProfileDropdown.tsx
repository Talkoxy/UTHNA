'use client';

import { useState,useEffect } from 'react';
import Link from 'next/link';
import Custombtn from '../Buttons/custombutton';
import LogoutButton from '../Buttons/logoutbutton';
import AddSettingsModal from '../Modals/CreateSettingsModal';
import useAddSettingsModal from '../Hooks/useCreateSettingsModal';
import { ClientSettingsType } from '../ClientSettings/clientsettings';
import Image from 'next/image';
import apiService from '@/app/services/apiService';

interface ProfileDropdownProps {
    userId?: string | null;
}

const ProfileDropdown = ({ userId}: ProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [setting, setSetting] = useState<ClientSettingsType>({
        id: '',
        user_preferred_source_language: 'en',
        user_preferred_target_language: 'en',
        image_url: '/images/default-profile.png', // Default image
        subscription_status: 'free',
        profile_visibility: 'public',
    });
    //functions

    const fetchUserSettings = async (userId: string) => {
        try {
            const response = await apiService.get(`/api/settings/list?user_id=${userId}`);
            if (response && response.data && response.data.length > 0) {
                setSetting(response.data[0]); // Assuming the first setting is the relevant one
            }
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    };
    
    // Fetch user settings when userId changes                                  
    useEffect(() => {
        if (userId) {
            fetchUserSettings(userId);
        }
    }, [userId]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    


    return (
        <div className="grid grid-flow-row relative place-items-center justify-center">

            <div onClick={toggleDropdown} className='grid place-items-center' >
                
                <Image
                    src={setting.image_url} // Use a default image if userSettings.image_url is not available
                    alt="User Profile"
                    width={80}
                    height={80}
                    className="rounded-full cursor-pointer"
                />
            </div>

            <div className='grid place-items-center'>
                {isOpen && (
                    <div className="grid justify-center profile-dropdown-menu">
                        <div>
                            <Link href={`/profile/${userId}`}>
                                <div className="dropdown-item">
                                    Profile
                                </div>
                            </Link>

                        </div>
                        <div>
                            <Link href={`/settings/${userId}`}>
                                <div className="dropdown-item">
                                    Settings
                                </div>
                            </Link>

                        </div>

                        <div className="dropdown-item">
                            <LogoutButton />
                        </div>
                    </div>
                )}
            </div>


        </div>


    );
};

export default ProfileDropdown;