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
    }, []);

    // Show a loading state or nothing while the ID is being fetched
    if (isLoading) {
        return <div className="button">Loading...</div>;
    }
    
    // If userId is found, link to the profile page
   return (
        // Check the condition: If userId exists (truthy)
        userId ? (
            // If TRUE: Render the ProfileDropdown
            <div className="button">
                <ProfileDropdown userId={userId} /> 
            </div>
        ) : (
            // If FALSE (userId is null/undefined): Render the Login Link
            <Link href="/login">
                <div className="btn-nav">Login</div>
            </Link>
        )
    );
};

export default ToProfileButton;