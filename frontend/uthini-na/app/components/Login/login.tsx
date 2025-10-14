'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import Custombtn from "../Buttons/custombutton";
import Link from "next/link";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    

    const submitLogin = async () => {
        // Clear previous errors
        setErrors([]); 

        const formData = {
            email: email,
            password: password,
        };

        try {
            const response = await apiService.postWithoutToken(
                '/api/auth/login/',
                formData
            );

            if (response.access) {
                // Success path
                handleLogin(
                    response.user.pk,
                    response.access,
                    response.refresh
                );
                router.push('/translate');
            } else {
                // Server-side validation errors or general failure (response object returned but no access token)
                // We check for a nested 'errors' property but default to mapping the entire response object
                const responseErrors = response.errors || response;
                
                // Map all error values into a flat string array
                const tmpErrors: string[] = Object.values(responseErrors).flat().map((error: unknown) => {
                    // Handle potential nested arrays from server validation
                    return Array.isArray(error) ? String(error[0]) : String(error);
                });

                // Display errors, or a generic message if mapping failed
                setErrors(tmpErrors.length > 0 ? tmpErrors : ["Login failed due to an unknown server error."]);
            }
        } catch (error: unknown) {
            // Network or unexpected error
            console.error("Error submitting login:", error);
            
            let errorMessages = ["An unexpected network error occurred. Please check your connection."];

            if (error instanceof Error) {
                errorMessages = [error.message];
            }
            
            setErrors(errorMessages);
        }
    }

    return (
        <div className="grid place-items-center fixed inset-0 p-50">
                <div className="grid gap-8 login">
                    <div className="grid gap-5">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                        <div className="p-2">
                            {errors.length > 0 && (
                            <div className="grid gap-2">
                                {errors.map((error, index) => (
                                    <div key={`error_${index}`} className="error-message">
                                    {error}
                                    </div>
                                ))}
                            </div>
                        )}



                        </div>


                        

                        <Custombtn
                            label='Log-in'
                            onClick={submitLogin}
                            
                        />
                    </div>

                </div>

                <p className="text-center text-subtitle mt-4">
                    {/* FIX: Replaced ' with &apos; for JSX compatibility */}
                    Don&apos;t have an account?{" "} 
                    <Link href="/signup" className="text-bg-accent hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
    );
};

export default Login;
