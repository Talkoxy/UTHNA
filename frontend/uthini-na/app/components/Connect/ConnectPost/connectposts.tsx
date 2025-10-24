'use client'

import { useEffect, useState, useCallback } from 'react';
import apiService from '@/app/services/apiService';
import ConnectPostItem from './connectpostitem';
import CreateConnectPostButton from '../../Buttons/connect/addConnectPostbutton';


export type ConnectPostsType= {

    id: string; 
    title: string;
    text: string;
    created_at: string;

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
    const [isLoading, setIsLoading] = useState(true);

    
    const getConnectPosts = useCallback(async() => {
        setIsLoading(true);
   
        let url = '/api/connect/connectposts/';
        

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
        
    }, [getConnectPosts]); 

    
    return (
        <div className='grid grid-cols-1 place-items-center  gap-4'>

            <div className='grid '>
                <CreateConnectPostButton onPostCreated={handlePostCreated} />
            </div>
            
            <div className='grid scroll '>
                    {isLoading ? (
                    <p className='p-6 text-gray-500'>Loading posts...</p>
                ) : connectPosts.length > 0 ? (
                    connectPosts.map((connectpost) => (
                        <div key={connectpost.id} className="">
                            <ConnectPostItem connectpost={connectpost}/>
                        </div>
                    ))
                ) : (
                    // A message or component to display when no connectPosts are found
                    <p className='p-6 text-gray-500'>No connect posts found yet. Log in to post!</p>
                )}

            </div>
        

        </div>
    );
};

export default ConnectPosts;