'use client'

import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import ConnectPostItem from './connectpostitem';
import { ClientSettingsType } from '../../ClientSettings/clientsettings';

export type ConnectPostsType= {
// connectPosts fields here
    id: string; 
    title: string;
    text: string;
    created_at: string;

    author: {
        id :string;
        email :string;
        username: string;
        // NEW: Added author picture field from the UserSerializer
        user_avatar: string ; 
    }
    
}


interface ConnectPostsProps {
    user_id?: string | null;

}
const ConnectPosts: React.FC<ConnectPostsProps> = ({ user_id }) => {
    const[connectPosts, setConnectPosts] = useState<ConnectPostsType[]>([]);
    const[settings, setSettings] = useState<ClientSettingsType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getConnectPosts = async() => {
        setIsLoading(true);
        let url = '/api/connect/connectposts/';

        try {
            const tmpconnectPosts = await apiService.get(url);
            // Ensure we handle the possibility that the data is nested or directly the list
            setConnectPosts(tmpconnectPosts.data || tmpconnectPosts); 
        } catch (error) {
            console.error("Failed to fetch connect posts:", error);
            setConnectPosts([]);
        } finally {
            setIsLoading(false);
        }
    };


     useEffect(() => {
        // 1. Fetch posts immediately upon component mount
        getConnectPosts();
        console.log("New post creation detected. Refreshing list...");
    }, [getConnectPosts]);


    // 3. Initial fetch (using the memoized function and correct dependencies)
    useEffect(() => {
        getConnectPosts();
    

    }, []);

    return (
        <div className='scroll grid grid-flow-row place-items-center'> 
        {isLoading ? (
            <p className='p-6 text-gray-500'>Loading posts...</p>
        ) : connectPosts.length > 0 ? (
            connectPosts.map((connectpost) => (
                <div key={connectpost.id}>
                    <ConnectPostItem connectpost={connectpost}/>
                </div>
            ))
        ) : (
            // A message or component to display when no connectPosts are found
            <p className='p-6 text-gray-500'>No connect posts found yet.</p>
        )}

        </div>
    );
};

export default ConnectPosts;
