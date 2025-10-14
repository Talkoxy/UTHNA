"use client"
import apiService from "@/app/services/apiService";
import LikedTranslationItem from "./likedtranslationitem";
import { useState, useEffect, useCallback } from "react"; // ADD useCallback
import { TranslationType } from "../savedtranslations/savedtranslations";


interface LikedTranslationsProps {
    user_id?: string | null
}


const LikedTranslations: React.FC<LikedTranslationsProps> = ({ user_id }) => {

    const [translations, setTranslations] = useState<TranslationType[]>([]);

    // FIX: Wrap getTranslations in useCallback
    const getTranslations = useCallback(async () => {
        let url = '/api/translate/Clienttranslations/liked/list/';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        const tmpTranslations = await apiService.get(url);
        
        // Ensure data is an array before setting state
        if (tmpTranslations && Array.isArray(tmpTranslations.data)) {
            setTranslations(tmpTranslations.data);
        } else {
             // Handle case where data might be null or not an array
            setTranslations([]);
        }
       
    }, [user_id]); // The only dependency for getTranslations is user_id

    // FIX: Add getTranslations to the dependency array
    useEffect(() => {
        getTranslations();
    }, [user_id, getTranslations]); 

    return (
        <div className="grid grid-flow-row gap-4 place-items-center">
            {translations.map((translation) => (
                <div 
                    key={translation.id}
                >
                    <LikedTranslationItem 
                        translation={translation}
                    />
                </div>
            ))}
        </div>
    );
}

export default LikedTranslations;