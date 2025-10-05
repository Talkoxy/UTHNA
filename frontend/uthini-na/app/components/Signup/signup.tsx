"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import Link from "next/link";
import Custombtn from "../Buttons/custombutton";
import { create } from "domain";
import useCreateSettingsModal from "../Hooks/useCreateSettingsModal";

const signup = () => {
  const router = useRouter();

  const createSettingsModal = useCreateSettingsModal()

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [errors, setErrors] = useState<string[]>([]);

  //functions




  const submitSignup = async () => {
    const formData = {
      username: username,
      email: email,
      password: password,
      password2: password2,
    }


    const response = await apiService.postWithoutToken('/api/auth/register/', JSON.stringify(formData))


    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh)

      createSettingsModal.open()

    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;


      })

      setErrors(tmpErrors);
    }

  }

  return (
    <div className="grid place-items-center fixed inset-0 p-50">
      <div className="grid gap-8 signup">
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

export default signup;