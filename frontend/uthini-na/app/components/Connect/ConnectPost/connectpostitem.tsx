'use client'
import { ConnectPostsType } from './connectposts';
import Image from 'next/image';


interface ConnectPostsItemProps {
    connectpost: ConnectPostsType;
}

const ConnectPostItem: React.FC<ConnectPostsItemProps> = 
({connectpost}) => {

    // Safely destructure author data: 
    // Uses '|| {}' to default to an empty object if connectpost.author is null/undefined.
    // Provides a fallback string 'Unknown User' for the username.
    const { username = 'Unknown User', author_picture_url } = connectpost.author || {};
    const postImageUrl = connectpost.image_url;

    // Use a default avatar image if the URL is missing
    const defaultAvatar = '/images/default_avatar.png'; 

    return (
        <div className='w-full max-w-xl shadow-lg rounded-xl bg-white transition hover:shadow-xl'>
            <div className='grid grid-flow-row gap-4 p-4'>
                
                {/* 1. AUTHOR INFO BAR (Top) */}
                <div className="flex items-center gap-3 border-b pb-3 mb-2 w-full">
                    {/* Author Picture/Avatar */}
                    <div className='relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
                        <Image
                            src={author_picture_url || defaultAvatar}
                            alt={`${username}'s profile picture`}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-full"
                        />
                    </div>
                    {/* Username */}
                    <div className='font-semibold text-lg text-gray-800'>
                        @{username} 
                    </div>
                </div>

                {/* 2. POST MAIN IMAGE (If it exists) */}
                {postImageUrl && (
                    <div className='relative w-full h-80 overflow-hidden rounded-lg'>
                        <Image
                            // Corrected field name: using image_url from the serializer
                            src={postImageUrl} 
                            alt={connectpost.title || 'Connect Post Image'}
                            fill
                            style={{ objectFit: 'cover' }}
                            className='w-full h-auto'
                        />
                    </div>
                )}
                
                {/* 3. POST TEXT CONTENT */}
                <div className='grid gap-1 pt-2 w-full'>
                    <div className='font-bold text-xl text-gray-900'>
                        {connectpost.title} 
                    </div>
                    <div className='text-gray-600 leading-snug'> 
                        {connectpost.text}
                    </div>    
                </div>
                    
            </div>
        </div>
    )
}

export default ConnectPostItem;
