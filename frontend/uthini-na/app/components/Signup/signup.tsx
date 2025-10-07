"use client";
import { useState, ChangeEvent, Dispatch, SetStateAction, FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import Custombtn from "../Buttons/custombutton";
import { create } from "domain";
import useCreateSettingsModal from "../Hooks/useCreateSettingsModal";
import Image from "next/image";


// --- 1. Define Props Interfaces ---

interface IStepOneProps {
    username: string;
    setName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    password2: string;
    setPassword2: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    handleNextStep: () => void;
    Custombtn: FunctionComponent<any>; // Type for the passed component
}

interface IStepTwoProps {
    avatar: File | null;
    handleFinalSubmit: () => Promise<void>; // Fixed the type for the async function
    isLoading: boolean;
    setStep: Dispatch<SetStateAction<number>>;
    setErrors: Dispatch<SetStateAction<string[]>>;
    setImage: (event: ChangeEvent<HTMLInputElement>) => void;
    Custombtn: FunctionComponent<any>;
    // Since 'Image' is imported from 'next/image', it's better to use it directly
    // than passing it as a prop, but if you insist, its type is more complex.
    // For simplicity here, we'll keep the props signature but use the import directly.
}


    const StepOne = ({
    username, setName,
    email, setEmail,
    password, setPassword,
    password2, setPassword2,
    isLoading, handleNextStep,
    Custombtn // Passed as prop
}) => (
          <div className="grid gap-2"> 
             <div className="grid gap-4">
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
            <div>

              <Custombtn
                label={isLoading ? 'Verifying...' : 'Next: Choose Avatar'}
                onClick={handleNextStep}
                disabled={isLoading}
            />
            </div>

            

          </div>

          
    );


    const StepTwo = ({
    avatar, handleFinalSubmit, isLoading, setStep, setErrors, setImage, Custombtn, Image
}) => (
      <div>
        <div className=" w-[200px] h-[150px] relative">
           <input type="file" accept="image/*" onChange={setImage}/>
            <Image 
                fill
                alt="Uploaded project cover art"
                src={avatar ? URL.createObjectURL(avatar)
                      : '/avatar.png'}
                className=" p-2 w-full h-full object-cover rounded-xl"
            />
          </div>

          <Custombtn
                  label={isLoading ? 'Creating Account...' : 'Complete Sign-up'}
                  onClick={handleFinalSubmit}
                  disabled={isLoading}
              />
              {/* Keeping the small back button for UX, with minimal styling */}
              <button
                  onClick={() => { setStep(1); setErrors([]); }}
                  className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
              >
                  &larr; Back to Account Details
              </button>
      </div>
    );

const signup = () => {
  const router = useRouter();

  const createSettingsModal = useCreateSettingsModal()

  const [step, setStep] = useState(1); 
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [avatar, setAvatar] = useState <File | null>(null)

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files.length > 0) {
              const tmpImage = event.target.files[0];
  
              setAvatar(tmpImage);
          }
      }

  //functions

  const handleNextStep = () => {
        const tempErrors: string[] = [];

        if (!username || !email || !password1 || !password2) {
            tempErrors.push('All username, email, and password fields must be filled.');
        }

        if (password1 !== password2) {
            tempErrors.push('The passwords you entered do not match.');
        }
        
        // You could add more complex email/password length validation here

        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            setErrors([]); // Clear errors
            setStep(2);    // Move to the next step
        }
      }

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        setErrors([]);

        // The API call expects image_url to be the file object for upload
        const formData = {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            image_url: avatar,
        }

        try {
            // Note: apiService.postWithoutToken likely needs adjustment to handle FormData
            // if it expects to upload a File object, otherwise you'd send base64 data.
            // For the mock, we pass a stringified object.
            const response = await apiService.postWithoutToken('/api/auth/register/', formData);

            if (response.access) {
                handleLogin(response.user.pk, response.access, response.refresh);
                createSettingsModal.open();
                // router.push('/'); // Redirect after successful signup
            } else {
                // Assuming response returns an object where values are error messages
                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    // Check if error is an array of strings (common in Django/DRF)
                    if (Array.isArray(error) && typeof error[0] === 'string') {
                        return error[0];
                    }
                    return String(error);
                });
                setErrors(tmpErrors);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            setErrors(["An unexpected error occurred during signup."]);
        } finally {
            setIsLoading(false);
        }
    };




  return (
    <div className="grid place-items-center fixed inset-0 p-50">
      <div className="grid gap-8 signup">
       
        {step === 1 ? (
                    <StepOne
                        username={username} setName={setName}
                        email={email} setEmail={setEmail}
                        password={password1} setPassword={setPassword}
                        password2={password2} setPassword2={setPassword2}
                        isLoading={isLoading}
                        handleNextStep={handleNextStep}
                        Custombtn={Custombtn} // Pass mock button
                    />
                ) : (
                    <StepTwo
                        avatar={avatar}
                        setImage={setImage}
                        isLoading={isLoading}
                        handleFinalSubmit={handleFinalSubmit}
                        setStep={setStep}
                        setErrors={setErrors}
                        Custombtn={Custombtn} // Pass mock button
                        Image={Image} // Pass mock Image
                    />
                )}
          
      
        
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



      <div className="text-center text-subtitle mt-4">
        Already have an account?{" "}
        <Link href="/login" className=" hover:underline">
          Login here
        </Link>
      </div>

    </div>
  );
}

export default signup;