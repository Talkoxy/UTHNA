"use client"
import apiService from "@/app/services/apiService";
import { useEffect, useState,ChangeEvent, useCallback } from "react";
import Custombtn from "../../Buttons/custombutton";


const Connected = () => {

    const [connectText, setConnectText] = useState('');
    const [connectTone, setConnectTone] = useState('');
    const [connectUsage, setConnectUsage] = useState('');
    const [connectLanguage, setConnectLanguage] = useState('');
    const [connectMeaning, setConnectMeaning] = useState('');

    
    const autoGrowTextArea = useCallback((element: HTMLTextAreaElement) => {
            element.style.height = 'auto';
            element.style.height = `${element.scrollHeight}px`;
        }, []);
    

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);


    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    
    
    const submitConnectPost = async () => {
        setErrors([]); // Clear previous errors
        setIsError(false);

        // 1. Client-side validation
        if (!connectTone || !connectLanguage || !connectMeaning ||!connectUsage) {
            setErrors(['All details are required to create a post.']);
            setIsError(true);
            return; // Exit if validation fails
        }

        
        const payload = {
            text: connectText,
            tone: connectTone,
            usage: connectUsage,
            language: connectLanguage,
            meaning: connectMeaning
        }
               
        try {
            
            const response = await apiService.post('/api/connect/createpost/', payload);
            
            
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

                setErrors(tmpErrors.length > 0 ? tmpErrors : ["Post failed due to a server error. "]);
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

    return(
        <main className="grid gap-4 grid-flow-row place-items-center pt-10 gap-4">
            <div className="grid place-items-center connect-card-heading ">
                    <h1>Connect & Learn Together</h1>
                    <p>Share slang words and help others learn your language</p>
                </div>
            <div className="grid gap-4 connect-card ">

                <div className="grid connect-inputs gap-4">

                    <div className="grid gap-2">
                        <h2>Word/Phrase</h2>
                        <input 
                        className=""
                        value={connectText}
                        onChange={(e) => setConnectText(e.target.value)}
                        placeholder="what is the word/phrase you want to share"
                        />
                    </div>

                    
                    

                    <div className="grid gap-2">
                        <h2>Language</h2>
                        <input 
                        className=""
                        value={connectLanguage}
                        onChange={(e) => setConnectLanguage(e.target.value)}
                        placeholder="what language is this?"
                        />

                    </div>

                    <div className="grid gap-2">
                        <h2>Meaning</h2>
                        <input 
                        className=""
                        value={connectMeaning}
                        onChange={(e) => setConnectMeaning(e.target.value)}
                        placeholder="what does it mean"
                        />
                    </div>
                    
                    
                    <div className="grid gap-2">
                        <h2>Example</h2>
                        <textarea
                        placeholder="how would you use it in a sentence"
                        onChange={(e) => {
                                    setConnectUsage (e.target.value);
                                    autoGrowTextArea(e.target);
                                }}
                        value={connectUsage}
                    
                    />

                    <div className="grid gap-2">
                        <h2>Tone</h2>
                        <select
                        className="dropmenu"
                        value={connectTone}
                        onChange={(e) => setConnectTone(e.target.value)}
                        
                        >
                        <option value="">In what setting is it used?</option>

                        <option value="Slang">Slang</option>
                        <option value="Formal">Formal</option>
                        <option value="Formal">Both</option>
                        </select>
                    </div>
                    </div>

                    
                </div>

               <div>
                  
                  <Custombtn label='Share with Community' onClick={submitConnectPost} />

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
        </main>
       );
}
export default Connected;