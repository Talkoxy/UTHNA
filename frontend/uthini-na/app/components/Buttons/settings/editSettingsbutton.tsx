"use client"

import useEditSettingsModal from '../../Hooks/useEditSettingModal';
import React from 'react';

// Define the properties this button needs to receive
interface EditSettingsButtonProps {
    settingsId: string;
    userPrefferedSourceLanguage: string;
    userPrefferedTargetLanguage: string;
    subscriptionStatus: string;
    profileVisibility: string;
    // 1. ADD the new prop to the interface
    onSettingsChange: () => void;
    
    // You might optionally pass a React node or string for the button content
    children?: React.ReactNode; 
}

const EditSettingsButton: React.FC<EditSettingsButtonProps> = ({ 
    settingsId,  
    userPrefferedSourceLanguage, 
    userPrefferedTargetLanguage, 
    subscriptionStatus, 
    profileVisibility,
    onSettingsChange, // 2. DESTRUCTURE the new prop
    children = "Edit Settings" // Default button text
}) => {

    // 3. Get the store and access its setter and open functions
    const EditSettingsModal = useEditSettingsModal();

    // 4. Define the function to load data into the store and open the modal
    const handleEditSettings = () => {
        
        // Load all the required settings data into the zustand store
        EditSettingsModal.setSettingsId(settingsId);
        EditSettingsModal.setUserPrefferedSourceLanguage(userPrefferedSourceLanguage);
        EditSettingsModal.setUserPrefferedTargetLanguage(userPrefferedTargetLanguage);
        EditSettingsModal.setSubscriptionStatus(subscriptionStatus);
        EditSettingsModal.setProfileVisibility(profileVisibility); 
        
        // 5. PASS THE REFRESH FUNCTION INTO THE HOOK STATE
        // Assuming your modal hook has a setter to store a callback function.
        // If not, you'll need to add a `setRefreshCallback` (or similar) to your hook definition.
        EditSettingsModal.setRefreshCallback(onSettingsChange);

        // Open the modal
        EditSettingsModal.open();
    };

    return (
        <div 
            onClick={handleEditSettings} 
            className="cursor-pointer btn place-items-center"
        >
            <div>{children}</div>
        </div>
    );
}

export default EditSettingsButton;