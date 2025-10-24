'use client'
import { ConnectPostsType } from './connectposts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import apiService from '@/app/services/apiService';
import { AvatarType } from '../../Avatar/avatar';
import { CommentIcon } from '../../icons';
import ConnectComments from '../ConnectComment/connectcomments';


interface ConnectPostsItemProps {
    connectpost: ConnectPostsType;
}

const ConnectPostItem: React.FC<ConnectPostsItemProps> = 
({connectpost}) => {

    const formatTimeAgo = (isoString: string): string => {
  const date = new Date(isoString);
  
  // Use a relative time formatter for a user-friendly display (e.g., "5 minutes ago")
  // Or, use a simple date formatter if you prefer:
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  // Using toLocaleString for a local/user-friendly time display
  return date.toLocaleString(undefined, options); 
}

    const [author,setAuthor] = useState(connectpost.author.id)
    const[avatar, setAvatar] = useState<AvatarType>({
            id: '',
            image_url: ''
        });
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const formattedDate = formatTimeAgo(connectpost.created_at);

    const [isOpen, setIsOpen] = useState(false);

    

    const handleToggleComments = () => {
        setIsCommentsOpen(prev => !prev);
    };
    

    const getAvatar = async (author: string) => {
        try {
            const response = await apiService.get(`/api/avatar/get?user_id=${author}`);
            if (response && response.data && response.data.length > 0) {
                setAvatar(response.data[0]); // Assuming the first setting is the relevant one
            }
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    };

    useEffect(() => {

        if (author) {
            getAvatar(author);
        }
    }, [author]);
 
    
    
    // Use a default avatar image if the URL is missing
    const defaultAvatar = '/avatar.png'; 

    return (
        <div className='grid place-items-center p-6'> 
        {/* The main post container */}
        <div className='grid connect-post'> 
            {/* Top row for user info and post content */}
            <div className='grid grid-flow-row place-items-center'>
                {/* 1. USER INFO - Column 1 */}
                <div className='place-items-center gap-2 userInfo'>
                    <div>
                        {avatar?.image_url && (
                            <Image
                                src={avatar.image_url} // You can now safely use the non-optional chain here
                                height={70}
                                width={70}
                                alt="User Avatar"
                            />
                        )}
                    </div>
                    <div className='username'>
                        {connectpost.author.username}
                    </div>
                    <div className='pl-30'>
                        <small className='text-gray-500 text-xs'>{formattedDate}</small>
                    </div>

                </div>

                {/* 2. POST CONTENT - Column 2 */}
                <div className='postContent'>
                    <div className='postTitle'>
                        {connectpost.title} 
                    </div>
                    <div className='postText'> 
                         {connectpost.text}
                    </div>
                    
                </div>

                <div className='post-interactions grid grid-flow-col place-items-center gap-4'>
                    
                </div>
            </div>
            <div className='place-items-center ml-80 post-actions grid grid-flow-col'>
                <div>
                    <CommentIcon/>
                </div>
                
            </div>
            <div className='line rounded'/>
                <div>
                    {isCommentsOpen && (
                        <div 
                            id={`comments-section-${connectpost.id}`}
                            className='p-4 comments-section'
                        >
                            
                            <p className='text-gray-500'>Comments section for post ID: {connectpost.id} (to be implemented)</p>
                            <div>
                                <ConnectComments postId={connectpost.id} />
                            </div>
                        </div>
                    )}
                </div>
            
        </div>
    </div>

    )
}

export default ConnectPostItem;
