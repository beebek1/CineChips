import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerApi } from "../auth.api";
import type { RegisterRequest, SignupFormState } from "../auth.types";

export function useRegister() {
  const navigate = useNavigate();

  const register = async (
    formData: SignupFormState,
    agreedToTerms: boolean,
  ) => {
    if (
      !formData.email ||
      !formData.fullName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Confirm password didn't match");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Kindly agree to the terms and conditions");
      return;
    }

    const dataToSubmit: RegisterRequest = {
      username: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    try {
      await toast.promise(registerApi(dataToSubmit), {
        loading: "Creating your account...",
        success: (res) => {
          setTimeout(() => {
            navigate("/signin");
          }, 1000);

          return res.data.message;
        },
        error: (err) => err.response?.data?.message || "Something went wrong",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { register };
}
