"use client"
import apiService from "@/app/services/apiService";
import LikedTranslationItem from "./likedtranslationitem";
import { useState, useEffect } from "react";
import { TranslationType } from "../savedtranslations/savedtranslations";


interface LikedTranslationsProps {
    user_id?: string | null
}


const LikedTranslations: React.FC<LikedTranslationsProps> = ({ user_id }) => {

    const [translations, setTranslations] = useState<TranslationType[]>([]);

    const getTranslations = async () => {
        let url = '/api/translate/Clienttranslations/liked/list/';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        const tmpTranslations = await apiService.get(url);
        setTranslations(tmpTranslations.data);
    }

    useEffect(() => {
        getTranslations();
    }, [user_id]); // Add dependency to prevent infinite loop

    return (
        <div className=" grid grid-flow-row gap-4 place-items-center list">
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