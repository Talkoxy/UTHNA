'use client'

import { useEffect, useState, useCallback } from 'react';
import apiService from '@/app/services/apiService';
import ClientSettingsItem from './clientsettingsitem';
import AddSettingsButton from '../Buttons/settings/addSettingsbutton';

// Removed unused imports: ClientDetailsProps, get, EditSettingsButton, CreateAvatarButton


export type ClientSettingsType= {
// settings fields here
    id: string; 
    user_preferred_source_language: string;
    user_preferred_target_language: string;
    image_url: string;
    subscription_status: string;
    profile_visibility: string;
}

interface ClientSettingsProps {
    user_id: string | null;
}

const ClientSettings: React.FC<ClientSettingsProps> = ({ user_id ,}) => {
    const[settings, setSettings] = useState<ClientSettingsType[]>([]);

    
    // 1. Wrap data fetching in useCallback and add user_id as a dependency
    const getSettings = useCallback(async() => {
        let url = '/api/settings/list';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        try {
            const tmpSettings = await apiService.get(url);
            setSettings(tmpSettings.data || []);
            console.log("Settings list successfully re-fetched.");
        } catch (error) {
            console.error("Error fetching settings:", error);
            setSettings([]); // Set to empty array on failure
        }
    }, [user_id]);
    
    // 2. Define the handler function to be passed to children for manual refresh
    const handleSettingsChange = useCallback(() => {
        // This function forces a refresh of the settings list
        getSettings();
        console.log("Settings change handled and data refresh triggered.");
    }, [getSettings]);


    // 3. Use getSettings as the dependency to satisfy the ESLint hook rule
    useEffect(() => {
        getSettings();
    }, [getSettings]);
    
    
    return (
        <div className='grid grid-flow-row gap-4 place-items-center'> 
  
        {settings.length > 0 ? (
            settings.map((setting) => (
                <div key={setting.id}>
                    <ClientSettingsItem 
                        setting={setting} 
                        // 4. Pass the handler to the item component
                        onSettingsChange={handleSettingsChange}
                    />
                </div>
            ))

        ) : (
            <AddSettingsButton
                // 4. Pass the handler to the Add button
            />
        )}

        </div>
    );
};

export default ClientSettings;