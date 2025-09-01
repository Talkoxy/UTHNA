"use client";
import Translatebtn from "../Buttons/translatebutton";
import Likebtn from '../Buttons/likebutton';
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import { useCallback, useEffect, useState } from "react";
import Custombtn from "../Buttons/custombutton";

interface TranslationResult {
    output: string;
    detectedSourceLanguage: string;
    input: string;
}


const Translate = () => {

    const [originalText, setOriginalText] = useState('');
    const [targetLang, setTargetLang] = useState('');
    const [sourceLang, setSourceLang] = useState(''); // Optional: if you want to detect source language
    const [translatedText, setTranslatedText] = useState('');
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
        setErrors([]);
        setTranslatedText('');

        if (!originalText.trim()) {
            setErrors(['Please enter text to translate.']);
            return;
        }

        const formData = {
            original_text: originalText,
            target_language: targetLang,
            source_language: sourceLang,
        };

        try {
            const response = await apiService.postWithoutToken(
                '/api/translate/translate/',
                JSON.stringify(formData)
            );

            if (
                response.Clienttranslations &&  // Changed from response.translations
                Array.isArray(response.Clienttranslations) &&
                response.Clienttranslations.length > 0
            ) {
                const translation = response.Clienttranslations[0] as TranslationResult;
                setTranslatedText(translation.output || 'No translation available');
                setIsTranslated(true);
                setIsError(false);
                setIsSuccess(true);
                setSuccess(['Translation successful']);

                // Don't clear the input fields automatically
                // setOriginalText('');
                // setTargetLang('');
            } else {
                setErrors(['Translation failed: No translation result']);
                setIsError(true);
            }
        } catch (error: any) {
            setErrors([error.message || 'Translation failed']);
            setIsError(true);
        }
    };

    const handleSaveTranslation = async () => {
        try {
            const userId = await getUserId();
            if (!userId) {
                setErrors(['Please log in to save translations']);
                return;
            }

            const saveData = new FormData();
            saveData.append('original_text', originalText);
            saveData.append('translated_text', translatedText);
            saveData.append('target_language', targetLang);
            saveData.append('source_language', sourceLang || 'auto'); // Use 'auto' if source language is not specified

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

            const saveData = new FormData();
            saveData.append('original_text', originalText);
            saveData.append('translated_text', translatedText);
            saveData.append('target_language', targetLang);
            saveData.append('source_language', sourceLang || 'auto'); // Use 'auto' if source language is not specified

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


    // Optional: Reset height when text is cleared
    useEffect(() => {
        if (!originalText) {
            const textarea = document.getElementById('originalText') as HTMLTextAreaElement;
            if (textarea) {
                textarea.style.height = '150px'; // Reset to min-height
            }
        }
    }, [originalText]);

    return (
        <div className="grid place-items-center fixed inset-0 pt-20">
            <div className="grid grid-flow-row gap-8">

                <div className="grid grid-flow-row gap-6" >
                    <div className="grid grid-flow-col gap-8">
                        <div className="grid grid-flow-row gap-8 place-items-center">

                            <div>
                            <textarea
                                className="translation-textarea"
                                placeholder="Enter text to translate"
                                id="originalText"
                                value={originalText}
                                onChange={(e) => {
                                    setOriginalText(e.target.value);
                                    autoGrowTextArea(e.target);
                                }}
                                onInput={(e) => autoGrowTextArea(e.target as HTMLTextAreaElement)}
                            />
                            </div>

                            <div className="grid grid-flow-col gap-8 place-items-center">

                                <div className=" grid  place-items-center">
                                    <Custombtn
                                        label="Translate"
                                        onClick={submitTranslate}
                                    />
                                </div>

                                {isSuccess &&(   
                                <div className="grid gap-2 success-container">
                                    {success.length > 0 && (
                                        <div className="grid gap-2 success-message">
                                            {success.map((success, index) => (
                                                <div
                                                    key={`success_${index}`}
                                                >
                                                    {success}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                    )}

                            </div>

                            

                        </div>
                        



                        <div className="grid grid-flow-row place-items-center pb-40">
                            <div className="grid place-items-center gap-8">
                                <select className="dropmenu"
                                    id="sourceLang"
                                    onChange={(e) => setSourceLang(e.target.value)}
                                    value={sourceLang}
                                >
                                    <option value="">Translate from</option>
                                    <option value="zu">Zulu</option>
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                </select>

                                <select
                                    className="dropmenu"
                                    id="targetLang"
                                    onChange={(e) => setTargetLang(e.target.value)}
                                    value={targetLang}
                                >
                                    <option value="">Translate to</option>
                                    <option value="zu">Zulu</option>
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                </select>

                            </div>


                        </div>


                    </div>

                    
                {isError &&(   
                    <div className="grid gap-2 error-container">
                        {errors.length > 0 && (
                            <div className="grid gap-2 error-message">
                                {errors.map((error, index) => (
                                    <div
                                        key={`error_${index}`}
                                    >
                                        {error}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    )}

                

                </div>


                {isTranslated && (                 
                    <div className="grid grid-flow-row gap-8 place-items-center">
                                <div>
                                    <textarea
                                        className="translation-textarea"
                                        placeholder="Result of translation"
                                        defaultValue={translatedText}
                                    />
                                </div>

                                <div className="flex items-center gap-8">
                                    <div>
                                        <Custombtn
                                            label="Save Translation"
                                            onClick={handleSaveTranslation}
                                        />
                                    </div>

                                    <div className="place-items-center"> 
                                        <Likebtn onClick={handlelikedTranslation}/>
                                    </div>
                                </div>
                    </div>

                )}

            </div>


        </div>
    )
}
export default Translate;