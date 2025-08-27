'use client'

import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import Custombtn from "../Buttons/custombutton";
import SavedTranslations from "../Translations/savedtranslations/savedtranslations";


type ClientDetailsProps = {
    user: {
        name: string;
        email: string;
    };
    userId?: string|null;
};

const ClientDetails = ({ user, userId }: ClientDetailsProps) => {
    const [name, setUsername] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState<string[]>([]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);

        try {
            const response = await apiService.put(`/api/auth/${userId}/update/`, formData);
            if (response.success) {
                // Handle successful update
            } else {
                const tmpErrors: string[] = Object.values(response.errors).map((error: any) => error);
                setErrors(tmpErrors);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrors(["An error occurred while updating the profile."]);
        }
    };

    return (
        <main className="grid grid-flow-col fixed inset-0 pt-20 ">

            <div className="grid grid-flow-col gap-10 justify-items-center">

                <div className="grid grid-rows-2 place-items-center ">

                    <div>D.P</div>
                    <div className="label">My Insights</div>

                </div>


                <div className="grid grid-rows-3 justify-items-center">

                    <div className="grid grid-col-2 gap-1 place-items-center">

                        <div className="label">MY SAVED TRANSLATIONS</div>

                        <div><SavedTranslations user_id={userId}/></div>
                    </div>

                    <div className="grid grid-col-2 gap-1 place-items-center">


                        <div className="label">MY LIKED TRANSLATIONS</div>

                        <div><SavedTranslations user_id={userId}/></div>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default ClientDetails;