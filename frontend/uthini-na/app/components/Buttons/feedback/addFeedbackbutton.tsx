"use client"

import useAddFeedbackModal from "../../Hooks/useCreateFeedbackModal"

interface AddFeedbackButtonProps {
    original_translation: string;
    translated_from: string;
    translated_to: string;
}

const AddFeedbackButton: React.FC<AddFeedbackButtonProps> = ({ original_translation, translated_from, translated_to }) => {


    const AddFeedbackModal = useAddFeedbackModal()

    const AddFeedback = () => {
        AddFeedbackModal.setOriginal_translation(original_translation)
        AddFeedbackModal.setTranslated_from(translated_from)
        AddFeedbackModal.setTranslated_to(translated_to)
        AddFeedbackModal.open()
    }

    return (
        <div onClick={AddFeedback} className="feedback_btn">
            <div>Add-Feedback</div>
        </div>
    )
}

export default AddFeedbackButton;