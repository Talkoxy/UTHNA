'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import CustomButton from "@/app/components/Buttons/custombutton";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const submitLogin = async () => {
        setLoading(true);
        setErrors([]);

        try {
            const response = await apiService.postWithoutToken(
                '/api/auth/login/',
                JSON.stringify({
                    email,
                    password,
                })
            );

            if (response.access) {
                await handleLogin(
                    response.user.pk.toString(),
                    response.access,
                    response.refresh
                );
                router.push('/home');
            } else {
                setErrors(Object.values(response));
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setErrors([error.message || 'Login failed']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-flow-col place-items-center main-bg fixed inset-0">
            <div className="place-justify-center">
                <div className="grid phrase-box">
                    <div className="grid gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="translation-textarea"
                            placeholder="Enter your email"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="translation-textarea"
                            placeholder="Enter your password"
                        />

                        <CustomButton
                            label={loading ? "Logging in..." : "Login"}
                            onClick={submitLogin}
                            disabled={loading}
                        />
                    </div>

                    {errors.length > 0 && (
                        <div className="grid gap-2">
                            {errors.map((error, index) => (
                                <div
                                    key={`error_${index}`}
                                    className="rounded-xl p-5 bg-lime-100 text-rose-500"
                                >
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <p className="text-center text-subtitle mt-4">
                    Don't have an account?{" "}
                    <Link href="/" className="text-bg-accent hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;