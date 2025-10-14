"use client";
import { useState } from "react"; // Removed ChangeEvent since setImage is removed
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import Custombtn from "../Buttons/custombutton";
import useCreateSettingsModal from "../Hooks/useCreateSettingsModal";
// Removed unused Image import

const Signup = () => {
  const router = useRouter();

  const createSettingsModal = useCreateSettingsModal()

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // Removed unused userAvatar state

  const [errors, setErrors] = useState<string[]>([]);


  // Removed unused setImage function

    const submitSignup = async () => {
    // Basic client-side validation
    setErrors([]);
    if (password !== password2) {
        setErrors(["Passwords do not match."]);
        return;
    }
    if (!username || !email || !password || !password2) {
        setErrors(["All fields are required."]);
        return;
    }

    // 🎯 CRITICAL FIX: CONSTRUCT THE FormData OBJECT 🎯
    const formData = new FormData();
    
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password1', password);
    formData.append('password2', password2);
    
    try {
        // Use 'unknown' for the response type for safety
        const response: unknown = await apiService.postFormDataWithoutToken('/api/auth/register/', formData); 
      
        // Type guard and assertion
        if (typeof response === 'object' && response !== null && 'access' in response) {
            const successResponse = response as { user: { pk: string }, access: string, refresh: string };

            handleLogin(successResponse.user.pk, successResponse.access, successResponse.refresh)
            router.push('/translate')
            createSettingsModal.open();
            
        } else {
            // Handle server-side validation errors
            // Safely map and flatten the response object (which contains the errors)
            const tmpErrors: string[] = Object.values(response || {}).flat().map((errorValue: unknown) => {
                return Array.isArray(errorValue) ? String(errorValue[0]) : String(errorValue);
            }).filter(msg => msg !== 'undefined' && msg.length > 0); // Filter out empty/undefined strings

            setErrors(tmpErrors.length > 0 ? tmpErrors : ["Registration failed due to a server error."]);
        }

    } catch (error) {
       console.error("Signup failed:", error);
       // Use error handling that expects a standard Error object
       let errorMessages = ["An unexpected error occurred during signup."];
       if (error instanceof Error) {
            errorMessages = [error.message];
       }
       setErrors(errorMessages);
    }
};
    


  return (
    <div className="grid place-items-center fixed inset-0 p-50">
      <div className="grid gap-8 signup">
        
       
            
            {/* 1. Textual Data Inputs Column */}
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
          <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
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