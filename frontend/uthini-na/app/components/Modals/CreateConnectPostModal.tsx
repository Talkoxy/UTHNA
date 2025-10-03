"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState,ChangeEvent, useCallback } from "react";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";
import useCreateConnectPostModal from "../Hooks/useCreateConnectPostModal";
import Image from "next/image";


const CreateConnectPostModal = () => {

    const createConnectPostModal = useCreateConnectPostModal()

    
    const [connectTitle, setConnectTitle] = useState('');
    const [connectText, setConnectText] = useState('');
    const [connectImage, setConnectImage] = useState <File | null>(null);
    
    const autoGrowTextArea = useCallback((element: HTMLTextAreaElement) => {
            element.style.height = 'auto';
            element.style.height = `${element.scrollHeight}px`;
        }, []);
    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setConnectImage(tmpImage);
        }
    }

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
     useEffect(() => {
        if (!createConnectPostModal.isOpen) {

            setConnectTitle('');
            setConnectText('');
            setConnectImage(null);    

            
            }else {
                setErrors([]);
            }

        }, [createConnectPostModal.isOpen]);
    
    // Reset state when modal is closed
    const submitConnectPost = async () => {
        // Client-side validation to ensure all fields are present
        if (
            connectTitle &&
            connectText &&
            connectImage
        ) {
            try {
                // ⭐️ START OF FIX: Use FormData for file upload ⭐️
                const formData = new FormData();
                
                formData.append('title', connectTitle);
                formData.append('text', connectText);
                formData.append('image', connectImage);
                
                

                
                const response = await apiService.postset('/api/connect/createpost/', formData);
                // ⭐️ END OF FIX ⭐️

                if (response.status && response.status >= 200 && response.status < 300) { // Assuming apiService returns status or throws for bad requests
                    setErrors([]);
                    setIsError(false);
                    setSuccess(['Settings submitted successfully']);
                    setIsSuccess(true);

                    setTimeout(() => {
                        setIsSuccess(false);
                        setSuccess([]);
                        createConnectPostModal.close();
                    }, 2000); 
                } else {
                     // This block may be hit if apiService doesn't throw on error, but returns a failure object.
                     // The logic here needs to correctly parse the error response structure.
                     // Assuming errors are inside 'response.errors' or are the response itself.
                     const responseErrors = response.errors || response;
                     
                     // Flatten error values from the server response
                     const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: any) => {
                         // Only display the last error in case of multiple for simplicity
                         return Array.isArray(error) ? error[0] : error;
                     }).filter(msg => typeof msg === 'string');


                     setErrors(tmpErrors);
                     setIsError(true); 
                }


            } catch (error: any) {
                console.error("Error submitting Settings:", error);
                // Catch network errors or errors thrown by apiService.post (e.g., for 400 status)
                let errorMessages: string[] = ["An error occurred while submitting the Settings."];

                // Check for the custom error structure thrown by apiService
                if (error.errors) {
                    // Pull error messages from the custom error object
                    errorMessages = Object.values(error.errors).flat().map((e: any) => String(e)).filter(msg => msg.length > 0);
                } else if (error.message) {
                    errorMessages = [error.message];
                }
                
                setErrors(errorMessages);
                setIsError(true); 
            }

        } else {
            // Client-side validation failure
            const tmpErrors: string[] = [];
            // ... (Your existing client-side error checks) ...
            if (!connectTitle) {
                tmpErrors.push('Please enter your preferred target language of Translation');
            }
            if (!connectImage) {
                tmpErrors.push('Profile visibility is required');
            }
            if (!connectText) {
                tmpErrors.push('Subscription status is required');
            }

            setErrors(tmpErrors);
            setIsError(true); // Set isError to true to ensure the error block renders
        }

    };

        const content = (
        <>
            <div className="grid gap-4 modal-card">

                <div className="grid gap-2">
                    <input 
                    value={connectTitle}
                    onChange={(e) => setConnectTitle(e.target.value)}
                    placeholder="Title"
                    />

                    <textarea
                    className="translation-textarea"
                    placeholder="Type your post"
                    id="originalText"
                    value={connectText}
                    onChange={(e) => {
                        setConnectText(e.target.value);
                        autoGrowTextArea(e.target);
                    }}
                    />
                </div>

                <div className="grid gap-2">
                    <input type="file" accept="image/*" onChange={setImage}/>
                    <div className=" w-[200px] h-[150px] relative">
                    <Image 
                        fill
                        alt="Uploaded project cover art"
                        src={connectImage ? URL.createObjectURL(connectImage): '/avatar.png'}
                        className=" p-2 w-full h-full object-cover rounded-xl"
                    />
                </div>
                
                             
                
            </div>
                <Custombtn label='Post to Connect' onClick={submitConnectPost} />

                {isSuccess && 
                    <div className="success-message">
                        {success.map((msg, index) => (
                            <div key={`success_${index}`} className="success-message">
                                {msg}
                            </div>
                        ))}
                    </div>
                }
            </div>

            {errors.length > 0 && (
                <div className="grid gap-2">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`} className="error-message">
                            {error}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
        


    return (
        <Modal
            isOpen={createConnectPostModal.isOpen}
            close={createConnectPostModal.close}
            label="Finish Setting up your Profile"
            content={content}
        />
    )
}

export default CreateConnectPostModal;