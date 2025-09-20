'use client'
import Modal from "./Modal"
import useAddFeedbackModal from "../Hooks/useAddFeedbackModal"
import Custombtn from "../Buttons/custombutton"
import { ChangeEvent, useEffect, useState } from "react"
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation"

const AddFeedbackModal = () => {
    const AddFeedbackModal = useAddFeedbackModal();


    const router = useRouter();

    const original_translation = AddFeedbackModal.original_translation || "";
    const translated_from = AddFeedbackModal.translated_from || "";
    const translated_to = AddFeedbackModal.translated_to || "";

    const [errors, setErrors] = useState<string[]>([]);

    const [datafeedback, setFeedback] = useState('');
    const [datacontext, setContext] = useState('');
    const [dataoriginal_translation, setOriginal_translation] = useState(original_translation);
    const [datatranslated_from, setTranslated_from] = useState(translated_from);
    const [datatranslated_to, setTranslated_to] = useState(translated_to);


    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        if (AddFeedbackModal.isOpen) {
            setOriginal_translation(original_translation)
            setTranslated_from(translated_from)
            setTranslated_to(translated_to)
        } else {
            setOriginal_translation("")
            setTranslated_from("")
            setTranslated_to("")
        }

    })



    const sudmitForm = async () => {
        const formData = new FormData()
        formData.append('context', datacontext);
        formData.append('feedback', datafeedback);
        formData.append('original_translation', dataoriginal_translation);
        formData.append('translated_from', datatranslated_from);
        formData.append('translated_to', datatranslated_to)

        const response = await apiService.post('/api/feedback/create/', formData)

        if (response.success) {

            router.push('/translate?feedback_sent=success')

            AddFeedbackModal.close()
        } else {
            console.log('Error');

            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })

            setErrors(tmpErrors)
        }

    };

    const content = (
        <>



            {/* Language Selection */}
            <div>
                <div className="grid grid-flow-row place-items-center pb-40">
                    <div className="grid place-items-center gap-8">

                        <input
                            className=""

                            type="text"
                            value={original_translation}
                            onChange={(e) => {
                                setFeedback(e.target.value)
                            }}
                        />

                        <select
                            className="dropmenu"
                            value={translated_from}
                            onChange={(e) => setTranslated_from(e.target.value)}
                        >
                            <option >{translated_from}</option>

                            <option value="xh">Xhosa</option>
                            <option value="en">English</option>
                            <option value="af">Afrikaans</option>
                        </select>

                        <select
                            className="dropmenu"
                            value={translated_to}
                            onChange={(e) => setTranslated_to(e.target.value)}
                        >
                            <option >{translated_to}</option>


                            <option value="xh">Xhosa</option>
                            <option value="en">English</option>
                            <option value="af">Afrikaans</option>
                        </select>
                    </div>
                </div>

                <div>
                    <input
                        placeholder="Feedback"
                        type="text"
                        value={datafeedback}
                        onChange={(e) => {
                            setFeedback(e.target.value)
                        }}
                    />

                    <input
                        placeholder="context"
                        type="text"
                        value={datacontext}
                        onChange={(e) => {
                            setContext(e.target.value)
                        }}
                    />


                </div>


            </div>


            <div>
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
                    label='Send Translation Feedback'
                    onClick={sudmitForm}
                />
            </div>


        </>

    )

    return (
        <Modal
            isOpen={AddFeedbackModal.isOpen}
            close={AddFeedbackModal.close}
            label="Setting Up"
            content={content}
        />
    )

}


export default AddFeedbackModal;