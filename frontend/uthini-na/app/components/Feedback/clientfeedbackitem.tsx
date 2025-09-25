"use client";

import { FeedbackType } from "./clientfeedback";

export interface FeedbackProps {
    feedbacks: FeedbackType;
}

const ClientFeedbackItem: React.FC<FeedbackProps> = ({feedbacks}) => {
    return (
        <div className="saved_translation_card">
            <div className="grid place-items-center">
                <div className="grid gap-2 place-items-center">
                    <div className=""> Original Translation: {feedbacks.original_translation}</div>
                    <div className=""> Corrected Translation: {feedbacks.corrected_translation}</div>
                    <div className=""> Feedback: {feedbacks.feedback}</div>
                    <div className=""> Source Language: {feedbacks.source_language}</div>
                    <div className=""> Target Language: {feedbacks.target_language}</div>
                </div>           
            </div>
        </div>
    )
}

export default ClientFeedbackItem;