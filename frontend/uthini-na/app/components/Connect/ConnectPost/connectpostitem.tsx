'use client'
import { ConnectPostsType } from './connectposts';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react'; 
import apiService from '@/app/services/apiService';
import { AvatarType } from '../../Avatar/avatar';
import { CommentIcon } from '../../icons';
import ConnectComments from '../ConnectComment/connectcomments';
import { connect } from 'http2';


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
        <main className='grid grid-flow-row place-items-center connect-post'>

            <div className='grid place-items-center connect-post-content'>
                <div className='grid'>
                    <div className='grid  grid-flow-col place-items-center connect-post-header'>
                        <div className='grid grid-flow-col gap-2 place-items-center '>
                            {/* <div>
                                {avatar.image_url ? ( // Check if avatar URL is present
                                <Image
                                    src={avatar.image_url}
                                    height={45}
                                    width={45}
                                    alt={`Avatar for ${connectpost.author.username}`}
                                    className='rounded-full'
                                    
                                />
                                ) : (
                                // Display fallback image if avatar URL is missing
                                <Image
                                    src={defaultAvatar} 
                                    height={45}
                                    width={45}
                                    alt="Default Avatar"
                                />
                                )}
                            </div> */}
                            

                            <div ><h2>{connectpost.author.username}</h2></div>
                        </div>

                        
                        <div>{formattedDate}</div>
                    </div>
                    

                    <div className='grid connect-post place-items-center grid-flow-col'>
                       

                        <div className='grid connect-post-meaning'>

                            <div className='grid grid-flow-col place-items-center gap-200'>
                                <h1>{connectpost.text}</h1>

                                <div className='grid place-items-center connect-post-language'>
                                    <h3>{connectpost.language}</h3>
                                </div>

                            </div>
                            <div className=''>
                            <h2>Meaning: {connectpost.meaning}</h2>
                            </div>
                            <div>
                            <h2>Example: {connectpost.usage} </h2> 
                            </div>
                        </div>

                        

                         

                    </div>

                        
                    

                </div>

                
                
                <div className='grid place-items-center connect-comment'>

                </div>
            </div>

            

        </main>
    )
}

export default ConnectPostItem;
