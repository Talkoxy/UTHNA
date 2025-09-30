"use client";

import Likebtn from '../Buttons/likebutton';
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import { useCallback, useEffect, useState } from "react";
import Custombtn from "../Buttons/custombutton";
import AddFeedbackButton from '../Buttons/feedback/addFeedbackbutton';

interface TranslationResult {
    output: string;
    detectedSourceLanguage: string;
    input: string;
}

const Translate = () => {
    // Form states
    const [originalText, setOriginalText] = useState('');
    const [targetLang, setTargetLang] = useState('');
    const [sourceLang, setSourceLang] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    // UI states
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isTranslated, setIsTranslated] = useState(false);


    const autoGrowTextArea = useCallback((element: HTMLTextAreaElement) => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }, []);

    const submitTranslate = async () => {
        // Reset states for new translation
        setErrors([]);
        setSuccess([]);
        setIsError(false);
        setIsSuccess(false);

        if (!originalText.trim()) {
            setErrors(['Please enter text to translate.']);
            setIsError(true);
            return;
        }

        if (!targetLang) {
            setErrors(['Please select a target language.']);
            setIsError(true);
            return;
        }

        try {
            const response = await apiService.post(
                '/api/translate/translate/',
                {
                    original_text: originalText,
                    target_language: targetLang,
                    source_language: sourceLang,
                }
            );

            if (
                response.Clienttranslations &&
                Array.isArray(response.Clienttranslations) &&
                response.Clienttranslations.length > 0
            ) {
                const translation = response.Clienttranslations[0] as TranslationResult;
                setTranslatedText(translation.output);
                setIsTranslated(true);
                setIsSuccess(true);
                setSuccess(['Translation successful']);
            } else {
                setErrors(['Translation failed: No translation result']);
                setIsError(true);
                setIsTranslated(false);
            }
        } catch (error: any) {
            setErrors([error.message || 'Translation failed']);
            setIsError(true);
            setIsTranslated(false);
        }
    };

    const handleTranslationFeedback = async () =>{
        
    }

    const handleSaveTranslation = async () => {
        try {
            const userId = await getUserId();
            if (!userId) {
                setErrors(['Please log in to save translations']);
                return;
            }

            const saveData = {
                original_text: originalText,
                translated_text: translatedText,
                target_language: targetLang,
                source_language: sourceLang,
            }; 

            const response = await apiService.post('/api/translate/Clienttranslations/save/', saveData)


            if (response.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000); // Reset saved state after 3 seconds
                setSuccess(['Translation saved, view it in your profile']);
            } else {
                setErrors(['Failed to save translation']);
            }
        } catch (error: any) {
            setErrors([error.message || 'Failed to save translation']);
        }
    };

    const handlelikedTranslation = async () => {
        try {
            const userId = await getUserId();
            if (!userId) {
                setErrors(['Please log in to save translations']);
                return;
            }

            const saveData = {
                original_text: originalText,
                translated_text: translatedText,
                target_language: targetLang,
                source_language: sourceLang,
            };

            const response = await apiService.post('/api/translate/Clienttranslations/like/', saveData)


            if (response.success) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000); // Reset saved state after 3 seconds
                setSuccess(['Translation liked, view it in your profile']);
            } else {
                setErrors(['Failed to save translation']);
            }
        } catch (error: any) {
            setErrors([error.message || 'Failed to save translation']);
        }
    };


    return (
        <main className="grid place-items-center fixed inset-0">
            <div className="grid grid-flow-row gap-5">

                {/* Translation Input Section */}
                <div className="grid grid-flow-row gap-6 translation-area">
                    <div className="grid grid-flow-col gap-6">
                        <div className="grid grid-flow-row gap-8 place-items-center">
                            <textarea
                                className="translation-textarea"
                                placeholder="Enter text to translate"
                                id="originalText"
                                value={originalText}
                                onChange={(e) => {
                                    setOriginalText(e.target.value);
                                    autoGrowTextArea(e.target);
                                }}
                            />

                            <div className='grid grid-cols-2 place-items-center gap-20 justify-items-center'>
                                <div className=''>
                                    <Custombtn
                                        label="Translate"
                                        onClick={submitTranslate}
                                        disabled={!originalText.trim() || !targetLang}
                                    />
                                </div>

                                <div className=''>
                                    {/* Success/Error Messages */}
                                        {isSuccess && (
                                            <div className="success-container">
                                                {success.map((msg, index) => (
                                                    <div key={`success_${index}`} className="success-message">
                                                        {msg}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {isError && (
                                            <div className="error-container">
                                                {errors.map((error, index) => (
                                                    <div key={`error_${index}`} className="error-message">
                                                        {error}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </div>
                                
                            
                            </div>

                            
                        </div>

                        {/* Language Selection */}
                        <div className="grid grid-flow-row place-items-center pb-40">
                            <div className="grid place-items-center gap-8">
                                <select
                                    className="dropmenu"
                                    value={sourceLang}
                                    onChange={(e) => setSourceLang(e.target.value)}
                                >
                                    <option value="">Translate from</option>
                                    
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                    <option value="af">Afrikaans</option>
                                </select>

                                <select
                                    className="dropmenu"
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                >
                                    <option value="">Translate to</option>

                          
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                    <option value="af">Afrikaans</option>
                                </select>
                            </div>
                            
                            
                        </div>

                        
                    </div>
                    
                    
                </div>

                {/* Translation Result Section */}
                        {isTranslated && (
                            <div className="grid grid-flow-col gap-8  place-items-center translation-area glow">
                                <div>
                                    <div className='grid place-items-center gap-8'>
                                        <textarea
                                        className="translation-resultarea"
                                        value={translatedText}
                                        readOnly
                                    />

                                    
                                        
                                        <Likebtn
                                            onClick={handlelikedTranslation}
                                            disabled={!translatedText}
                                        />
                                    
                                    </div> 
                                    
                             
                                </div>

                                <div>
                                    <div className="grid place-items-center gap-8">
                                    <Custombtn
                                            label="Save Translation"
                                            onClick={handleSaveTranslation}
                                            disabled={!translatedText}
                                    />
                                        
                                    <AddFeedbackButton 
                                        original_translation={translatedText} 
                                        translated_from={sourceLang} 
                                        translated_to={targetLang}
                                    />
                                    </div>
                                </div>
                            </div>
                        )}

                
            </div>
        </main>
    );
};

export default Translate;