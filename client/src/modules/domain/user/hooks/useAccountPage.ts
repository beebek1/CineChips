import { useEffect, useMemo, useState } from "react";
import { getUserApi, updateUserAccountApi } from "../user.api";
import type {
  AccountFormData,
  AccountTab,
  UserAccount,
} from "../user.types";

const USER_ID = 1;

const emptyForm: AccountFormData = {
  username: "",
  email: "",
  phone: "",
  location: "",
};

export const useAccountPage = () => {
  const [activeTab, setActiveTab] = useState<AccountTab>("Personal Info");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [formData, setFormData] = useState<AccountFormData>(emptyForm);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi(USER_ID);
        if ((res as any)?.data?.user) {
          const u = (res as any).data.user as UserAccount;
          setUser(u);
          setFormData({
            username: u.username || "",
            email: u.email || "",
            phone: u.phone || "",
            location: u.location || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateUserAccountApi(formData, USER_ID);
      if ((res as any)?.data?.user) {
        setUser((res as any).data.user);
      } else {
        setUser((prev) => ({ ...(prev ?? {}), ...formData }));
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "CC";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      window.location.href = "/login";
    }
  };

  const requestNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      alert(`Notification permission: ${permission}`);
    });
  };

  const memberSince = useMemo(() => {
    if (!user?.createdAt) return "—";
    return new Date(user.createdAt)
      .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
  }, [user?.createdAt]);

  const tier = user?.role === "admin" ? "ADMIN MEMBER" : "PLATINUM MEMBER";

  return {
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
  };
};
