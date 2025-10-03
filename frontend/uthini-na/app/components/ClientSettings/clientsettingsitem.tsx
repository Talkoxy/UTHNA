"use client"
import { ClientSettingsType } from './clientsettings';
import { useState, useEffect} from 'react';
import { ClientDetailsProps } from '../Client/clientdetails';
import Image from 'next/image';


interface ClientSettingsItemProps {
    setting: ClientSettingsType;
}

const ClientSettingsItem: React.FC<ClientSettingsItemProps> = 
({setting}) => {

    return (
        <div>
            <div className='grid place-items-center pt-30'>
                <div className='grid grid-flow-row gap-2 place-items-center card p-4'>
                    <div className='p-4 settings-avatar'>
                        <Image
                        src={setting.image_url}
                        width={200}
                        height={200}
                        alt='user profile photo'
                        />
                    </div>
                    <div className='grid place-items-center pt-6'>
                        <span className='font-bold text-2xl pb-4'>User Settings</span>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>Profile visibility :</div>
                            <div className=''>{setting.profile_visibility} </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>Subscription Status :</div>
                            <div className=''> {setting.subscription_status}</div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <span>Favourite Language pairing :</span>
                            <div className='flex gap-2'>
                                <div className=''>{setting.user_preferred_source_language} </div>
                                <div>to</div>
                                <div className=''>{setting.user_preferred_target_language} </div>
                            </div>
                            
                        </div>
                        <div>
                           
                        </div>
                        
                        
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default ClientSettingsItem;