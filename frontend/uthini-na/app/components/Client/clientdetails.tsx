// your_component_name.tsx

'use client'

import { useState,useEffect } from "react";
import apiService from "@/app/services/apiService";
import SavedTranslations from "../Translations/savedtranslations/savedtranslations";
import LikedTranslations from "../Translations/likedtranslations/likedtranslations";
import TranslationInsights from "../Insights/insights";
import { ClientSettingsType } from "../ClientSettings/clientsettings";
import Image from "next/image";
import AddSettingsButton from "../Buttons/settings/addSettingsbutton";


export type ClientDetailsProps = {
    user: {
        name: string;
        email: string;
    };
    userId?: string | null;

    
};

export type UserDetailsType = {
    id: string;
    username:  string;
    email: string;

}


const ClientDetails = ({ user, userId,}: ClientDetailsProps) => {

  

    const [errors, setErrors] = useState<string[]>([]);
    const [userDetails, setUserDetails] = useState<UserDetailsType>({            
            id: '',
            username: '',
            email: '',
    })
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

    const fetchUserDetails = async (userId: string) => {
        try {
            const response = await apiService.get(`/api/auth/?user_id=${userId}`);
            if (response && response.data && response.data.length > 0) {
                setUserDetails(response.data[0]); // Assuming the first setting is the relevant one
            }
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    };
    
    // Fetch user settings when userId changes                                  
    useEffect(() => {
        if (userId) {
            fetchUserSettings(userId);
            fetchUserDetails(userId)
        }
    }, [userId]);

    return (
        <main className="grid grid-flow-col">

            <div className="grid grid-flow-col gap-2 justify-items-center">

                <div className="grid grid-rows-2 place-items-center ">
                    <div>{userDetails.username}</div>
                    
                    <div className='p-4 settings-avatar'>
                        <Image
                        src={setting.image_url}
                        width={200}
                        height={200}
                        alt='user profile photo'
                        />
                    </div>
                    
                    <div> <TranslationInsights userId={userId} /> </div>

                </div>

                <div className="grid grid-flow-row place-items-center pt-40">

                    <div className="grid place-items-center">
                        <div className="label">MY SAVED TRANSLATIONS</div>
                        <div className="scroll-translation" ><SavedTranslations user_id={userId} /></div>
                    </div>

                    <div className="grid place-items-center">
                        <div className="label">MY LIKED TRANSLATIONS</div>
                        <div className="scroll-translation"><LikedTranslations user_id={userId} /></div>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default ClientDetails;