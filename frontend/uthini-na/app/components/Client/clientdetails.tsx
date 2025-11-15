"use client"

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import SavedTranslations from "../Translations/savedtranslations/savedtranslations";

import TranslationInsights from "../Insights/insights";


import Avatar from "../Avatar/avatar";

// Define a type for the component's state
type UserProfile = {
    username: string;
    email: string;
    image_url: string;
};

export type ClientDetailsProps = {
    user: UserProfile; 
    userId?: string | null;
};

const ClientDetails = ({ user, userId }: ClientDetailsProps) => {
    
    // State for the currently displayed username (starts from props)
    const [username, setUsername] = useState(user.username);
    // State for the username the user is currently typing
    const [newUsername, setNewUsername] = useState(user.username);
    
    // UI State
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ERROR/SUCCESS STATE
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    
    // --- Data Update Function ---
    
    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear previous feedback
        setErrors([]);
        setSuccess([]);
        setIsError(false);
        setIsSuccess(false);
        
        const trimmedNewUsername = newUsername.trim();

        // 1. Client-side validation
        if (trimmedNewUsername === username) {
            setIsEditing(false);
            return; // Exit if no change
        }

        if (trimmedNewUsername.length === 0) {
            setErrors(["Username cannot be empty."]);
            setIsError(true);
            return;
        }

        setIsLoading(true);
        
        try {
            
            const response = await apiService.put(`/api/auth/update_username/${userId}`, { 
                username: trimmedNewUsername 
            });

            // Assuming the apiService response has a 'success' boolean
            if (response && response.success) {
                
                // 2. REAL-TIME UPDATE
                setUsername(trimmedNewUsername); 
                
                // 3. Success Feedback
                setSuccess(["Username updated successfully! 🎉"]);
                setIsSuccess(true);
                setIsEditing(false); // Exit edit mode
                
                // Auto-hide success message
                setTimeout(() => {
                    setIsSuccess(false);
                    setSuccess([]);
                }, 3000); 
                
            } else {
                // 4. Server Validation/API Errors
                const responseErrors = response.errors || response;
                
                // ✅ FIX: Replaced (error: any) with (error: unknown)
                const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: unknown) => {
                    return String(error);
                });

                setErrors(tmpErrors.length > 0 ? tmpErrors : ["Update failed due to a server error."]);
                setIsError(true);
            }

        } catch (error) { // ✅ FIX: Using standard catch (error) instead of (error: any)
            // 5. Network/Unexpected Errors
            console.error("Username update failed:", error);
            
            let errorMessage = "A network or unexpected error occurred during update.";
            if (error instanceof Error) {
                // If it's a standard JS error, use its message
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            
            setErrors([errorMessage]);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to fetch settings (kept from previous version)
    const fetchUserSettings = async (userId: string) => {
        try {
            await apiService.get(`/api/settings/list?user_id=${userId}`);
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserSettings(userId);
        }
    }, [userId]);


    return (
        <main className="grid gap-4 grid-flow-row place-items-center pt-10 gap-4">
            <div className="grid  profile-heading pr-200">
                <h1 className="">My profile</h1>
                <p>{user.username}</p>
            </div>

            <div className="grid place-items-center profile gap-6">
                <div>
                    <div className="grid grid-flow-row place-items-center profile-translations p-4">
                        <h2>Insights</h2>
                        <div>
                            <TranslationInsights userId={userId}/>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="grid place-items-center profile-translations ">
                            <h2 className="">Saved Translations</h2>
                            <div className="scroll-translation"><SavedTranslations user_id={userId} /></div>
                    </div>
                </div>
                <div>
                    <div className="grid place-items-center profile-announcements ">
                        <div>
                            <h2 className="">Announcement</h2>
                            <p> Uthini Na will use this space to Inform you on upcoming features and other important updates</p>

                        </div>
                            
                            <div className="scroll-translation"><SavedTranslations user_id={userId} /></div>
                    </div>
                </div>

            </div>
                
        </main>
    );
};

export default ClientDetails;