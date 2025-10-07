"use client"

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import useEditSettingsModal from "../Hooks/useEditSettingModal"; // Corrected Hook
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";

const EditSettingsModal = () => {

    // 1. Use the correct store hook
    const editSettingsModal = useEditSettingsModal();

    // The modal now only deals with one step: editing settings
    const [currentStep, setCurrentStep] = useState(1); 

    // 2. Map initial values from the zustand store
    const initialSourceLang = editSettingsModal.userPrefferedSourceLanguage || '';
    const initialTargetLang = editSettingsModal.userPrefferedTargetLanguage || '';
    const initialSubscriptionStatus = editSettingsModal.subscriptionStatus || '';
    const initialProfileVisibility = editSettingsModal.profileVisibility || '';

    // 3. Set up local state for form inputs

    const [userPrefferedSourceLanguage, setUserPrefferedSourceLanguage] = useState(initialSourceLang);
    const [userPrefferedTargetLanguage, setUserPrefferedTargetLanguage] = useState(initialTargetLang);
    const [subscriptionStatus, setSubscriptionStatus] = useState(initialSubscriptionStatus);
    const [profileVisibility, setProfileVisibility] = useState(initialProfileVisibility);

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // 4. Reset state and load new data when the modal opens/closes
    useEffect(() => {
        if (!editSettingsModal.isOpen) {
            // Reset to initial values from the store (which might have been set by the button)
            
            setUserPrefferedSourceLanguage(editSettingsModal.userPrefferedSourceLanguage || '');
            setUserPrefferedTargetLanguage(editSettingsModal.userPrefferedTargetLanguage || '');
            setSubscriptionStatus(editSettingsModal.subscriptionStatus || '');
            setProfileVisibility(editSettingsModal.profileVisibility || '');

        } else {
            // When opening, reset errors
            setErrors([]);
            setIsError(false);
        }
    }, [
        editSettingsModal.isOpen, 
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