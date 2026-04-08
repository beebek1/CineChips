import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import AdminKpiCards from "../components/AdminKpiCards";
import AdminSecondaryStats from "../components/AdminSecondaryStats";
import UpcomingShowsTable from "../components/UpcomingShowsTable";
import HallUsageCard from "../components/HallUsageCard";
import LanguageBreakdownCard from "../components/LanguageBreakDownCard";

const AdminDashboardPage: React.FC = () => {
  const { showtimes, halls, movies, loading, stats } = useAdminDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      <AdminDashboardHeader />

      <AdminKpiCards
        totalRevenue={stats.totalRevenue}
        totalSeats={stats.totalSeats}
        showtimeCount={showtimes.length}
        uniqueMovieCount={stats.uniqueMovieCount}
        totalMoviesInLibrary={movies.length}
        liveShows={stats.liveShows}
      />

      <AdminSecondaryStats
        hallCount={halls.length}
        upcomingShowCount={stats.upcomingShows.length}
        avgTicketPrice={stats.avgTicketPrice}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <UpcomingShowsTable upcomingShows={stats.upcomingShows} />

        <div className="space-y-6">
          <HallUsageCard hallUsage={stats.hallUsage} />
          <LanguageBreakdownCard languages={stats.languages} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;