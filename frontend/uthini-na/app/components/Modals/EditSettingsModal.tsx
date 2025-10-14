'use client'

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import useEditSettingsModal from "../Hooks/useEditSettingModal"; // Corrected Hook
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";

const EditSettingsModal = () => {

    const editSettingsModal = useEditSettingsModal();

    // 1. Initialize local state with empty strings.
    const [userPrefferedSourceLanguage, setUserPrefferedSourceLanguage] = useState('');
    const [userPrefferedTargetLanguage, setUserPrefferedTargetLanguage] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [profileVisibility, setProfileVisibility] = useState('');

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 2. Load values and reset state ONLY when the modal opens/data changes.
    useEffect(() => {
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
            // Reset errors/success on close
            setIsSuccess(false);
            setSuccess([]);
        }
    }, [
        editSettingsModal.isOpen,
        // Dependencies on the core settings data in the store
        editSettingsModal.settingsId,
        editSettingsModal.userPrefferedSourceLanguage,
        editSettingsModal.userPrefferedTargetLanguage,
        editSettingsModal.subscriptionStatus,
        editSettingsModal.profileVisibility,
    ]);

    // 3. Submit function adapted for updating settings
    const submitSettings = async () => {
        setErrors([]);
        setSuccess([]);
        setIsError(false);
        setIsSuccess(false);

        const updateData = {
            user_preferred_source_language: userPrefferedSourceLanguage,
            user_preferred_target_language: userPrefferedTargetLanguage,
            subscription_status: subscriptionStatus,
            profile_visibility: profileVisibility,
        };

        try {
            // NOTE: Use PUT or PATCH for updates.
            const response = await apiService.put(`/api/settings/${editSettingsModal.settingsId}/update/`, (updateData));

            if (response.success) {
                // REAL-TIME TRIGGER: Call the refresh function stored in the hook
                if (editSettingsModal.refreshCallback) {
                    editSettingsModal.refreshCallback();
                }

                setSuccess(['Settings updated successfully']);
                setIsSuccess(true);

                setTimeout(() => {
                    setIsSuccess(false);
                    setSuccess([]);
                    editSettingsModal.close(); // Close modal after success
                }, 2000);

            } else {
                // Error handling (cleaned up 'any')
                const tmpErrors: string[] = Object.values(response.errors || {}).flat().map((error: unknown) => String(error));
                setErrors(tmpErrors.length > 0 ? tmpErrors : ["Update failed due to a server error."]);
                setIsError(true);
            }

        } catch (error) { // Cleaned up 'any' in catch block
            console.error("Error submitting settings:", error);
            setErrors(["An unexpected network error occurred while saving your settings."]);
            setIsError(true);
        }
    };


    // 4. Define the content with inputs matching the settings fields
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
                    {isError && errors.map((error, index) => (
                        <div key={`error_${index}`} className="text-red-700 p-2 bg-red-100 rounded">
                            {error}
                        </div>
                    ))}
                    {isSuccess && success.map((msg, index) => (
                        <div key={`success_${index}`} className="text-green-700 p-2 bg-green-100 rounded">
                            {msg}
                        </div>
                    ))}
                </div>
            )}
        </>
    )

    // 5. Render the Modal component
    return (
        <Modal
            isOpen={editSettingsModal.isOpen}
            close={editSettingsModal.close}
            label="Edit User Settings"
            content={content}
        />
    )
}

export default EditSettingsModal;