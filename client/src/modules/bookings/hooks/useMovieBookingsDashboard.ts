import { useEffect, useMemo, useState } from "react";
import { getShowTimes } from "../booking.api";
import { buildSchedules } from "../booking.utils";
import type {
  DateSchedule,
  HallSchedule,
  MovieLite,
  Showing,
  Slot,
} from "../booking.types";

export const useMovieBookingDashboard = (movie?: MovieLite) => {
  const [schedules, setSchedules] = useState<DateSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSchedule, setSelectedSchedule] = useState<DateSchedule | null>(
    null,
  );
  const [selectedHall, setSelectedHall] = useState<HallSchedule | null>(null);
  const [selectedShowing, setSelectedShowing] = useState<Showing | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (!movie) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getShowTimes();
        const raw =
          (res as any)?.data?.showtimes ??
          (res as any)?.data?.schedules ??
          (res as any)?.data ??
          [];
        const mine = raw.filter(
          (s: any) => String(s.movie_id) === String(movie.movie_id),
        );
        const built = buildSchedules(mine);
        setSchedules(built);
        if (built.length > 0) setSelectedSchedule(built[0]);
      } catch {
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [movie]);

  const isAllSelected = useMemo(
    () =>
      !!(selectedSchedule && selectedHall && selectedShowing && selectedSlot),
    [selectedSchedule, selectedHall, selectedShowing, selectedSlot],
  );

  const chooseSchedule = (schedule: DateSchedule) => {
    setSelectedSchedule(schedule);
    setSelectedHall(null);
    setSelectedShowing(null);
    setSelectedSlot(null);
  };

  const chooseHall = (hall: HallSchedule) => {
    setSelectedHall(hall);
    setSelectedShowing(null);
    setSelectedSlot(null);
  };

  const chooseShowing = (showing: Showing) => {
    setSelectedShowing(showing);
    setSelectedSlot(null);
  };

  return {
    schedules,
    loading,
    selectedSchedule,
    selectedHall,
    selectedShowing,
    selectedSlot,
    setSelectedSlot,
    chooseSchedule,
    chooseHall,
    chooseShowing,
    isAllSelected,
  };
};
