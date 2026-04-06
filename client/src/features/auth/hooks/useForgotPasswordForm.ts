import { useState } from "react";

export function useForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return { email, setEmail, handleChange };
}
