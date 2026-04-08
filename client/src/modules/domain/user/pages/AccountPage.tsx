import React from "react";
import { useAccountPage } from "../hooks/useAccountPage";
import AccountHeader from "../components/AccountHeader";
import AccountSidebar from "../components/AccountSidebar";
import PersonalInfoTab from "../components/tabs/PersonalInfoTab";
import PaymentMethodsTab from "../components/tabs/PaymentMethodTab";
import NotificationsTab from "../components/tabs/NotificationsTab";
import SecurityTab from "../components/tabs/SecurityTab";

const AccountPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    loading,
    saving,
    user,
    formData,
    setFormData,
    handleSave,
    getInitials,
    handleSignOut,
    requestNotification,
    memberSince,
    tier,
  } = useAccountPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500 animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24 px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <AccountHeader user={user} tier={tier} getInitials={getInitials} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setIsEditing(false);
            }}
            onSignOut={handleSignOut}
          />

          <div className="lg:col-span-3">
            <div className="bg-[#111] border border-white/5 rounded-[48px] p-8 md:p-12 shadow-2xl min-h-[500px]">
              {activeTab === "Personal Info" && (
                <PersonalInfoTab
                  formData={formData}
                  user={user}
                  isEditing={isEditing}
                  saving={saving}
                  memberSince={memberSince}
                  onEdit={() => setIsEditing(true)}
                  onSave={handleSave}
                  onFieldChange={(key, value) =>
                    setFormData((prev) => ({ ...prev, [key]: value }))
                  }
                />
              )}

              {activeTab === "Payment Methods" && <PaymentMethodsTab />}
              {activeTab === "Notifications" && <NotificationsTab onEnable={requestNotification} />}
              {activeTab === "Security" && <SecurityTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;