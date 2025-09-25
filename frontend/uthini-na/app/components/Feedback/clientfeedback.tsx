"use client";
import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';

export type FeedbackType = {
    id : string;

    original_translation: string;
    corrected_translation: string;
    feedback: string;

    source_language: string;
    target_language: string;
}

interface FeedbackProps {
    user_id?: string;
}

const ClientFeedback: React.FC<FeedbackProps> = ({ user_id }) => {
    const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

    const getFeedbacks = async () => {
        let url = '/api/feedback/list/';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        const tmpFeedbacks = await apiService.get(url);
        setFeedbacks(tmpFeedbacks.data);
    }

    useEffect(() => {
        getFeedbacks();
    }, [user_id]);

    return (
        <div>

        </div>
    );
}

export default ClientFeedback;