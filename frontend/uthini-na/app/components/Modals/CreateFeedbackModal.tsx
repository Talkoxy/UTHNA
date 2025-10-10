"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import useCreateFeedbackModal from "../Hooks/useCreateFeedbackModal";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";

const CreateFeedbackModal = () => {

    const createFeedbackModal = useCreateFeedbackModal()

    // 1. Initialize local state variables (kept from previous revision)
    const [originalTranslation, setOriginalTranslation] = useState('');
    const [correctedTranslation, setCorrectedTranslation] = useState('');
    const [feedback, setFeedback] = useState('');

    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // 2. useEffect for loading data and resetting state on open/close (kept from previous revision)
    useEffect(() => {
        if (createFeedbackModal.isOpen) {
            
            setOriginalTranslation(createFeedbackModal.original_translation || '');
            setSourceLanguage(createFeedbackModal.translated_from || '');
            setTargetLanguage(createFeedbackModal.translated_to || '');

            setCorrectedTranslation('');
            setFeedback('');
            setErrors([]);
            setSuccess([]);
            setIsError(false);
            setIsSuccess(false);
            
        } else {
             // Reset all states on close to ensure a clean slate for next open
             setOriginalTranslation('');
             setCorrectedTranslation('');
             setFeedback('');
             setSourceLanguage('');
             setTargetLanguage('');
             setErrors([]);
             setSuccess([]);
             setIsError(false);
             setIsSuccess(false);
        }

    }, [
        createFeedbackModal.isOpen,
        createFeedbackModal.original_translation,
        createFeedbackModal.translated_from,
        createFeedbackModal.translated_to,
    ]);
    
    
    // 3. ADOPTED AND ADJUSTED SUBMISSION LOGIC
    const sudmitFeedback = async () => {
        setErrors([]); // Clear previous errors
        setSuccess([]); // Clear previous success messages
        setIsError(false);
        setIsSuccess(false);

        // A. Client-side validation: Check for all required fields
        if (
            !originalTranslation ||
            !correctedTranslation ||
            !feedback ||
            !sourceLanguage ||
            !targetLanguage
        ) {
            const tmpErrors: string[] = [];
            if (!originalTranslation) tmpErrors.push('Original translation is required.');
            if (!correctedTranslation) tmpErrors.push('Corrected translation is required.');
            if (!feedback) tmpErrors.push('Feedback text is required.');
            if (!sourceLanguage) tmpErrors.push('Source language is required.');
            if (!targetLanguage) tmpErrors.push('Target language is required.');
            
            setErrors(tmpErrors);
            setIsError(true);
            return; // Exit if validation fails
        }
        
        const saveData = {
            original_translation: originalTranslation,
            corrected_translation: correctedTranslation,
            feedback: feedback,
            source_language: sourceLanguage,
            target_language: targetLanguage,
        }
               
        try {
            
            const response = await apiService.post('/api/feedback/create/', saveData);
            
            // B. Server Success/Failure Handling
            if (response && (response.success || response.id)) { // Check for success or ID (common API success patterns)
                
                setSuccess(['Feedback submitted successfully!']);
                setIsSuccess(true);
                
                setTimeout(() => {
                    setIsSuccess(false);
                    setSuccess([]);
                    createFeedbackModal.close();
                }, 2500); // 2.5 seconds delay allows the user to see the success message
            } 
            
            
            else {
                // Handle Server Validation/Other Server Errors
                const responseErrors = response.errors || response;
                const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: any) => {
                     // Attempt to show field name with error, otherwise the string
                    return Array.isArray(error) ? error[0] : String(error);
                });

                setErrors(tmpErrors.length > 0 ? tmpErrors : ["Feedback submission failed due to a server error."]);
                setIsError(true);
            }


        } catch (error: any) {
            // C. Network/API Service Errors
            console.error("Error submitting feedback:", error);
            
            let errorMessages = ["An unexpected network error occurred."];

             if (error.message) {
                 errorMessages = [error.message];
            } else if (error.errors) {
                 // If the error object contains nested server validation errors
                errorMessages = Object.values(error.errors).flat().map((e: any) => String(e));
            }

            setErrors(errorMessages);
            setIsError(true);
        }
    };


    // 4. ADOPTED AND ADJUSTED CONTENT RENDERING (Added success message display)
    const content = (
        <>
            <div className="grid gap-4 card">
                <input type="text" 
                value={originalTranslation} 
                onChange={(e) => setOriginalTranslation(e.target.value)}
                placeholder="Original Translation"
                    />

                <input type="text" 
                value={correctedTranslation} 
                onChange={(e) => setCorrectedTranslation(e.target.value)}
                placeholder="Corrected Translation" />

                <input type="text" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} placeholder="Translated From" />

                <input type="text" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}  placeholder="Translated To"/>

                <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)}  placeholder="Feedback"/>

                <Custombtn label='Submit Feedback' onClick={sudmitFeedback}/>
                
                {isSuccess && 
                    <div className="success-message p-3 bg-green-100 text-green-700 rounded-md">
                        {success.map((msg, index) => (
                            <div key={`success_${index}`}>{msg}</div>
                        ))}
                    </div>
                }

            </div>

            {errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}
        </>
    )
        


    return (
        <Modal
            isOpen={createFeedbackModal.isOpen}
            close={createFeedbackModal.close}
            label="Feedback"
            content={content}
        />
    )
}

export default CreateFeedbackModal;