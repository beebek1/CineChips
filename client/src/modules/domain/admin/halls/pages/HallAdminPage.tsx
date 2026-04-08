import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useHallAdmin } from "../hooks/useHallAdmin";
import HallsHeader from "../components/HallsHeader";
import HallCard from "../components/HallCard";
import HallFormModal from "../components/HallFormModal";

const HallAdminPage: React.FC = () => {
  const {
    halls, loading, submitting, isModalOpen, editingId, formData, setFormData,
    openCreateModal, openEditModal, closeModal, saveHall, deleteHall
  } = useHallAdmin();

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      <HallsHeader onCreate={openCreateModal} />

      {loading && !isModalOpen ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {halls.map((hall) => (
            <HallCard key={hall.hall_id} hall={hall} onEdit={openEditModal} onDelete={deleteHall} />
          ))}
        </div>
      )}

      <HallFormModal
        isOpen={isModalOpen}
        isEditing={Boolean(editingId)}
        submitting={submitting}
        formData={formData}
        onClose={closeModal}
        onSubmit={saveHall}
        onChange={(k, v) => setFormData((prev) => ({ ...prev, [k]: v }))}
      />
    </div>
  );
};

export default HallAdminPage;