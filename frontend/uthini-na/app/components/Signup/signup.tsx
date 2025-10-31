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
    if (password.length < 8 && password.length > 1) {
        setErrors(["Password must be at least 8 characters long. with one uppercase letter, one lowercase letter, one number, and one special character."]);
        return;
    }
    if (!username || !email || !password || !password2) {
        setErrors(["All fields are required."]);
        return;
    }

    
    const formData = new FormData();
    
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password1', password);
    formData.append('password2', password2);
    
    try {
        
        const response = await apiService.postFormDataWithoutToken('/api/auth/register/', formData); 
      
        // Type guard and assertion
        if (typeof response === 'object' && response !== null && 'access' in response) {
            const successResponse = response as { user: { pk: string }, access: string, refresh: string };

            handleLogin(successResponse.user.pk, successResponse.access, successResponse.refresh)
            router.push('/translate')
            createSettingsModal.open();
            
        } else {
            
            const tmpErrors: string[] = Object.values(response).map((error: any) =>{
                return error;
            } )

            setErrors(tmpErrors.length > 0 ? tmpErrors : ["Registration failed due to a server error."]);
        }

    } catch (error) {
       console.error("Signup failed:", error);
       let errorMessages = ["An unexpected error occurred during signup."];
       if (error instanceof Error) {
            errorMessages = [error.message];
       }
       setErrors(errorMessages);
    }
};
  

  return (
    <div className="grid h-screen place-items-center">
    {/* Outer Container: Grid fills the viewport height (h-screen) and centers everything within it. */}
    <div className="grid gap-6 p-6 shadow-xl signup">

      {/* Errors and Button (Aligned below the inputs) */}
        <div className="grid gap-4">
            {/* Error Message Display */}
            {errors.length > 0 && (
                <div className="grid gap-2 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`} className="text-sm">
                            {error}
                        </div>
                    ))}
                </div>
            )}
        {/* Main Form Content: Uses grid for vertical stacking with gap */}

        {/* 1. Textual Data Inputs Column (A simple vertical stack) */}
        <div className="grid place-items-center gap-2">
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


        

            {/* Custom Button */}
            <Custombtn
                label='Sign-up'
                onClick={submitSignup}
            />
        </div>
        
        {/* Link to Login */}
        <div className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
                Login here
            </Link>
        </div>
    </div>
</div>
  );
}

export default Signup;