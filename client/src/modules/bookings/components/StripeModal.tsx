import React, { useMemo, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

type StripeModalProps = {
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
};

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(stripeKey);

export const StripeModal: React.FC<StripeModalProps> = ({ clientSecret, onSuccess, onCancel }) => {
  const options = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "night" as const,
        variables: { colorPrimary: "#d4af37" },
      },
      paymentMethodCreation: "manual" as const,
    }),
    [clientSecret]
  );

  if (!clientSecret) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
      <div className="bg-[#111] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
      </div>
    </div>
  );
};

type CheckoutFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/bookings` },
      redirect: "if_required",
    });

    if (result.error) {
      toast.error(result.error.message ?? "Payment failed");
      setIsProcessing(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
      return;
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handlePayment}>
      <h3 className="text-[#d4af37] font-black uppercase tracking-widest mb-6 text-center">Secure Payment</h3>

      <PaymentElement options={{ layout: "tabs", paymentMethodOrder: ["card"] }} />

      <div className="flex flex-col gap-3 mt-8">
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? "Verifying..." : "Confirm Payment"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
        >
          Cancel Transaction
        </button>
      </div>
    </form>
  );
};