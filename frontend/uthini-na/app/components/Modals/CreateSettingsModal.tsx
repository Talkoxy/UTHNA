"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState,ChangeEvent, use } from "react";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";
import useCreateSettingsModal from "../Hooks/useCreateSettingsModal";
import Image from "next/image";


const CreateSettingModal = () => {

    const createSettingModal = useCreateSettingsModal()

    const [currentStep, setCurrentStep] = useState(1);

    
    const [userPreferredSourceLanguage, setUserPreferredSourceLanguage] = useState('');
    const [userPreferredTargetLanguage, setUserPreferredTargetLanguage] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [profileVisibility, setProfileVisibility] = useState('');
    const [userAvatar, setUserAvatar] = useState <File | null>(null);

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setUserAvatar(tmpImage);
        }
    }

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
     useEffect(() => {
        if (!createSettingModal.isOpen) {
            setCurrentStep(1);

            setUserPreferredSourceLanguage('');
            setUserPreferredTargetLanguage('');
            setSubscriptionStatus('');
            setUserAvatar(null);    

            
            }else {
                setErrors([]);
            }

        }, [createSettingModal.isOpen]);
    
    // Reset state when modal is closed
    const sudmitSettings = async () => {
        // Client-side validation to ensure all fields are present
        if (
            userPreferredSourceLanguage &&
            userPreferredTargetLanguage &&
            subscriptionStatus &&
            userAvatar &&
            profileVisibility
        ) {
            try {
                // ⭐️ START OF FIX: Use FormData for file upload ⭐️
                const formData = new FormData();
                
                formData.append('user_preferred_source_language', userPreferredSourceLanguage);
                formData.append('user_preferred_target_language', userPreferredTargetLanguage);
                formData.append('subscription_status', subscriptionStatus);
                formData.append('profile_visibility', profileVisibility);
                formData.append('user_avatar', userAvatar);
                // Append the file itself
                

                // Send the FormData object to the API service
                const response = await apiService.postset('/api/settings/create/', formData);
                // ⭐️ END OF FIX ⭐️

                if (response.status && response.status >= 200 && response.status < 300) { // Assuming apiService returns status or throws for bad requests
                    setErrors([]);
                    setIsError(false);
                    setSuccess(['Settings submitted successfully']);
                    setIsSuccess(true);

                    setTimeout(() => {
                        setIsSuccess(false);
                        setSuccess([]);
                        createSettingModal.close();
                    }, 2000); 
                } else {
                     // This block may be hit if apiService doesn't throw on error, but returns a failure object.
                     // The logic here needs to correctly parse the error response structure.
                     // Assuming errors are inside 'response.errors' or are the response itself.
                     const responseErrors = response.errors || response;
                     
                     // Flatten error values from the server response
                     const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: any) => {
                         // Only display the last error in case of multiple for simplicity
                         return Array.isArray(error) ? error[0] : error;
                     }).filter(msg => typeof msg === 'string');


                     setErrors(tmpErrors);
                     setIsError(true); 
                }


            } catch (error: any) {
                console.error("Error submitting Settings:", error);
                // Catch network errors or errors thrown by apiService.post (e.g., for 400 status)
                let errorMessages: string[] = ["An error occurred while submitting the Settings."];

                // Check for the custom error structure thrown by apiService
                if (error.errors) {
                    // Pull error messages from the custom error object
                    errorMessages = Object.values(error.errors).flat().map((e: any) => String(e)).filter(msg => msg.length > 0);
                } else if (error.message) {
                    errorMessages = [error.message];
                }
                
                setErrors(errorMessages);
                setIsError(true); 
            }

        } else {
            // Client-side validation failure
            const tmpErrors: string[] = [];
            // ... (Your existing client-side error checks) ...
            if (!userPreferredSourceLanguage) {
                tmpErrors.push('Please enter your preferred source language of Translation');
            }
            if (!userPreferredTargetLanguage) {
                tmpErrors.push('Please enter your preferred target language of Translation');
            }
            if (!userAvatar) {
                tmpErrors.push('User avatar is required');
            }
            if (!profileVisibility) {
                tmpErrors.push('Profile visibility is required');
            }
            if (!subscriptionStatus) {
                tmpErrors.push('Subscription status is required');
            }

            setErrors(tmpErrors);
            setIsError(true); // Set isError to true to ensure the error block renders
        }

    };

        const content = (
        <>
            <div className="grid gap-4 modal-card">
                <div className="grid gap-2">
                    <input type="file" accept="image/*" onChange={setImage}/>
                    <div className=" w-[200px] h-[150px] relative">
                    <Image 
                        fill
                        alt="Uploaded project cover art"
                        src={userAvatar ? URL.createObjectURL(userAvatar)
                             : '/avatar.png'}
                        className=" p-2 w-full h-full object-cover rounded-xl"
                    />
                </div>

                <div className="grid grid-flow-row gap-2 ">
                    <select
                    className="dropmenu"
                    value={userPreferredSourceLanguage}
                    onChange={(e) => setUserPreferredSourceLanguage(e.target.value)}
                >
                    <option value="">I like translating From</option>
        
                    <option value="Xhosa">Xhosa</option>
                    <option value="English">English</option>
                    <option value="Afrikaans">Afrikaans</option>
                    
                </select>

                <select
                    className="dropmenu"
                    value={userPreferredTargetLanguage}
                    onChange={(e) => setUserPreferredTargetLanguage(e.target.value)}
                >
                   <option value="">I like translating To</option>
        
                    <option value="Xhosa">Xhosa</option>
                    <option value="English">English</option>
                    <option value="Afrikaans">Afrikaans</option>
                    
                </select>

                    
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <select
                        className="dropmenu"
                        value={profileVisibility}
                        onChange={(e) => setProfileVisibility(e.target.value)}
                    >
                        <option value="">Profile visibility </option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                        
                    </select>

                    <select
                        className="dropmenu"
                        value={subscriptionStatus}
                        onChange={(e) => setSubscriptionStatus(e.target.value)}
                    >
                        <option value="">Subscription Type </option>

                        <option value="Beta-Tester">Free</option>
                        
                    </select>
                </div>             
                
                </div>
                <Custombtn label='Save Settings' onClick={sudmitSettings} />
            {isSuccess && 
                <div className="success-message">
                    {success.map((msg, index) => (
                        <div key={`success_${index}`} className="success-message">
                            {msg}
                        </div>
                    ))}
                </div>
            }
            </div>

            {errors.length > 0 && (
                <div className="grid gap-2">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`} className="error-message">
                            {error}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
        


    return (
        <Modal
            isOpen={createSettingModal.isOpen}
            close={createSettingModal.close}
            label="Finish Setting up your Profile"
            content={content}
        />
    )
}

export default CreateSettingModal;