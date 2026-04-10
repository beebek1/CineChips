import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useScheduleAdmin } from "../hooks/useScheduleAdmin";
import SchedulesTable from "../components/ScheduleTable";
import ScheduleFormModal from "../components/ScheduleFormModal";

const ScheduleAdminPage: React.FC = () => {
  const {
    schedules,
    movies,
    halls,
    loading,
    submitting,
    isModalOpen,
    editingId,
    error,
    formData,
    openModal,
    closeModal,
    saveSchedule,
    deleteScheduleById,
    updateHallAndPrice,
    setFormData,
  } = useScheduleAdmin();

  const handleFormChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveSchedule();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex justify-center items-center">
        <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">
            Operations
          </h3>
          <h4 className="text-3xl font-light uppercase tracking-tighter">
            Showtime <span className="font-black italic">Scheduling</span>
          </h4>
        </div>
        <button
          onClick={() => openModal()}
          className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-[#d4af37]/20"
        >
          + Add New Schedule
        </button>
      </div>

      {/* TABLE */}
      <SchedulesTable
        schedules={schedules}
        movies={movies}
        halls={halls}
        onEdit={openModal}
        onDelete={deleteScheduleById}
      />

      {/* MODAL */}
      <ScheduleFormModal
        isOpen={isModalOpen}
        isEditing={!!editingId}
        submitting={submitting}
        error={error}
        formData={formData}
        movies={movies}
        halls={halls}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
        onHallChange={updateHallAndPrice}
      />
    </div>
  );
};

export default ScheduleAdminPage;