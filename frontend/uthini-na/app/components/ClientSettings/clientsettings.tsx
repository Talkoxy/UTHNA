'use client'

import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import ClientSettingsItem from './clientsettingsitem';


export type ClientSettingsType= {
// settings fields here
    id: string; 
    user_preferred_source_language: string;
    user_preferred_target_language: string;
    profile_picture: string;
    subscription_status: string;
    profile_visibility: string;
    user: {
        id: string;
        name: string;
    };
    
}

interface ClientSettingsProps {
    user_id?: string | null;
}
const ClientSettings: React.FC<ClientSettingsProps> = ({ user_id }) => {
    const[settings, setSettings] = useState<ClientSettingsType[]>([]);
    
     const getSettings = async() => {
        // Just call the base URL. The API will use the authenticated user.
        const tmpSettings = await apiService.get('/api/settings/list');
        setSettings(tmpSettings.data);
    }

    useEffect(() => {
        getSettings();
    }, []);
    return (
        <div className='grid grid-flow-row gap-4 place-items-center'> 
        {settings.map((setting) => (
            <div
                key={setting.id}
            >
                <ClientSettingsItem
                    setting={setting}
                />

            </div>
        ))}

        </div>
    );
};

export default ClientSettings;