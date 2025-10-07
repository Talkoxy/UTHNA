"use client"

import useEditSettingsModal from '../../Hooks/useEditSettingModal';// Assuming this is the path to your hook
import React from 'react';

// Define the properties this button needs to receive
interface EditSettingsButtonProps {
    settingsId: string;
    userPrefferedSourceLanguage: string;
    userPrefferedTargetLanguage: string;
    subscriptionStatus: string;
    profileVisibility: string;
    
    // You might optionally pass a React node or string for the button content
    children?: React.ReactNode; 
}

const EditSettingsButton: React.FC<EditSettingsButtonProps> = ({ 
    settingsId,  
    userPrefferedSourceLanguage, 
    userPrefferedTargetLanguage, 
    subscriptionStatus, 
    profileVisibility,
    children = "Edit Settings" // Default button text
}) => {

    // 1. Get the store and access its setter and open functions
    const EditSettingsModal = useEditSettingsModal();

    // 2. Define the function to load data into the store and open the modal
    const handleEditSettings = () => {
        // Load all the required settings data into the zustand store
        EditSettingsModal.setSettingsId(settingsId);
        EditSettingsModal.setUserPrefferedSourceLanguage(userPrefferedSourceLanguage);
        EditSettingsModal.setUserPrefferedTargetLanguage(userPrefferedTargetLanguage);
        EditSettingsModal.setSubscriptionStatus(subscriptionStatus);
        EditSettingsModal.setProfileVisibility(profileVisibility); // Use the corrected setter name

        // Open the modal
        EditSettingsModal.open();
    };

    return (
        <div 
            onClick={handleEditSettings} 
            className="cursor-pointer btn place-items-center" // Tailwind/DaisyUI classes, adjust as needed
        >
            <div>{children}</div>
        </div>
    );
}

export default EditSettingsButton;