"use client";

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
            const response = await apiService.postWithoutToken(
                '/api/translate/translate/',
                JSON.stringify({
                    original_text: originalText,
                    target_language: targetLang,
                    source_language: sourceLang,
                })
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
        <main className="grid place-items-center fixed inset-0">
            <div className="grid grid-flow-row gap-5">
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

                {/* Translation Input Section */}
                <div className="grid grid-flow-row gap-6 glow">
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

                            <Custombtn
                                label="Translate"
                                onClick={submitTranslate}
                                disabled={!originalText.trim() || !targetLang}
                            />
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
                                    <option value="zu">Zulu</option>
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                </select>

                                <select
                                    className="dropmenu"
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                >
                                    <option value="">Translate to</option>
                                    <option value="zu">Zulu</option>
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Translation Result Section */}
                {isTranslated && (
                    <div className="grid grid-flow-row gap-8 place-items-center">
                        <textarea
                            className="translation-textarea"
                            placeholder="Result of translation"
                            value={translatedText}
                            readOnly
                        />

                        <div className="flex items-center gap-8">
                            <Custombtn
                                label="Save Translation"
                                onClick={handleSaveTranslation}
                                disabled={!translatedText}
                            />
                            <Likebtn
                                onClick={handlelikedTranslation}
                                disabled={!translatedText}
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Translate;