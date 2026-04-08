import toast from "react-hot-toast";
import { forgotPasswordApi } from "../auth.api";

export function useForgotPassword() {
  const sendResetLink = async (email: string) => {
    if (!email) {
      toast.error("Please enter your registered email");
      return;
    }

    try {
      await toast.promise(forgotPasswordApi({ email }), {
        loading: "Sending reset link...",
        success: (res) =>
          res.data.message || "Reset instructions sent to your email!",
        error: (err) =>
          err.response?.data?.message || "Failed to send reset link",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { sendResetLink };
}
