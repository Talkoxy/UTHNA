'use client'

import { ClientSettingsType } from './clientsettings';

import EditSettingsButton from '../Buttons/settings/editSettingsbutton';




// 1. UPDATE INTERFACE to include the change handler function
interface ClientSettingsItemProps {
    setting: ClientSettingsType;
    onSettingsChange: () => void; // Function to trigger parent component refresh
}

const ClientSettingsItem: React.FC<ClientSettingsItemProps> = 
// 2. DESTRUCTURE the new prop
({ setting, onSettingsChange }) => {

    return (
        <div>
            <div className='grid  gap-5 place-items-center pt-30'>
                <div>
                    <EditSettingsButton 
                        settingsId={setting.id} 
                        userPrefferedSourceLanguage={setting.user_preferred_source_language}
                        userPrefferedTargetLanguage={setting.user_preferred_target_language}
                        profileVisibility={setting.profile_visibility} 
                        subscriptionStatus={setting.subscription_status}
                        // 3. PASS THE HANDLER DOWN TO THE EDIT BUTTON
                        onSettingsChange={onSettingsChange}
                    />
                </div>
                <div className='grid grid-flow-row gap-2 place-items-center card p-4'>
                    <div className='grid place-items-center pt-6'>
                        <span className='font-bold text-2xl pb-4'>User Settings</span>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>Profile visibility :</div>
                            <div className=''>{setting.profile_visibility} </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <span>Favourite Language pairing :</span>
                            <div className='flex gap-2'>
                                <div className=''>{setting.user_preferred_source_language} </div>
                                <div>to</div>
                                <div className=''>{setting.user_preferred_target_language} </div>
                            </div>
                            
                        </div>
                        
                        
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default ClientSettingsItem;