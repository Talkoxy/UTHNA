import {create} from "zustand";

interface AddFeedbackModalStore{
    translated_from: string|null;
    setTranslated_from:(translated_from:string | null) => void;
    
    translated_to: string|null;
    setTranslated_to:(translated_to:string | null) => void;
    original_translation: string|null;
    setOriginal_translation:(original_translation:string | null) => void;
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddFeedbackModal = create<AddFeedbackModalStore>((set) => ({

    translated_from:null,
    setTranslated_from:(translated_from) => set({translated_from:translated_from}),

    translated_to:null,
    setTranslated_to:(translated_to) => set({translated_to:translated_to}),

    original_translation:null,
    setOriginal_translation:(original_translation) => set({original_translation:original_translation}),

    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),

    
}));

export default useAddFeedbackModal;