"use client"
import apiService from "@/app/services/apiService";
import { useState,ChangeEvent } from "react";
import Modal from "./Modal";
import Custombtn from "../Buttons/custombutton";
import Image from "next/image";
import useCreateAvatarModal from "../Hooks/useCreateAvatarModal";


const CreateAvatarModal = () => {

    const createAvatarModal = useCreateAvatarModal()
    
    const [dataImage, setDataImage] = useState<File | null>(null);

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    };

    const submitForm = async ()=>{
        if(
            dataImage
        ){
            // Reset previous status messages
            setIsError(false);
            setIsSuccess(false);
            setErrors([]);
            setSuccess([]);

            const formData = new FormData();

            formData.append('image', dataImage)

            try{
                // apiService.postset might return any structure, but we assume it contains
                // 'success', 'id', or 'errors' properties upon resolution.
                const response: unknown = await apiService.postset('/api/avatar/create/', formData);

                // Type guard to check if the response is an object and can be treated as a server response
                if (typeof response === 'object' && response !== null) {
                    const serverResponse = response as { success?: boolean; id?: string; errors?: Record<string, unknown> };

                    if (serverResponse.success || serverResponse.id) { 
                        
                        setSuccess(['Post created successfully!']);
                        setIsSuccess(true);
                        
                        setTimeout(() => {
                            setIsSuccess(false);
                            setSuccess([]);
                            createAvatarModal.close(); // Optionally close modal on success
                        }, 2500);
                    } 
                    else {
                        // Handle server-side validation or failure without a 'success' flag
                        const responseErrors = serverResponse.errors || serverResponse;
                        
                        // Safely extract and flatten error messages from the object values
                        const tmpErrors: string[] = Object.values(responseErrors).flat().map((errorValue: unknown) => {
                            // Ensure the value is a string or cast the first element if it's an array
                            if (Array.isArray(errorValue)) {
                                return String(errorValue[0]);
                            }
                            return String(errorValue);
                        });

                        setErrors(tmpErrors.length > 0 ? tmpErrors : ["Post failed due to a server error."]);
                        setIsError(true);
                    }
                } else {
                    setErrors(["Post failed: Invalid server response format."]);
                    setIsError(true);
                }

            }catch(error: unknown){

                console.error("Error creating avatar:", error);
            
                let errorMessages = ["An unexpected error occurred are you still logged in ?."];

                if (error instanceof Error) {
                    errorMessages = [error.message];
                } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                    // Handle custom error objects returned by apiService if they contain an 'errors' property
                    const customError = error as { errors: Record<string, unknown> };
                    errorMessages = Object.values(customError.errors).flat().map((e: unknown) => String(e));
                }

                setErrors(errorMessages);
                setIsError(true);
            }
        }

    };
    
    const content =(
        <>
            <div className="grid gap-10 place-items-center p-4">
                <div className="grid image-upload">
        <input 
            type="file" 
            accept="image/*" 
            onChange={setImage} 
            placeholder="Click to upload your Avatar" 
            id="avatar-upload-input" // <--- 1. ADDED ID HERE
            hidden
        />
        {/* 2. ADDED LABEL HERE */}
        <label htmlFor="avatar-upload-input">
            Click to Upload Avatar
        </label>
    </div>
                {dataImage && (
                    <div className=" w-[200px] h-[150px] relative">
                            <Image 
                                fill
                                alt="Uploaded project cover art"
                                src={URL.createObjectURL(dataImage)}
                                className="ip-2 w-full h-full object-cover rounded-xl"
                            />
                    </div>
                )}
                <div>

                    <Custombtn label='Save-Avatar' onClick={submitForm}/>
                </div>


            </div>

            {/* 👇 Use isError to control visibility */}
            {isError && errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md mt-4">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}

            {isSuccess && 
                    <div className="success-message p-3 bg-green-100 text-green-700 rounded-md mt-4">
                        {success.map((msg, index) => (
                            <div key={`success_${index}`}>{msg}</div>
                        ))}
                    </div>
                }
        </>
    );
    


    return (
        <Modal
            isOpen={createAvatarModal.isOpen}
            close={createAvatarModal.close}
            label="Create New Avatar" // Changed modal title to be more specific
            content={content}
        />
    )
}

export default CreateAvatarModal;
