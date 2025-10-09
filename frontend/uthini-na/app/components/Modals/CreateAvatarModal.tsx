"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState,ChangeEvent, useCallback } from "react";
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
            const formData = new FormData();

            formData.append('image', dataImage)

            try{
                const response = await apiService.postset('/api/avatar/create/', formData);

                    if (response && (response.success || response.id)) { 
                    
                    setSuccess(['Post created successfully!']);
                    setIsSuccess(true);
                    
                    setTimeout(() => {
                        setIsSuccess(false);
                        setSuccess([]);
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

            }catch(error:any){

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
        }

    };
    
    const content =(
        <>
            <div className="grid">
                <div className="grid card">
                    <input type="file" accept="image/*" onChange={setImage}/>
                </div>
                {dataImage && (
                    <div className=" w-[200px] h-[150px] relative">
                            <Image 
                                fill
                                alt="Uploaded project cover art"
                                src={URL.createObjectURL(dataImage)}
                                className=" p-2 w-full h-full object-cover rounded-xl"
                            />
                    </div>
                )}
                <div>

                    <Custombtn label='Save-Avatar' onClick={submitForm}/>
                </div>


            </div>

            {errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}

            {isSuccess && 
                    <div className="success-message p-3 bg-green-100 text-green-700 rounded-md">
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
            label="Create New Connect Post"
            content={content}
        />
    )
}

export default CreateAvatarModal;