"use client"
import { ClientSettingsType } from './clientsettings';

export interface ClientSettingsItemProps {
    setting: ClientSettingsType;
}

const ClientSettingsItem: React.FC<ClientSettingsItemProps> = 
({setting}) => {
    return (
        <div>
            <div className='grid place-items-center pt-20'>
                <div className='grid gap-2 place-items-center'>
                    <div className=''>{setting.profile_picture} </div>
                    <div className=''>{setting.profile_visibility} </div>
                    <div className=''>{setting.user_preferred_source_language} </div>
                    <div className=''>{setting.user_preferred_target_language} </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ClientSettingsItem;