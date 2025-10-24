'use client'
import { ConnectPostsType } from './connectposts';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import apiService from '@/app/services/apiService';
import { AvatarType } from '../../Avatar/avatar';


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

    // REMOVED: const [author, setAuthor] = useState(connectpost.author.id) - Use prop directly

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
    

    // Wrapped in useCallback for dependency stability
    const getAvatar = useCallback(async (authorId: string) => {
        try {
            const response = await apiService.get(`/api/avatar/get?user_id=${authorId}`);
            if (response && response.data && response.data.length > 0) {
                setAvatar(response.data[0]); 
            }
        } catch (error) {
            console.error("Error fetching user avatar:", error);
        }
    }, []); // Empty dependency array means this function is stable

    useEffect(() => {
        const authorId = connectpost.author.id;
        
        // Call the stable function with the ID from props
        if (authorId) {
            getAvatar(authorId);
        }
    // Dependency array uses the post ID and the stable getAvatar function
    }, [connectpost.author.id, getAvatar]); 
 
    
    // Use a default avatar image if the URL is missing
    const defaultAvatar = '/avatar.png'; 

    return (
        <div className='grid grid-cols-1 place-items-center p-6'> 
        {/* The main post container */}
        <div className='grid connect-post'> 
            {/* Top row for user info and post content */}
            <div className='grid grid-flow-row place-items-center'>
                {/* 1. USER INFO - Column 1 */}
                <div className='place-items-center gap-2 userInfo'>
                    <div>
                        {avatar.image_url ? ( // Check if avatar URL is present
                            <Image
                                src={avatar.image_url}
                                height={50}
                                width={50}
                                alt={`Avatar for ${connectpost.author.username}`}
                                
                            />
                        ) : (
                            // Display fallback image if avatar URL is missing
                            <Image
                                src={defaultAvatar} 
                                height={50}
                                width={50}
                                alt="Default Avatar"
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
                <div className='grid place-items-center postContent'>
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
            
        </div>
    </div>

    )
}

export default ConnectPostItem;
