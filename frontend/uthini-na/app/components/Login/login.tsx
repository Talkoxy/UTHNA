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
        const response = await apiService.postWithoutToken(
            '/api/auth/login/',
            JSON.stringify({
                email,
                password,
            })
        );

        if (response.access) {
            handleLogin(
                response.user.pk,
                response.access,
                response.refresh
            );

            router.push('/translate');
        } else {
        const tmpErrors: string[] = Object.values(response).map((error: any) =>{
            return error;
        } )

        setErrors(tmpErrors);
        }
    }

    return (
        <div className="grid place-items-center fixed inset-0">
                <div className="grid gap-8 card">
                    <div className="grid gap-4">
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
                            label='Login'
                            onClick={submitLogin}
                        />
                    </div>

                </div>

                <p className="text-center text-subtitle mt-4">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-bg-accent hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
    );
};

export default Login;