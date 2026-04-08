import { useState } from "react";
import type { LoginRequest } from "../auth.types";

export function useSigninForm() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
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
