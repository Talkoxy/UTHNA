'use client';

import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';

interface TranslationInsights {
    total_translations: number;
    total_words_original: number;
    total_words_translated: number;
    saved_translations: number;
    liked_translations: number;
}

interface TranslationInsightsProps {
    userId?: string | null;
}

const TranslationInsights: React.FC<TranslationInsightsProps> = ({ userId }) => {
    const [stats, setStats] = useState<TranslationInsights | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiService.get(`/api/translate/Clienttranslations/stats/?user_id=${userId}`);
                if (response.success) {
                    setStats(response.data);
                } else {
                    setError('Failed to load statistics');
                }
            } catch (err) {
                setError('Error fetching statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [userId]);

    if (loading) {
        return <div className="animate-pulse">Loading stats...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!stats) {
        return <div>No statistics available Translate more to populate your insights</div>;
    }

    return (
        <div className="grid place-items-center gap-4">
            <div className="label">My Insights</div>

            <div className='grid grid-cols-2 insights_card place-items-center gap-4'>
                

                <div className="col-span-2 ">
                    <h2 className="text-xl font-semibold mb-4">Translation Statistics</h2>
                </div>
                
                <div className="">
                    <h3 className="text-lg font-medium">Total Translations</h3>
                    <p className="text-2xl font-bold">{stats.total_translations}</p>
                </div>

                <div className="">
                    <h3 className="text-lg font-medium">Words Translated</h3>
                    <p className="text-2xl font-bold">{stats.total_words_translated}</p>
                </div>

                <div className="">
                    <h3 className="text-lg font-medium">Saved Translations</h3>
                    <p className="text-2xl font-bold">{stats.saved_translations}</p>
                </div>

                <div className="">
                    <h3 className="text-lg font-medium">Liked Translations</h3>
                    <p className="text-2xl font-bold">{stats.liked_translations}</p>
                </div>

            </div>
           
        </div>
    );
};

export default TranslationInsights;