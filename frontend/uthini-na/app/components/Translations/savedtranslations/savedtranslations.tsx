'use client'

import apiService from "@/app/services/apiService";
import { useState, useEffect, useCallback } from "react"; // Added useCallback
import SavedTranslationItem from "./savedtranslationitem";

export type TranslationType = {
    id: string;
    original_text: string;
    translated_text: string;
    target_language: string;
    source_language: string;
    created_at: string;
    user: {
        id: string;
        name: string;
    };
}

interface SavedTranslationsProps {
    user_id?: string | null
}

const SavedTranslations: React.FC<SavedTranslationsProps> = ({ user_id }) => {
    const [translations, setTranslations] = useState<TranslationType[]>([]);

    // FIX: Wrap getTranslations in useCallback
    const getTranslations = useCallback(async () => {
        let url = '/api/translate/Clienttranslations/saved/list/';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        const tmpTranslations = await apiService.get(url);
        
        // Safely check that data exists and is an array
        if (tmpTranslations && Array.isArray(tmpTranslations.data)) {
            setTranslations(tmpTranslations.data);
        } else {
            setTranslations([]);
        }
    }, [user_id]); // Dependency for useCallback is user_id

    // FIX: Add getTranslations to the dependency array
    useEffect(() => {
        getTranslations();
    }, [user_id, getTranslations]); 

    return (
        <div className="grid grid-flow-row gap-4 place-items-center ">
            {translations.map((translation) => (
                <div 
                    key={translation.id}
                >
                    <SavedTranslationItem 
                        translation={translation}
                    />
                </div>
            ))}
        </div>
    );
}

export default SavedTranslations;
