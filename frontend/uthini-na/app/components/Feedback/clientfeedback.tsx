"use client";
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
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

    // 1. Wrap fetching function in useCallback and depend on user_id
    const getFeedbacks = useCallback(async () => {
        let url = '/api/feedback/list/';

        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        try {
            const tmpFeedbacks = await apiService.get(url);
            setFeedbacks(tmpFeedbacks.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            setFeedbacks([]);
        }
    }, [user_id]); // The user_id is the function's only external dependency

    // 2. Update useEffect to depend on the stable getFeedbacks function
    useEffect(() => {
        getFeedbacks();
    }, [getFeedbacks]); // Fixed missing dependency warning

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">User Feedback</h2>
            
            {/* 3. Use the 'feedbacks' state to resolve the unused variable warning */}
            {feedbacks.length === 0 ? (
                <p className="text-gray-500 italic">No feedback submitted yet.</p>
            ) : (
                feedbacks.map((item) => (
                    <div 
                        key={item.id} 
                        className="p-4 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="text-sm font-medium text-blue-600 mb-1">
                            {item.source_language} <span className="font-mono">{'->'}</span> {item.target_language}
                        </div>
                        <p className="text-lg font-semibold text-gray-700">
                            Original: {item.original_translation}
                        </p>
                        <p className="text-lg font-semibold text-gray-700">
                            Correction: {item.corrected_translation}
                        </p>
                        <p className="mt-3 text-sm text-gray-600 border-t pt-2">
                            <span className="font-bold text-gray-800">User Comment:</span> {item.feedback}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default ClientFeedback;
