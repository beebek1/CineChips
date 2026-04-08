import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useUserDashboard } from "../hooks/userDashboard";
import HeroSection from "../components/HeroSection";
import MovieSection from "../components/MovieSection";

const UserDashboardPage: React.FC = () => {
  const { nowShowing, upcoming, hero, loading } = useUserDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white">
      <HeroSection hero={hero} />

      <MovieSection
        indexLabel="01"
        smallTitle="In Theaters"
        titleLeft="Now"
        titleRight="Showing"
        movies={nowShowing}
        emptyText="No movies currently showing."
      />

      <MovieSection
        indexLabel="02"
        smallTitle="Coming Soon"
        titleLeft="Upcoming"
        titleRight="Releases"
        movies={upcoming}
        isUpcoming
        emptyText="No upcoming releases."
        withTopBorder
      />
    </div>
  );
};

export default UserDashboardPage;