'use client'

import { useEffect, useState, useCallback } from 'react';
import apiService from '@/app/services/apiService';
import ConnectPostItem from './connectpostitem';
import CreateConnectPostButton from '../../Buttons/connect/addConnectPostbutton';
// Removed unused import: ClientSettingsType
// Assuming CreatePostButton is imported here (as it will be needed in the JSX)



export type ConnectPostsType= {
// connectPosts fields here
    id: string; 
    title: string;
    text: string;

    author: {
        id :string;
        email :string;
        username: string;
        user_avatar: string ; 
    }
    
}

interface ConnectPostsProps {
    user_id?: string | null;

}

const ConnectPosts: React.FC<ConnectPostsProps> = ({ user_id }) => {
    const[connectPosts, setConnectPosts] = useState<ConnectPostsType[]>([]);
    // Removed unused state: settings
    const [isLoading, setIsLoading] = useState(true);

    
    // 1. Memoized function to fetch posts (Replaces the old async function)
    const getConnectPosts = useCallback(async() => {
        setIsLoading(true);
        // Cleaned up the URL to consistently use the base path if user_id is null
        let url = '/api/connect/connectposts/';
        
        // Optionally append user_id filter if needed, though usually posts are global
        if (user_id) {
            url += `?user_id=${user_id}`;
        }

        try {
            const response = await apiService.get(url);
            setConnectPosts(response.data || response); 
            console.log("Posts refreshed via callback trigger.");
        } catch (error) {
            console.error("Failed to fetch connect posts:", error);
            setConnectPosts([]);
        } finally {
            setIsLoading(false);
        }
    }, [user_id]); // Dependency on user_id allows filtering changes to trigger a fetch

    
    // 2. Define the public handler function to be passed to children (the refresh trigger)
    const handlePostCreated = useCallback(() => {
        // This function forces a re-fetch of the post list.
        getConnectPosts();
        console.log("New post creation detected. Refreshing list...");
    }, [getConnectPosts]);


    // 3. Initial fetch (using the memoized function and correct dependencies)
    useEffect(() => {
        getConnectPosts();
        
        // ❌ REMOVED: Polling logic (setInterval and clearInterval cleanup) ❌
    }, [getConnectPosts]); // Dependency: getConnectPosts (which changes only if user_id changes)

    
    return (
        <div className='scroll grid grid-flow-row place-items-center gap-4'> 
        
        {/* ADD POST BUTTON - Pass the refresh handler here */}
        <div className='w-full flex justify-center p-4'>
            <CreateConnectPostButton onPostCreated={handlePostCreated} />
        </div>
        
        
        {isLoading ? (
            <p className='p-6 text-gray-500'>Loading posts...</p>
        ) : connectPosts.length > 0 ? (
            connectPosts.map((connectpost) => (
                <div key={connectpost.id} className="w-full">
                    <ConnectPostItem connectpost={connectpost}/>
                </div>
            ))
        ) : (
            // A message or component to display when no connectPosts are found
            <p className='p-6 text-gray-500'>No connect posts found yet. Be the first to post!</p>
        )}

        </div>
    );
};

export default ConnectPosts;