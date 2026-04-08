import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createHallApi,
  editHallApi,
  getAllHallsApi,
  removeHallApi,
} from "../halls.api";
import type { Hall, HallFormData } from "../halls.types";
import { defaultHallForm } from "../halls.utils";

export const useHallAdmin = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<HallFormData>(defaultHallForm);

  const fetchHalls = async () => {
    setLoading(true);
    try {
      const res = await getAllHallsApi();
      setHalls((res as any)?.data?.halls ?? []);
    } catch {
      setHalls([]);
      toast.error("Failed to fetch halls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(defaultHallForm);
    setIsModalOpen(true);
  };

  const openEditModal = (hall: Hall) => {
    setEditingId(hall.hall_id);
    setFormData({
      name: hall.name,
      location: hall.location,
      rowCount: hall.total_rows,
      colCount: hall.total_columns,
      basePrice: hall.basePrice,
      vipRowPrice: hall.vipPrice,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setIsModalOpen(false);
  };

  const saveHall = async () => {
    setSubmitting(true);
    try {
      if (editingId) {
        const res = await editHallApi(editingId, formData);
        toast.success((res as any)?.data?.message ?? "Hall updated");
      } else {
        const res = await createHallApi(formData);
        toast.success((res as any)?.data?.message ?? "Hall added");
      }
      setIsModalOpen(false);
      await fetchHalls();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to save hall");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteHall = async (id: number) => {
    if (
      !window.confirm(
        "Delete this hall? All seating records and schedules will be lost.",
      )
    )
      return;
    try {
      await removeHallApi(id);
      toast.success("Hall deleted");
      setHalls((prev) => prev.filter((h) => h.hall_id !== id));
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to delete hall");
    }
  };

  return {
    halls,
    loading,
    submitting,
    isModalOpen,
    editingId,
    formData,
    setFormData,
    openCreateModal,
    openEditModal,
    closeModal,
    saveHall,
    deleteHall,
  };
};
