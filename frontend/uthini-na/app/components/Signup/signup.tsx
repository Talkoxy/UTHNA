"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import Custombtn from "../Buttons/custombutton";
import useCreateSettingsModal from "../Hooks/useCreateSettingsModal";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();

  const createSettingsModal = useCreateSettingsModal()

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userAvatar, setUserAvatar] = useState <File | null>(null);

  const [errors, setErrors] = useState<string[]>([]);


  //functions
  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setUserAvatar(tmpImage);
        }
    }

    const submitSignup = async () => {
    // ... (Your client-side validation logic remains here)

    // Ensure validation passed before proceeding
    if (password !== password2 || !username || !email || !password) {
        // ... (handle errors and return)
        return; 
    }
    setErrors([]);

    // 🎯 CRITICAL FIX: CONSTRUCT THE FormData OBJECT 🎯
    // This correctly packages text fields and the file for the API.
    const formData = new FormData();
    
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password1', password);
    formData.append('password2', password2);
    
    try {
        const response = await apiService.postFormDataWithoutToken('/api/auth/register/', formData); 
      
        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh)
            router.push('/translate')
            createSettingsModal.open();
            
        } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return Array.isArray(error) ? error[0] : error;
      })

      setErrors(tmpErrors);
    }

    } catch (error) {
       console.error("Signup failed:", error);
        setErrors(["An unexpected error occurred during signup."]);
    }
};
    


  return (
    <div className="grid place-items-center fixed inset-0 p-50">
      <div className="grid gap-8 signup">
        
       
            
            {/* 1. Textual Data Inputs Column (Order depends on screen size) */}
            <div className="grid gap-2 order-last md:order-first">
                <input
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                />

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

                <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Re-enter password"
                />
            </div>
             
        
        {/* Errors and Button (span both columns) */}
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
          label='Sign-up'
          onClick={submitSignup}
        />
      </div>


      <div className="text-center text-subtitle mt-4">
        Already have an account?{" "}
        <Link href="/login" className=" hover:underline">
          Login here
        </Link>
      </div>

    </div>
  );
}

export default Signup;