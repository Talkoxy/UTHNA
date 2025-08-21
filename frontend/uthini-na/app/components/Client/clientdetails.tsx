'use client'

import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import Custombtn from "../Buttons/custombutton";


type ClientDetailsProps = {
    user: {
        name: string;
        email: string;
    };
    userId?: string|null;
};

const ClientDetails = ({ user, userId }: ClientDetailsProps) => {
    const [username, setUsername] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState<string[]>([]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", username);
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
        <main className="grid place-items-center fixed inset-0">
            <div className="grid grid-flow-col grid-cols-3">



            </div>
                    

            <Custombtn
            label="Update Profile"
            onClick={handleUpdate}
            />
            
        </main>
    );
};

export default ClientDetails;