"use client";
import Translatebtn from "../Buttons/translatebutton";
import Likebtn from '../Buttons/likebutton';
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import { useState, useEffect } from "react";

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
    const [saved, setSaved] = useState(false);

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

                // Don't clear the input fields automatically
                // setOriginalText('');
                // setTargetLang('');
            } else {
                setErrors(['Translation failed: No translation result']);
            }
        } catch (error: any) {
            setErrors([error.message || 'Translation failed']);
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
                setErrors(['saved translation']);
            } else {
                setErrors(['Failed to save translation']);
            }
        } catch (error: any) {
            setErrors([error.message || 'Failed to save translation']);
        }
    };


    return (
        <div className="grid place-items-center fixed inset-0">
            <div className="grid grid-flow-row gap-8">

                <div className="grid grid-flow-row gap-8" >
                    <div className="grid grid-flow-col gap-8">

                        <div>
                            <textarea
                                className="translation-textarea"
                                placeholder="Enter text to translate"
                                id="originalText"
                                onChange={(e) => setOriginalText(e.target.value)}
                            />
                        </div>



                        <div className="grid  grid-flow-row justify-center">

                            <div>

                                <select className="dropmenu"
                                    id="sourceLang"
                                    onChange={(e) => setSourceLang(e.target.value)}
                                    value={sourceLang}
                                >
                                    <option value="">Select language</option>
                                    <option value="zu">Zulu</option>
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                </select>

                            </div>

                            <div>
                                {errors.length > 0 && (
                                    <div className="grid gap-2">
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
                        </div>
                    </div>

                    <div className=" grid place-items-center">
                        <Translatebtn
                            label="Translate"
                            onClick={submitTranslate}
                        />
                    </div>


                </div>



                <div className="grid grid-flow-row gap-8">

                    <div className="grid grid-flow-col gap-8">
                        <div>
                            <select
                                className="dropmenu"
                                id="targetLang"
                                onChange={(e) => setTargetLang(e.target.value)}
                                value={targetLang}
                            >
                                <option value="">Select language</option>
                                <option value="zu">Zulu</option>
                                <option value="xh">Xhosa</option>
                                <option value="en">English</option>
                            </select>
                        </div>



                        <div>
                            <div>
                                <textarea
                                    className="translation-textarea"
                                    placeholder="Result of translation"
                                    value={translatedText}
                                />


                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center gap-6">


                        <div>
                            <Translatebtn
                                label="Save Translation"
                                onClick={handleSaveTranslation}
                            />
                        </div>

                        <div className="pl-20"> <Likebtn /> </div>

                    </div>


                </div>


            </div>





        </div>
    )
}
export default Translate;