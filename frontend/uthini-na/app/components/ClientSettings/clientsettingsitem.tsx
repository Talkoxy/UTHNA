"use client"
import { ClientSettingsType } from './clientsettings';
import Image from 'next/image';

export interface ClientSettingsItemProps {
    setting: ClientSettingsType;
}

const ClientSettingsItem: React.FC<ClientSettingsItemProps> = 
({setting}) => {
    return (
        <div>
            <div className='grid place-items-center pt-30'>
                <div className='grid gap-2 place-items-center'>
                    <div className='p-4'>
                        <Image
                        src={setting.profile_picture}
                        width={300}
                        height={300}
                        alt='user profile photo'
                        />
                    </div>
                    <div className=''>{setting.profile_visibility} </div>
                    <div className=''>{setting.user_preferred_source_language} </div>
                    <div className=''>{setting.user_preferred_target_language} </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ClientSettingsItem;