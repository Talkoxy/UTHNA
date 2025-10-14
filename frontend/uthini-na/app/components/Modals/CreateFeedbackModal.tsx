"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import useCreateFeedbackModal from "../Hooks/useCreateFeedbackModal";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";

const CreateFeedbackModal = () => {

    const createFeedbackModal = useCreateFeedbackModal()

    const [originalTranslation, setOriginalTranslation] = useState('');
    const [correctedTranslation, setCorrectedTranslation] = useState('');
    const [feedback, setFeedback] = useState('');

    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Define the expected structure of a server response object for type safety
    type ServerResponse = { 
        success?: boolean; 
        id?: string; 
        errors?: Record<string, unknown>; // Use Record<string, unknown> for flexible error bodies
        message?: string; // Sometimes APIs return a top-level message
    };


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
            
            // Use 'unknown' for the response type for safety
            const response: unknown = await apiService.post('/api/feedback/create/', saveData);
            
            // Type guard and assertion
            if (typeof response === 'object' && response !== null) {
                const serverResponse = response as ServerResponse;

                // B. Server Success/Failure Handling
                if (serverResponse.success || serverResponse.id) { 
                    
                    setSuccess(['Feedback submitted successfully!']);
                    setIsSuccess(true);
                    
                    setTimeout(() => {
                        setIsSuccess(false);
                        setSuccess([]);
                        createFeedbackModal.close();
                    }, 2500);
                } 
                
                
                else {
                    // Handle Server Validation/Other Server Errors
                    // Check for the 'errors' field, otherwise fallback to the whole response object
                    const responseErrors = serverResponse.errors || serverResponse;
                    
                    // Safely flatten and map errors
                    const tmpErrors: string[] = Object.values(responseErrors).flat().map((errorValue: unknown) => {
                         // Safely get the string version of the error
                        return Array.isArray(errorValue) ? String(errorValue[0]) : String(errorValue);
                    });

                    setErrors(tmpErrors.length > 0 ? tmpErrors : ["Feedback submission failed due to a server error."]);
                    setIsError(true);
                }
            } else {
                setErrors(["Feedback submission failed: Invalid server response format."]);
                setIsError(true);
            }


        } catch (error: unknown) { // Use 'unknown' instead of 'any'
            // C. Network/API Service Errors
            console.error("Error submitting feedback:", error);
            
            let errorMessages = ["An unexpected network error occurred."];

            if (error instanceof Error) {
                 errorMessages = [error.message];
            } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                 // Safely extract errors from a custom error object if the service returns one
                const customError = error as { errors: Record<string, unknown> };
                errorMessages = Object.values(customError.errors).flat().map((e: unknown) => String(e));
            } else {
                errorMessages = ["An unknown error occurred during submission."];
            }

            setErrors(errorMessages);
            setIsError(true);
        }
    };


    // 4. ADOPTED AND ADJUSTED CONTENT RENDERING
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
                    <div className="success-message p-3 bg-green-100 text-green-700 rounded-md mt-4">
                        {success.map((msg, index) => (
                            <div key={`success_${index}`}>{msg}</div>
                        ))}
                    </div>
                }

            </div>

            {/* FIX: Using isError for consistency and to remove the warning */}
            {isError && errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md mt-4">
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
            label="Submit Translation Feedback"
            content={content}
        />
    )
}

export default CreateFeedbackModal;