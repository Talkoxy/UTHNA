'use client'

import apiService from "@/app/services/apiService";
import { useState, useEffect } from "react";
import ClientFeedbackItem from "./clientfeedbackitem";

export type ClientFeedbackType = {
    id: string;
    created_at: string;
    original_translation : string;
    translated_form : string;
    translated_to: string;
    feedback: string;
    context: string | null;
    user: {
        id: string;
        name: string;
    };
}

interface ClientFeedbackProps {
    user_id?: string | null
}

const ClientFeedback: React.FC<ClientFeedbackProps> = ({ user_id }) => {
    const [feedback, setFeedback] = useState<ClientFeedbackType[]>([]);

    const getFeedback = async () => {
        let url = '/api/feedback/list/';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        const tmpfeedback = await apiService.get(url);
        setFeedback(tmpfeedback.data);
    }

    useEffect(() => {
        getFeedback();
    }, [user_id]); 

    return (
        <div className=" grid grid-flow-row gap-4 place-items-center ">
            {feedback.map((feedbacks) => (
                <div 
                    key={feedbacks.id}                >
                    < ClientFeedbackItem 
                        feedback={feedbacks}
                    />
                </div>
            ))}
        </div>
    );
}

export default ClientFeedback;