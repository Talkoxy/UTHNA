"use client"
import Link from 'next/link';
import { getUserId } from "@/app/lib/actions";
import { useState,useEffect } from 'react';
import ProfileDropdown from '../../Dropdown/ProfileDropdown';

const ToProfileButton = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch the userId
    const fetchUserId = async () => {
        try {
            const id = await getUserId();
            setUserId(id);
        } catch (error) {
            console.error("Error fetching user ID:", error);
            setUserId(null); // Ensure state is null on error
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchUserId();
    }, [userId]);

    // Show a loading state or nothing while the ID is being fetched
    if (isLoading) {
        return <div className="button">Loading...</div>;
    }
    
    // If userId is found, link to the profile page
   if (userId) {
        return (
                <div className="button">
                    <ProfileDropdown userId={userId} /> 
                </div>
        );
    }

    return (
        <Link href="/login">
            <div className="btn-nav">Login</div>
        </Link>
    );
};

export default ToProfileButton;