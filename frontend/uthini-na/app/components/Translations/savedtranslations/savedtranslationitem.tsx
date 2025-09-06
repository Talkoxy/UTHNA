"use client"

import { TranslationType } from "./savedtranslations"

export interface TranslationProps {
    translation: TranslationType
}

const SavedTranslationItem: React.FC<TranslationProps> = ({translation}) => {
    return (
        <div className="list-item">
            <div className="grid place-items-center">
                <div className="grid gap-2 place-items-center">
                    <div className=""> Original Text: {translation.original_text}</div>
                    <div className=""> Translated Text: {translation.translated_text}</div>
                </div>           
            </div>
        </div>
    )
}

export default SavedTranslationItem;