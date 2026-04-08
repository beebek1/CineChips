import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createScheduleApi,
  getSchedulesBundleApi,
  removeScheduleApi,
} from "../schedules.api";
import type {
  Hall,
  Movie,
  Schedule,
  ScheduleFormData,
} from "../schedules.types";
import {
  defaultForm,
  getConflict,
  isPastDateTime,
  toForm,
  toPayload,
} from "../schedules.utils";

export const useScheduleAdmin = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<ScheduleFormData>(defaultForm);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getSchedulesBundleApi();
      setSchedules(Array.isArray(data.schedules) ? data.schedules : []);
      setHalls(data.halls ?? []);
      setMovies(data.movies ?? []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openModal = (schedule?: Schedule) => {
    setError("");
    if (schedule) {
      setEditingId(schedule.showtime_id);
      setFormData(toForm(schedule));
    } else {
      setEditingId(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => !submitting && setIsModalOpen(false);

  const saveSchedule = async () => {
    setError("");

    if (isPastDateTime(formData.showDate, formData.showTime)) {
      setError("Cannot schedule a showtime in the past.");
      return;
    }

    const conflict = getConflict(
      schedules,
      movies,
      formData.hallId,
      formData.showDate,
      formData.showTime,
      formData.movieId,
      editingId,
    );

    if (conflict) {
      const blocker =
        conflict.Movie?.title ?? conflict.movie?.title ?? "another movie";
      setError(
        `COLLISION: "${blocker}" already overlaps this slot (+15 min buffer).`,
      );
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        setSchedules((prev) =>
          prev.map((s) =>
            s.showtime_id === editingId
              ? { ...s, ...toPayload(formData), showtime_id: editingId }
              : s,
          ),
        );
        toast.success("Schedule updated");
      } else {
        const res = await createScheduleApi(formData);
        const created = (res as any)?.data?.showtime ?? (res as any)?.data;
        setSchedules((prev) => [...prev, created]);
        toast.success((res as any)?.data?.message ?? "Showtime added");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to save schedule");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteScheduleById = async (id: number) => {
    if (!window.confirm("Delete this showtime? This cannot be undone.")) return;
    try {
      await removeScheduleApi(id);
      setSchedules((prev) => prev.filter((s) => s.showtime_id !== id));
      toast.success("Showtime removed");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to delete showtime");
    }
  };

  const updateHallAndPrice = (hallId: string) => {
    const selected = halls.find((h) => String(h.hall_id) === String(hallId));
    setFormData((prev) => ({
      ...prev,
      hallId,
      price: String(selected?.basePrice ?? selected?.base_price ?? ""),
    }));
  };

  return {
    schedules,
    movies,
    halls,
    loading,
    submitting,
    isModalOpen,
    editingId,
    error,
    formData,
    setFormData,
    openModal,
    closeModal,
    saveSchedule,
    deleteScheduleById,
    updateHallAndPrice,
  };
};
