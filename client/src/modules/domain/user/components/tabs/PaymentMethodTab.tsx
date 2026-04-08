import React from "react";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";

const PaymentMethodsTab: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-black tracking-tighter uppercase mb-10">Allowed Methods</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 bg-[#5d2e8e]/10 border border-[#5d2e8e]/30 rounded-[32px] group">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#5d2e8e] rounded-2xl flex items-center justify-center font-black text-white text-xs">KHALTI</div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase">Khalti Wallet</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Primary Payment Method</p>
            </div>
          </div>
          <FaCheckCircle className="text-[#5d2e8e]" />
        </div>

        <div className="flex items-center justify-between p-6 bg-[#635bff]/10 border border-[#635bff]/30 rounded-[32px] group">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#635bff] rounded-2xl flex items-center justify-center font-black text-white text-xs tracking-tighter">STRIPE</div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase">Stripe / Visa</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Ending in 4242</p>
            </div>
          </div>
          <button className="text-white/20 hover:text-white transition-colors"><FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsTab;