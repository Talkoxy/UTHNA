"use client";

// Removed unused imports: Likebtn, useEffect
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import { useCallback, useState } from "react";
import Custombtn from "../Buttons/custombutton";
import AddFeedbackButton from '../Buttons/feedback/addFeedbackbutton';

interface TranslationResult {
    output: string;
    detectedSourceLanguage: string;
    input: string;
}

// Define the expected server response structure for translation
interface TranslationResponse {
    Clienttranslations?: TranslationResult[];
}

// Define the expected server response structure for saving/liking
interface SaveResponse {
    success?: boolean;
    message?: string;
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
    // Removed unused state: [saved, setSaved] 
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
            const response: unknown = await apiService.post(
                '/api/translate/translate/',
                {
                    original_text: originalText,
                    target_language: targetLang,
                    source_language: sourceLang,
                }
            );
            
            // Safely check and assert the response structure
            if (
                typeof response === 'object' && response !== null &&
                'Clienttranslations' in response &&
                Array.isArray((response as TranslationResponse).Clienttranslations) &&
                (response as TranslationResponse).Clienttranslations!.length > 0
            ) {
                const translation = (response as TranslationResponse).Clienttranslations![0];
                setTranslatedText(translation.output);
                setIsTranslated(true);
                setIsSuccess(true);
                setSuccess(['Translation successful']);
            } else {
                setErrors(['Translation failed: No translation result']);
                setIsError(true);
                setIsTranslated(false);
            }
        } catch (error: unknown) { // FIX: Use unknown instead of any
            console.error("Translation error:", error);
            let errorMessage = 'Translation failed due to an unexpected error.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setErrors([errorMessage]);
            setIsError(true);
            setIsTranslated(false);
        }
    };

    // Removed unused function: handleTranslationFeedback (L88)
    // Removed unused function: handlelikedTranslation (L122)

    const handleSaveTranslation = async () => {
        setErrors([]);
        setIsError(false);
        setIsSuccess(false);

        try {
            const userId = await getUserId();
            if (!userId) {
                setErrors(['Please log in to save translations']);
                setIsError(true);
                return;
            }

            const saveData = {
                original_text: originalText,
                translated_text: translatedText,
                target_language: targetLang,
                source_language: sourceLang,
            }; 

            const response: unknown = await apiService.post('/api/translate/Clienttranslations/save/', saveData);

            // Safely check and assert the response structure
            if (typeof response === 'object' && response !== null && (response as SaveResponse).success) {
                
                setSuccess(['Translation saved, view it in your profile']);
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000); 
                
            } else {
                setErrors(['Failed to save translation']);
                setIsError(true);
            }
        } catch (error: unknown) { // FIX: Use unknown instead of any
            console.error("Save error:", error);
            let errorMessage = 'Failed to save translation due to an unexpected error.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setErrors([errorMessage]);
            setIsError(true);
        }
    };


    return (
        <main className="grid grid-col-1 place-items-center pt-10 gap-4">
             <div className="grid place-items-center translate-heading">
                <h1>Translate African Languages</h1>
                <p>Help us build fast, accurate translations that preserve cultural meaning</p>
            </div>
            <div className="grid place-items-center grid-flow-row gap-5">
                <div className=' grid '>
                    {/* Success/Error Messages */}
                        {isSuccess && (
                            <div className="success-container p-2 bg-green-100 text-green-700 rounded-md">
                                {success.map((msg, index) => (
                                    <div key={`success_${index}`} className="success-message">
                                        {msg}
                                    </div>
                                ))}
                            </div>
                        )}

                        {isError && (
                            <div className="error-container p-2 bg-red-100 text-red-700 rounded-md">
                                {errors.map((error, index) => (
                                    <div key={`error_${index}`} className="error-message">
                                        {error}
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
        </div>
        <div>
           
            <div className=" grid p-6 translation-area">
                        <div>
                            <div className="grid place-items-center grid-flow-col p-4">
                        
                                <select
                                    className="dropmenu-translate"
                                    value={sourceLang}
                                    onChange={(e) => setSourceLang(e.target.value)}
                                >
                                    <option value="">Translate from</option>
                                    
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                    <option value="af">Afrikaans</option>
                                </select>

                                <select
                                    className="dropmenu-translate"
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                >
                                    <option value="">Translate to</option>

                          
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                    <option value="af">Afrikaans</option>
                                </select>

                            </div>
                            <div>

                            <div className="grid place-items-center grid-flow-col p-2">
                                <div className="grid gap-2">
                                    <h2>Source Text</h2>
                                    <textarea
                                        className="translation-textarea"
                                        placeholder="Enter text to translate"
                                        id="originalText"
                                        value={originalText}
                                        onChange={(e) => {
                                            setOriginalText(e.target.value);
                                        }}
                                    />
                                </div>
                            
                                <div className="grid gap-2">
                                    <h2>Translation</h2>
                                    <textarea
                                        className="translation-resultarea"
                                        value={translatedText}
                                        readOnly
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="grid place-items-center p-8">
                            <Custombtn
                                        className="translate_btn"
                                        label="Translate"
                                        onClick={submitTranslate}
                                        disabled={!originalText.trim() || !targetLang}
                                    />

                        </div>

                                    
                        
                        
                           
                            
                    </div>
                </div>

                

                <div>
                   
                </div>
            </div>
        </main>
    );
};

export default Translate;
