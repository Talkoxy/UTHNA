"use client"

import { ClientFeedbackType } from "./clientfeedback"

export interface ClientFeedbackProps {
    feedback: ClientFeedbackType
}

const ClientFeedbackItem: React.FC<ClientFeedbackProps> = ({feedback}) => {
    return (
        <div className="clientfeedback_card">
            <div className="grid place-items-center">
                <div className="grid gap-2 place-items-center">
                    <div className=""> Original Text: {feedback.original_translation}</div>
                    <div className=""> Translated From: {feedback.translated_form}</div>
                    <div className=""> Translated To: {feedback.translated_to}</div>
                    <div className=""> Feedback: {feedback.feedback}</div>
                    <div className=""> context: {feedback.context}</div>
                </div>           
            </div>
        </div>
    )
}
export default ClientFeedbackItem;