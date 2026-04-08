import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useScheduleAdmin } from "../hooks/useScheduleAdmin";

const ScheduleAdminPage: React.FC = () => {
  const { schedules, loading } = useScheduleAdmin();

  if (loading) {
    return <div className="min-h-screen bg-[#080808] flex justify-center items-center"><FaSpinner className="animate-spin text-[#d4af37] text-3xl" /></div>;
  }

  return <div className="min-h-screen bg-[#080808] text-white p-10">Ready: {schedules.length} schedules</div>;
};

export default ScheduleAdminPage;