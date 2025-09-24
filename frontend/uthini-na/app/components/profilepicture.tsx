// components/ProfilePicture.tsx
"use client"
import Image from 'next/image';

interface ProfilePictureProps {
    imageUrl: string | null;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ imageUrl }) => {
    // Define a fallback URL for when the image is not available.
    const fallbackSrc = '/images/avatar.svg';
    const src = imageUrl || fallbackSrc;

    return (
        <Image
            src={src}
            width={40}
            height={40}
            alt='User profile photo'
        />
    );
};

export default ProfilePicture;