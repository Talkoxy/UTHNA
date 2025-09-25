'use client';

import { useState } from 'react';
import Link from 'next/link';
import Custombtn from '../Buttons/custombutton';
import LogoutButton from '../Buttons/logoutbutton';
import AddSettingsModal from '../Modals/CreateSettingsModal';
import useAddSettingsModal from '../Hooks/useAddSettingsModal';
import { ClientSettingsType } from '../ClientSettings/clientsettings';
import Image from 'next/image';
import apiService from '@/app/services/apiService';

interface ProfileDropdownProps {
    userId: string | null | undefined;
    
}

const ProfileDropdown =  ({ userId }: ProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);


    const fallbackImage = 'images/avatar.png'; // Make sure this path is correct
    

    //functions

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="grid grid-flow-row relative place-items-center justify-center">
            
            <div onClick={toggleDropdown} className='grid place-items-center' >
                <img
                    src="/images/avatar.png" // Use a default image if userSettings.image_url is not available
                    alt="User Profile"
                    width={100}
                    height={100}
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