"use client"

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import SavedTranslations from "../Translations/savedtranslations/savedtranslations";
import LikedTranslations from "../Translations/likedtranslations/likedtranslations";
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

    // --- JSX Render ---
    
    return (
        <main className="grid grid-flow-col">

            <div className="grid grid-flow-col gap-2 justify-items-center pt-30">

                <div className="grid grid-flow-rows place-items-center gap-10 ">
                    
                    {/* Username Display and Edit Logic */}
                    <div className="label">
                        
                        {isEditing ? (
                            // Edit Form
                            <form onSubmit={handleUpdateUsername} className="flex flex-col items-center">
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    disabled={isLoading}
                                    className="" 
                                />
                                <div className="mt-2 flex gap-2">
                                    <button type="submit" disabled={isLoading} className="button-small">
                                        {isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                    <button type="button" onClick={() => { setIsEditing(false); setNewUsername(username); }} className="button-small-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Display Mode
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{username}</span>
                                
                                {/* Assuming the profile ID must match the logged-in user ID to edit */}
                                {userId === user.username && ( 
                                    <button onClick={() => setIsEditing(true)} className="button-icon">
                                        ✏️ 
                                    </button>
                                )}
                            </div>
                        )}
                        
                    </div>
                    
                    {/* --- FEEDBACK MESSAGE PLACEMENT --- */}
                    {isSuccess && 
                        <div className="success-message p-3 bg-green-100 text-green-700 rounded-md">
                            {success.map((msg, index) => (
                                <div key={`success_${index}`}>{msg}</div>
                            ))}
                        </div>
                    }
                    
                    {isError && (
                        <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                            {errors.map((error, index) => (
                                <div key={`error_${index}`}>{error}</div>
                            ))}
                        </div>
                    )}
                    {/* --- END FEEDBACK MESSAGE PLACEMENT --- */}


                    <div className='p-4 '>
                        <Avatar user_id={userId}/>
                    </div>
                    
                    <div> <TranslationInsights userId={userId} /> </div>

                </div>

                <div className="grid grid-flow-row place-items-center pt-25">

                    <div className="grid place-items-center">
                        <div className="label">MY SAVED TRANSLATIONS</div>
                        <div className="scroll-translation" ><SavedTranslations user_id={userId} /></div>
                    </div>

                    <div className="grid place-items-center">
                        <div className="label">MY LIKED TRANSLATIONS</div>
                        <div className="scroll-translation"><LikedTranslations user_id={userId} /></div>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default ClientDetails;