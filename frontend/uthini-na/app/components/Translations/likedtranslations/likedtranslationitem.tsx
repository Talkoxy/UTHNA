"use client"
import { TranslationType } from "../savedtranslations/savedtranslations"
import { TranslationProps } from "../savedtranslations/savedtranslationitem"



const LikedTranslationItem: React.FC<TranslationProps> = ({translation}) => {
    return (
        <div className="saved_translation_card">
            <div className="grid place-items-center">
                <div className="grid gap-2 place-items-center">
                    <div className=""> Original Text: {translation.original_text}</div>
                    <div className=""> Translated Text: {translation.translated_text}</div>
                </div>           
            </div>
        </div>
    )
}

export default LikedTranslationItem;