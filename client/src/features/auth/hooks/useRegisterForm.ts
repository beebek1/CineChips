import { useState } from "react";
import type { SignupFormState } from "../auth.types";

export function useSignupForm() {
  const [formData, setFormData] = useState<SignupFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, handleChange, setFormData };
}
