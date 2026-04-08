import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import type { AccountFormData, UserAccount } from "../../user.types";

interface Props {
  formData: AccountFormData;
  user: UserAccount | null;
  isEditing: boolean;
  saving: boolean;
  memberSince: string;
  onEdit: () => void;
  onSave: () => void;
  onFieldChange: <K extends keyof AccountFormData>(key: K, value: AccountFormData[K]) => void;
}

const PersonalInfoTab: React.FC<Props> = ({
  formData,
  user,
  isEditing,
  saving,
  memberSince,
  onEdit,
  onSave,
  onFieldChange,
}) => {
  const fields = [
    { label: "Username", value: formData.username, key: "username", icon: <FaUser /> },
    { label: "Email Address", value: formData.email, key: "email", icon: <FaEnvelope /> },
    { label: "Phone Number", value: formData.phone, key: "phone", icon: <FaPhone /> },
    { label: "Location", value: formData.location, key: "location", icon: <FaMapMarkerAlt /> },
  ] as const;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-black tracking-tighter uppercase">Profile Settings</h3>
        <button
          onClick={isEditing ? onSave : onEdit}
          disabled={saving}
          className="text-[#d4af37] text-[10px] font-black tracking-widest uppercase hover:underline cursor-pointer disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map((field) => (
          <div key={field.key} className="space-y-3">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">{field.label}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">{field.icon}</span>
              <input
                type="text"
                disabled={!isEditing}
                value={field.value || ""}
                placeholder={isEditing ? `Enter ${field.label}` : "—"}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[#d4af37] outline-none disabled:opacity-50 transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-[8px] font-black text-gray-500 tracking-widest uppercase mb-1">Member Since</p>
          <p className="text-sm font-black">{memberSince}</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-[8px] font-black text-gray-500 tracking-widest uppercase mb-1">Role</p>
          <p className="text-sm font-black uppercase">{user?.role || "—"}</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-[8px] font-black text-gray-500 tracking-widest uppercase mb-1">Verified</p>
          <p className={`text-sm font-black uppercase ${user?.isVerified ? "text-green-400" : "text-red-400"}`}>
            {user?.isVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;