'use client'

import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import ConnectPostItem from './connectpostitem';



export type ConnectPostsType= {
// connectPosts fields here
    id: string; 
    title: string;
    text: string;
    image: string;
}

interface ConnectPostsProps {
    user_id?: string | null;
}
const ConnectPosts: React.FC<ConnectPostsProps> = ({ user_id }) => {
    const[connectPosts, setConnectPosts] = useState<ConnectPostsType[]>([]);

    const getConnectPosts = async() => {
        let url = '/api/connect/connectposts/';

        const tmpconnectPosts = await apiService.get(url);
        setConnectPosts(tmpconnectPosts.data);
    }


    useEffect(() => {
        getConnectPosts();
    }, []);

    return (
        <div className='grid grid-flow-row gap-4 place-items-center'> 
        {connectPosts.length > 0 ? (
            connectPosts.map((connectpost) => (
                <div key={connectpost.id}>
                    <ConnectPostItem connectpost={connectpost}/>
                </div>
            ))
        ) : (
            // A message or component to display when no connectPosts are found
            <p>No connectPosts found for this user.</p>
        )}

        </div>
    );
};

export default ConnectPosts;