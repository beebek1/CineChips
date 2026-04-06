import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../auth.api";
import type { LoginRequest } from "../auth.types";

export function useLogin() {
  const navigate = useNavigate();

  const login = async (data: LoginRequest) => {
    if (!data.email || !data.password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await toast.promise(loginApi(data), {
        loading: "Checking Credentials...",
        success: (res) => res.data.message,
        error: (err) => err.response?.data?.message || "Login failed",
      });

      const token = response.data.data;
      localStorage.setItem("jwtToken", token);

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error(error);
    }
  };

  return { login };
}
