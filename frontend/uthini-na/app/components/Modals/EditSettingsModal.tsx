"use client"

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import useEditSettingsModal from "../Hooks/useEditSettingModal"; // Corrected Hook
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";

const EditSettingsModal = () => {

  const editSettingsModal = useEditSettingsModal();

    // 1. Initialize local state with empty strings. 
    // This will be immediately overwritten in the useEffect when the modal opens.
    const [userPrefferedSourceLanguage, setUserPrefferedSourceLanguage] = useState('');
    const [userPrefferedTargetLanguage, setUserPrefferedTargetLanguage] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [profileVisibility, setProfileVisibility] = useState('');

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // 2. IMPORTANT FIX: Load values and reset state ONLY when the modal opens.
    useEffect(() => {
        // Check if the modal is opening AND we have data from the store
        if (editSettingsModal.isOpen && editSettingsModal.settingsId) {
            
            // Set the local state directly from the updated store values
            setUserPrefferedSourceLanguage(editSettingsModal.userPrefferedSourceLanguage || '');
            setUserPrefferedTargetLanguage(editSettingsModal.userPrefferedTargetLanguage || '');
            setSubscriptionStatus(editSettingsModal.subscriptionStatus || '');
            setProfileVisibility(editSettingsModal.profileVisibility || '');

            // Reset UI feedback
            setErrors([]);
            setSuccess([]);
            setIsError(false);
            setIsSuccess(false);

        } else if (!editSettingsModal.isOpen) {
            // Optional: You can reset all local state to empty when closing, 
            // but the next open event will overwrite them anyway.
            // Reset errors/success on close
            setIsSuccess(false);
            setSuccess([]);
        }
    }, [
        editSettingsModal.isOpen, 
        // Dependency array: Re-run this effect whenever the modal opens or 
        // if the core settings data in the store changes.
        editSettingsModal.settingsId,
        editSettingsModal.userPrefferedSourceLanguage,
        editSettingsModal.userPrefferedTargetLanguage,
        editSettingsModal.subscriptionStatus,
        editSettingsModal.profileVisibility,
    ]);
    
    // 5. Submit function adapted for updating settings
    const submitSettings = async () => {
        // Simple check that required fields are not empty (you can refine this validation)
            const updateData = {
                user_preferred_source_language: userPrefferedSourceLanguage,
                user_preferred_target_language: userPrefferedTargetLanguage,
                subscription_status: subscriptionStatus,
                profile_visibility: profileVisibility,
            };
            // Assuming your API endpoint for updating settings is '/api/settings/update/'
            try {
                // NOTE: Use PUT or PATCH for updates, not POST. Adjusted to use PUT.
                const response = await apiService.put(`/api/settings/${editSettingsModal.settingsId}/update/`, (updateData)); 

                if (response.success) {
                    setErrors([]);
                    setIsError(false);

                    // Update the zustand store with the newly saved values
             
                    // ... set all other values if needed to reflect changes instantly

                    setSuccess(['Settings updated successfully']);
                    setIsSuccess(true);
    
                    setTimeout(() => {
                        setIsSuccess(false);
                        setSuccess([]);
                        editSettingsModal.close(); // Close modal after success
                    }, 2000); 

                } else {
                    const tmpErrors: string[] = Object.values(response.errors || {}).flat().map((error: any) => String(error));
                    setErrors(tmpErrors);
                    setIsError(true); 
                }

            } catch (error) {
                console.error("Error submitting settings:", error);
                setErrors(["An unexpected error occurred while saving your settings."]);
                setIsError(true); 
            }
    };

    

    // 6. Define the content with inputs matching the settings fields
    const content = (
        <>
            <div className="grid gap-4 card">
                
                {/* Language Fields */}
                <input 
                    type="text" 
                    value={userPrefferedSourceLanguage} 
                    onChange={(e) => setUserPrefferedSourceLanguage(e.target.value)}
                    placeholder="Preferred Source Language" 
                    className="input input-bordered"
                />

                <input 
                    type="text" 
                    value={userPrefferedTargetLanguage} 
                    onChange={(e) => setUserPrefferedTargetLanguage(e.target.value)}  
                    placeholder="Preferred Target Language"
                    className="input input-bordered"
                />

                {/* Status/Visibility Fields (could be dropdowns in a real app) */}
                <input 
                    type="text" 
                    value={subscriptionStatus} 
                    onChange={(e) => setSubscriptionStatus(e.target.value)}
                    placeholder="Subscription Status"
                    className="input input-bordered"
                />

                <input 
                    type="text" 
                    value={profileVisibility} 
                    onChange={(e) => setProfileVisibility(e.target.value)}
                    placeholder="Profile Visibility"
                    className="input input-bordered"
                />

                <Custombtn label='Save Settings' onClick={submitSettings}/>

            </div>

            {/* Success and Error Message Display */}
            {(isError || isSuccess) && (
                <div className="grid gap-2 mt-4">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`} className="text-red-500 p-2 bg-red-100 rounded">
                            {error}
                        </div>
                    ))}
                    {success.map((msg, index) => (
                        <div key={`success_${index}`} className="text-green-500 p-2 bg-green-100 rounded">
                            {msg}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
        
    // 7. Render the Modal component
    return (
        <Modal
            isOpen={editSettingsModal.isOpen}
            close={editSettingsModal.close}
            label="Edit User Settings" // Updated label
            content={content}
        />
    )
}

export default EditSettingsModal;