'use client'
import Image from "next/image"
import Modal from "./Modal"
import useAddSettingsModal from "./Hooks/useAddSettingsModal"
import Custombtn from "../Buttons/custombutton"
import { ChangeEvent, useState } from "react"
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation"

const AddSettingsModal = () => {
    const addSettingsModal = useAddSettingsModal();


    const router = useRouter();

    const [errors, setErrors] = useState<string[]>([]);

    const [dataUserprefferedTargetLang , setUserprefferedTargetLang] = useState('');
    const [dataUserprefferedSourceLang , setUserprefferedSourceLang] = useState('');
    const [dataProfilePicture, setProfilePicture] = useState<File | null>(null);
    const [dataProfileVisibility, setProfileVisibilty] = useState('');

    const [currentStep, setCurrentStep] = useState(1);


    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0){
            const tmpImage = event.target.files[0];

            setProfilePicture(tmpImage)
        }
    }


    const sudmitForm = async () => {

        if(
            dataUserprefferedSourceLang &&
            dataUserprefferedTargetLang &&
            dataProfilePicture &&
            dataProfileVisibility
        ){

            const formData = new FormData()
            formData.append('user_preferred_source_language', dataUserprefferedSourceLang);
            formData.append('user_preferred_target_language', dataUserprefferedTargetLang);
            formData.append('profile_picture', dataProfilePicture);
            formData.append('profile_visibility', dataProfileVisibility);

            const response = await apiService.post('/api/settings/create/', formData)

            if(response.success){

                router.push('/translate?welcome=success')

                addSettingsModal.close()
            }else{
                console.log('Error');

                const tmpErrors : string[] = Object.values(response).map((error : any) => {
                    return error;
                })

                setErrors(tmpErrors)
            }
        }
    };

    const content = (
        <> 
            { currentStep == 1 ?(

                <div>

                    <div className="grid place-items-center">

                        <h3 className="grid place-items-center ">Before you start translation please confirm the following setting</h3>

                        <div className="grid gap-4">
                           <select
                                    className="dropmenu"
                                    value={dataUserprefferedSourceLang}
                                    onChange={(e) => setUserprefferedSourceLang(e.target.value)}
                                >
                                    <option value="">I prefer Translating from</option>
                                    
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                    <option value="af">Afrikaans</option>
                                </select>

                            <select
                                    className="dropmenu"
                                    value={dataUserprefferedTargetLang}
                                    onChange={(e) => setUserprefferedTargetLang(e.target.value)}
                                >
                                    <option value="">I prefer Translating to</option>
                                    
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                    <option value="af">Afrikaans</option>
                                </select>
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
                        
                        <Custombtn
                            label= 'Next'
                            onClick={()=> setCurrentStep(2)}
                            />

                        

                    </div>

                </div>
            ):(
                <>

                    <div className="grid place-items-center">

                        <h3 className="grid place-items-center ">Before you start translation please confirm the following setting</h3>

                        <div className="grid gap-4">
                            <div>
                                <div>
                                    <input
                                    type="file" 
                                    accept="image/*"
                                    onChange={setImage}
                                    />
                                </div>
                                {dataProfilePicture && (
                                    <div className=" w-[200px] h-[150px] relative">

                                        <Image
                                            fill
                                            alt = "uploaded profile picture"
                                            src ={URL.createObjectURL(dataProfilePicture)}
                                            className=" p-2 w-full h-full object-cover rounded-xl"
                                        />

                                    </div>
                                )}
                            </div>
                                <div>
                                    <select
                                    className="dropmenu"
                                    value={dataProfileVisibility}
                                    onChange={(e) => setProfileVisibilty(e.target.value)}
                                >
                                    <option value="">Translate from</option>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                </select>

                                </div>
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
                        
                        <Custombtn
                            label= 'Finish Signing up'
                            onClick={sudmitForm}
                            />
                    </div>
                </>
            )}
        </>
        
    )

    return(
        <Modal
            isOpen={addSettingsModal.isOpen}
            close={addSettingsModal.close}
            label="Setting Up"
            content={content}
        />
    )

}


export default AddSettingsModal;