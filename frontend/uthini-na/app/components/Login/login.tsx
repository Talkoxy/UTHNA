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


        

        if ( !email ) {
        setErrors(["Email is required."]);
        return;
        }

        if ( !password ) {
        setErrors(["Password is required."]);
        return;
        }

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
            
            let errorMessages = ["Unable to find this user, please check login details."];

            if (error instanceof Error) {
                errorMessages = [error.message];
            }
            
            setErrors(errorMessages);
        }
    }

    return (
        
    <div className="grid h-screen place-items-center">
    {/* Outer Container: Grid fills the viewport height (h-screen) and centers everything within it. */}

    <div className="grid login">

        {/* Error Message Display Area */}
            <div className="p-2">
                {/* min-h- to prevent layout shift when errors appear/disappear */}
                {errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`} className="text-sm">
                            {error}
                        </div>
                    ))}
                </div>
            )}
            </div>
        {/* Main Login Form Content: Vertically stacked elements */}
        
        <div className="grid place-items-center gap-2 p-2 pb-4">
            {/* Input Fields */}
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
        </div>

        {/* Login Button */}
                <Custombtn
                    label='Log-in'
                    onClick={submitLogin}
                />
        
        {/* Link to Signup */}
        <p className="text-center text-sm text-gray-600 mt-2">
            Don&apos;t have an account?{" "} 
            <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up here
            </Link>
        </p>
    </div>
</div>
    );
};

export default Login;
