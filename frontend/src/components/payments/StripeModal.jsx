import { PaymentElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51T6SqLFhEXeLM4fvig5hOvUF8tJu5jgmp1oYSEGWfPvhv8QwucYKgyAWI4nb81J9UIQw5LgNT1Ucs6IY9Tq1qrG700bAgWCF7q");

// 1. The Wrapper Component (The Provider)
export const StripeModal = ({ clientSecret, onSuccess, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
      <div className="bg-[#111] p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl">
        {/* The Elements provider MUST have the clientSecret here to fix your error */}
        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret,
            appearance: { theme: 'night', variables: { colorPrimary: '#d4af37' } },
            paymentMethodCreation: 'manual',
          }}
        >          
          <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
      </div>
    </div>
  );
};

// 2. The Form Component (The Consumer)
const CheckoutForm = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/bookings", 
      },
      redirect: "if_required", 
    });

    if (result.error) {
      toast.error(result.error.message);
      setIsProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <h3 className="text-[#d4af37] font-black uppercase tracking-widest mb-6 text-center">
        Secure Payment
      </h3>
      
      <PaymentElement options={{ layout: 'tabs', paymentMethodOrder: ['card'] }} />
      
      <div className="flex flex-col gap-3 mt-8">
        <button 
          type="submit"
          className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? "Verifying..." : "Confirm Payment"}
        </button>

        <button 
          type="button"
          onClick={() => window.location.reload()} 
          className="text-gray-500 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
        >
          Cancel Transaction
        </button>
      </div>
    </form>
  );
};