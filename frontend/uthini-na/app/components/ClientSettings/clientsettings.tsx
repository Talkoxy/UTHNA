'use client'

import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import ClientSettingsItem from './clientsettingsitem';
import { ClientDetailsProps } from '../Client/clientdetails';
import { get } from 'http';
import EditSettingsButton from '../Buttons/settings/editSettingsbutton';
import CreateAvatarButton from '../Buttons/avatar/addAvatarbutton';
import AddSettingsButton from '../Buttons/settings/addSettingsbutton';


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

    
    const getSettings = async() => {
        let url = '/api/settings/list';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        const tmpSettings = await apiService.get(url);
        setSettings(tmpSettings.data);
    }

    


    useEffect(() => {
        getSettings();
    }, [user_id]);
    return (
        <div className='grid grid-flow-row gap-4 place-items-center'> 
  
        {settings.length > 0 ? (
            settings.map((setting) => (
                <div key={setting.id}>
                    <ClientSettingsItem setting={setting} />
                </div>
            ))

        ) : (
            <AddSettingsButton/>
        )}

        </div>
    );
};

export default ClientSettings;