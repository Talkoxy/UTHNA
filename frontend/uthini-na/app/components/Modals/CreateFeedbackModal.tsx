"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import useCreateFeedbackModal from "../Hooks/useCreateFeedbackModal";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";

const CreateFeedbackModal = () => {

    const createFeedbackModal = useCreateFeedbackModal()

    const [currentStep, setCurrentStep] = useState(1);

    const initialTranslation = createFeedbackModal.original_translation || '';
    const initialTranslatedFrom = createFeedbackModal.translated_from || '';
    const initialTranslatedTo = createFeedbackModal.translated_to || '';

    
    const [originalTranslation, setOriginalTranslation] = useState(initialTranslation);
    const [correctedTranslation, setCorrectedTranslation] = useState('');
    const [feedback, setFeedback] = useState('');

    const [sourceLanguage, setSourceLanguage] = useState(initialTranslatedFrom);
    const [targetLanguage, setTargetLanguage] = useState(initialTranslatedTo);

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
     useEffect(() => {
        if (!createFeedbackModal.isOpen) {
            setCurrentStep(1);

            setOriginalTranslation(initialTranslation);
            setCorrectedTranslation('');
            setFeedback('');

            setSourceLanguage(initialTranslatedFrom);
            setTargetLanguage(initialTranslatedTo);

            
            }else {
                setErrors([]);
            }

        }, [createFeedbackModal.isOpen]);
    
    // Reset state when modal is closed
    const sudmitFeedback = async () => {
        if (
            originalTranslation &&
            correctedTranslation &&
            feedback &&
            sourceLanguage &&
            targetLanguage
        ) {
            try {
            const saveData = {
                original_translation: originalTranslation,
                corrected_translation: correctedTranslation,
                feedback: feedback,
                source_language: sourceLanguage,
                target_language: targetLanguage,
            }

            const response = await apiService.post('/api/feedback/create/', (saveData))

            if (response.success) {
                setErrors([]);
                setIsError(false);
            } else {
                const tmpErrors: string[] = Object.values(errors).map((error: any) => {
                    return error;
                })

                setErrors(tmpErrors);
                setIsError(true); 
                  
            }

            } catch (error) {
                console.error("Error submitting feedback:", error);
                setErrors(["An error occurred while submitting the feedback."]);
                setIsError(true); 
            }

            if (!isError) {
                setSuccess(['Feedback submitted successfully']);
                setIsSuccess(true);

                setTimeout(() => {
                    setIsSuccess(false);
                    setSuccess([]);
                    createFeedbackModal.close();
                }, 2000); // Close modal after 2 seconds
            }


        } else {

            const tmpErrors: string[] = [];

            if (!originalTranslation) {
                tmpErrors.push('Original translation is required');
            }
            if (!correctedTranslation) {
                tmpErrors.push('Corrected translation is required');
            }
            if (!feedback) {
                tmpErrors.push('Feedback is required');
            }
            if (!sourceLanguage) {
                tmpErrors.push('Source language is required');
            }
            if (!targetLanguage) {
                tmpErrors.push('Target language is required');
            }

            setErrors(tmpErrors);
        }

    };

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

                <Custombtn label='submit Feedback' onClick={sudmitFeedback}/>

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
            isOpen={createFeedbackModal.isOpen}
            close={createFeedbackModal.close}
            label="Feedback"
            content={content}
        />
    )
}

export default CreateFeedbackModal;