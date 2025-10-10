"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState,ChangeEvent, useCallback } from "react";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";
import useCreateConnectPostModal from "../Hooks/useCreateConnectPostModal";
// Removed unused 'Image' import
// import Image from "next/image";


const CreateConnectPostModal = () => {

    const createConnectPostModal = useCreateConnectPostModal()
    
    const [connectTitle, setConnectTitle] = useState('');
    const [connectText, setConnectText] = useState('');
    
    const autoGrowTextArea = useCallback((element: HTMLTextAreaElement) => {
            element.style.height = 'auto';
            element.style.height = `${element.scrollHeight}px`;
        }, []);
    

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
     useEffect(() => {
        if (!createConnectPostModal.isOpen) {
            // Reset state when modal is closed
            setConnectTitle('');
            setConnectText('');
            setErrors([]); // Also clear errors on close
            setSuccess([]); // Also clear success on close
            setIsError(false);
            setIsSuccess(false);
        }
        }, [createConnectPostModal.isOpen]);
    
    
    const submitConnectPost = async () => {
        setErrors([]); // Clear previous errors
        setIsError(false);

        // 1. Client-side validation
        if (!connectTitle || !connectText) {
            setErrors(['A title and text are required to create a post.']);
            setIsError(true);
            return; // Exit if validation fails
        }

        
        const payload = {
            title: connectTitle,
            text: connectText,
        }
               
        try {
            
            const response = await apiService.post('/api/connect/createpost/', payload);
            
            
            if (response && (response.success || response.id)) { 
                
                setSuccess(['Post created successfully!']);
                setIsSuccess(true);
                
                setTimeout(() => {
                    setIsSuccess(false);
                    setSuccess([]);
                    createConnectPostModal.close();
                }, 2500); // 2.5 seconds delay allows the user to see the success message
            } 
            
            
            else {
                // Assuming server errors are returned directly in the response object
                const responseErrors = response.errors || response;
                const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: any) => {
                     // Attempt to show field name with error
                    return Array.isArray(error) ? error[0] : String(error);
                });

                setErrors(tmpErrors.length > 0 ? tmpErrors : ["Post failed due to a server error."]);
                setIsError(true);
            }


        } catch (error: any) {
            // 6. Network/API Service Errors
            console.error("Error submitting Connect Post:", error);
            
            let errorMessages = ["An unexpected network error occurred."];

             if (error.message) {
                 errorMessages = [error.message];
            } else if (error.errors) {
                 // If the error object contains nested server validation errors
                errorMessages = Object.values(error.errors).flat().map((e: any) => String(e));
            }

            setErrors(errorMessages);
            setIsError(true);
        }
    };


    // The content rendering remains largely the same...
    const content = (
        <>
            <div className="grid gap-4 modal-card">

                <div className="grid gap-2">
                    <input 
                    className=""
                    value={connectTitle}
                    onChange={(e) => setConnectTitle(e.target.value)}
                    placeholder="Title"
                    />

                    <textarea
                    className="post-textarea"
                    placeholder="Type your post"
                    id="originalText"
                    value={connectText}
                    onChange={(e) => {
                        setConnectText(e.target.value);
                        autoGrowTextArea(e.target);
                    }}
                    />
                </div>

               <div>
                  
                  <Custombtn label='Post to Connect' onClick={submitConnectPost} />

               </div>
                

                {isSuccess && 
                    <div className="success-message p-3 bg-green-100 text-green-700 rounded-md">
                        {success.map((msg, index) => (
                            <div key={`success_${index}`}>{msg}</div>
                        ))}
                    </div>
                }
            </div>

            {errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}
        </>
    )
        


    return (
        <Modal
            isOpen={createConnectPostModal.isOpen}
            close={createConnectPostModal.close}
            label="Create New Connect Post"
            content={content}
        />
    )
}

export default CreateConnectPostModal;