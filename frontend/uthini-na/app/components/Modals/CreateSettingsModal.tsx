"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react"; 
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";
import useCreateSettingsModal from "../Hooks/useCreateSettingsModal";


const CreateSettingModal = () => {

    const createSettingModal = useCreateSettingsModal()


    const [userPreferredSourceLanguage, setUserPreferredSourceLanguage] = useState('');
    const [userPreferredTargetLanguage, setUserPreferredTargetLanguage] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [profileVisibility, setProfileVisibility] = useState('');



    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    
    type ServerResponse = { 
        success?: boolean; 
        id?: string; 
        errors?: Record<string, unknown>;
        message?: string;
    };

     useEffect(() => {
        if (!createSettingModal.isOpen) {
            

            setUserPreferredSourceLanguage('');
            setUserPreferredTargetLanguage('');
            setSubscriptionStatus('');
                

            
            }else {
                setErrors([]);
                setSuccess([]);
                setIsError(false);
                setIsSuccess(false);
            }

        }, [createSettingModal.isOpen]);
    
    // Reset state when modal is closed
    const sudmitSettings = async () => {
        // Reset previous status
        setErrors([]);
        setSuccess([]);
        setIsError(false);
        setIsSuccess(false);

        
        if (
            userPreferredSourceLanguage &&
            userPreferredTargetLanguage &&
            subscriptionStatus &&
            profileVisibility
        ) {
            try {
                
                const formData = new FormData();
                
                formData.append('user_preferred_source_language', userPreferredSourceLanguage);
                formData.append('user_preferred_target_language', userPreferredTargetLanguage);
                formData.append('subscription_status', subscriptionStatus);
                formData.append('profile_visibility', profileVisibility);
                
                // Send the FormData object to the API service
                const response: unknown = await apiService.postset('/api/settings/create/', formData);

                // Type guard and assertion
                if (typeof response === 'object' && response !== null) {
                    const serverResponse = response as ServerResponse;

                    if (serverResponse.success || serverResponse.id) {
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
                         // This block handles server-side validation or failure without a 'success' flag
                         const responseErrors = serverResponse.errors || serverResponse;
                         
                         // Safely flatten error values from the server response
                         const tmpErrors: string[] = Object.values(responseErrors).flat().map((errorValue: unknown) => {
                             // Safely convert to string
                             return Array.isArray(errorValue) ? String(errorValue[0]) : String(errorValue);
                         }).filter(msg => msg.length > 0);


                         setErrors(tmpErrors.length > 0 ? tmpErrors : ["Submission failed due to a server error."]);
                         setIsError(true); 
                    }
                } else {
                    setErrors(["Submission failed: Invalid server response format."]);
                    setIsError(true);
                }


            } catch (error: unknown) { // Use 'unknown' instead of 'any'
                console.error("Error submitting Settings:", error);
                // Catch network errors or errors thrown by apiService.post (e.g., for 400 status)
                let errorMessages: string[] = ["An error occurred while submitting the Settings."];

                if (error instanceof Error) {
                    errorMessages = [error.message];
                } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                    // Safely extract errors from a custom error object
                    const customError = error as { errors: Record<string, unknown> };
                    errorMessages = Object.values(customError.errors).flat().map((e: unknown) => String(e)).filter(msg => msg.length > 0);
                } else {
                    errorMessages = ["An unknown error occurred during submission."];
                }
                
                setErrors(errorMessages);
                setIsError(true); 
            }

        } else {
            // Client-side validation failure
            const tmpErrors: string[] = [];
            
            if (!userPreferredSourceLanguage) {
                tmpErrors.push('Please enter your preferred source language of Translation');
            }
            if (!userPreferredTargetLanguage) {
                tmpErrors.push('Please enter your preferred target language of Translation');
            }
        
            if (!profileVisibility) {
                tmpErrors.push('Profile visibility is required');
            }
            if (!subscriptionStatus) {
                tmpErrors.push('Subscription status is required');
            }

            setErrors(tmpErrors);
            setIsError(true); 
        }

    };

        const content = (
        <>
            <div className="grid gap-4 modal-card">
                

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
                <div className="success-message p-3 bg-green-100 text-green-700 rounded-md mt-4">
                    {success.map((msg, index) => (
                        <div key={`success_${index}`} className="success-message">
                            {msg}
                        </div>
                    ))}
                </div>
            }
            

            {/* FIX: Using isError for consistency and to remove the warning */}
            {isError && errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md mt-4">
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