import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../auth.api";
import type { LoginRequest } from "../auth.types";
import getUserInfo from "../../../app/guards/authRole";

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
        success: (res) => res.data?.message ?? "Login successful",
        error: (err) => err?.response?.data?.message || "Login failed",
      });

      const token: string = response?.data?.data;
      if (!token) {
        toast.error("Invalid login response");
        return;
      }

      localStorage.setItem("jwtToken", token);

      const info = await getUserInfo()

      setTimeout(() => {
        if (info?.role === "org" || info?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
          return;
        }

        navigate("/", { replace: true });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  return { login };
}
