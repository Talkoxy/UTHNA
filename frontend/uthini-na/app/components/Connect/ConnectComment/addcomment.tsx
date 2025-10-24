'use client'
import { useState, useCallback } from "react";
import apiService from "@/app/services/apiService";
import Custombtn from "../../Buttons/custombutton";

interface AddCommentProps {
    postId: string;
    onCommentCreated: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, onCommentCreated }) => {

    const [connectText, setConnectText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const autoGrowTextArea = useCallback((element: HTMLTextAreaElement) => {
                element.style.height = 'auto';
                element.style.height = `${element.scrollHeight}px`;
            }, []);

    const handleSubmit = async () => {
        

        if (!connectText) {
            setErrors(['text is required to create a comment.']);
            setIsError(true);
            return;
        }

        setIsSubmitting(true);

        const payload = {
            text: connectText,
            // The API requires the post ID to be sent under the 'connect' field
            connect: postId,
        };

        try {
            // NOTE: Change the URL if your API path is different
            const response: unknown = await apiService.post('/api/connect/createcomment/', payload);

            if (typeof response === 'object' && response !== null) {
                const serverResponse = response as { success?: boolean; id?: string; errors?: Record<string, unknown> };

                if (serverResponse.success || serverResponse.id) { 
                    

                    setSuccess(['Post created successfully!']);
                    setIsSuccess(true);
                    
                    // Clear inputs after success
                    setConnectText('');

                    setTimeout(() => {
                        setIsSuccess(false);
                        setSuccess([]);
                        // Close after success
                    }, 2500); 
                }
                else {
                    // Handle API server-side errors
                    const responseErrors = serverResponse.errors || serverResponse;
                    // Use `unknown` type for safety when mapping server errors
                    const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: unknown) => {
                        return Array.isArray(error) ? String(error[0]) : String(error);
                    });

                    setErrors(tmpErrors.length > 0 ? tmpErrors : ["Post failed due to a server error."]);
                    setIsError(true);
                }
            }else {
                 setErrors(["Post failed: Invalid server response format."]);
                 setIsError(true);
            }
            // 1. Clear the text area
            
        } catch (error) {
            console.error("Failed to create comment:", error);
            

            let errorMessages = ["An unexpected network error occurred."];

             if (error instanceof Error) {
                 errorMessages = [error.message];
        } else {
                // Handle non-Error network failures (e.g., from apiService)
                errorMessages = ["An unexpected error occurred. Check your network connection."];
            }

            setErrors(errorMessages);
            setIsError(true);
        };
    };

    return (
        <>
            <div>
                <textarea
                    className="comment-textarea "
                    placeholder="Add a comment ..."
                    id="originalText"
                    value={connectText}
                    onChange={(e) => {
                        setConnectText(e.target.value);
                        // Auto-grow function is safe to call here
                        if (e.target) autoGrowTextArea(e.target);
                    }}
                    
                    />


            </div>
            <div>
                <Custombtn label={isSubmitting ? 'Submitting...' : 'Add Comment'} onClick={handleSubmit}/>
            </div>

            <div>
                {isSuccess && 
                    <div className="success-message p-3 bg-green-100 text-green-700 rounded-md mt-4">
                        {success.map((msg, index) => (
                            <div key={`success_${index}`}>{msg}</div>
                        ))}
                    </div>
                }
            </div>

            {/* FIX: Using isError for consistency and to eliminate the warning */}
            {isError && errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md mt-4">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}
            
            
        </>
    )
}

export default AddComment;