 'use client';

import { useEffect, useState, useCallback, use } from 'react';
import apiService from '@/app/services/apiService';
import AddComment from './addcomment';
 
export type ConnectCommentType = {
    id : string;
    created_at: string
    text: string;

    author : {
        id: string;
        username : string; 
        user_avatar : string;
    };

    connect :{
        id:string;
    }
}

interface ConnectCommentProps {
    postId?: string | null;
}

const ConnectComments: React.FC<ConnectCommentProps> = ({postId}) => {
    const [comments, setComments] = useState<ConnectCommentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getConnectComments = useCallback(async() => {
        setIsLoading(true);
   
        let url = '/api/connect/comments/';
        
        if (postId) {
            url += `?post_id=${postId}`;
        }

        try {
            const response = await apiService.get(url);
            setComments(response.data || response); 
            console.log("Posts refreshed via callback trigger.");
        } catch (error) {
            console.error("Failed to fetch connect posts:", error);
            setComments([]);
        } finally {
            setIsLoading(false);
        }
    }, [postId]); // Dependency on comment_id allows filtering changes to trigger a fetch

    const handlePostCreated = useCallback(() => {
        // This function forces a re-fetch of the post list.
        getConnectComments();
        console.log("New comment creation detected. Refreshing ...");
    }, [getConnectComments]);

    useEffect(() => {
        getConnectComments();

    }, [getConnectComments]);

    if (isLoading) {
        return <p className='text-gray-500'>Loading comments...</p>;
    }


    return (
        <div>
            <div>
                <AddComment postId={postId || ''} onCommentCreated={handlePostCreated} />
            </div>
        </div>
    )
}

export default ConnectComments;