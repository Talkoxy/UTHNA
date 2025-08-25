"use client"

import { TranslationType } from "./savedtranslations"

interface TranslationProps {
    translation: TranslationType
}

const SavedTranslationItem: React.FC<TranslationProps> = ({translation}) => {
    return (
        <div className="card">
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="">{translation.original_text}</div>
                    <div className="">{translation.translated_text}</div>
                </div>           
                <div className="text-subtitle flex justify-between items-center">
                    <span>{translation.target_language}</span>
                </div>
            </div>
        </div>
    )
}

export default SavedTranslationItem;