import { useState } from 'react';
import { FaPlay, FaInfoCircle, FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState("user");

  // Sample movie data
  const featuredMovie = {
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    rating: 8.7,
    duration: "51min",
    year: "2024",
    genre: "Sci-Fi, Horror, Drama"
  };

  const nowShowing = [
    { id: 1, title: "Movie Title 1", image: "https://picsum.photos/300/450?random=1", rating: 8.5 },
    { id: 2, title: "Movie Title 2", image: "https://picsum.photos/300/450?random=2", rating: 7.8 },
    { id: 3, title: "Movie Title 3", image: "https://picsum.photos/300/450?random=3", rating: 9.1 },
    { id: 4, title: "Movie Title 4", image: "https://picsum.photos/300/450?random=4", rating: 8.2 },
    { id: 5, title: "Movie Title 5", image: "https://picsum.photos/300/450?random=5", rating: 7.5 }
  ];

  const upcoming = [
    { id: 1, title: "Upcoming 1", image: "https://picsum.photos/300/450?random=6", releaseDate: "Feb 15" },
    { id: 2, title: "Upcoming 2", image: "https://picsum.photos/300/450?random=7", releaseDate: "Feb 22" },
    { id: 3, title: "Upcoming 3", image: "https://picsum.photos/300/450?random=8", releaseDate: "Mar 1" },
    { id: 4, title: "Upcoming 4", image: "https://picsum.photos/300/450?random=9", releaseDate: "Mar 8" },
    { id: 5, title: "Upcoming 5", image: "https://picsum.photos/300/450?random=10", releaseDate: "Mar 15" }
  ];

  return (
    <>
      {currentRole === "user" && (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
          
          {/* Hero Section */}
          <div className="relative w-full h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&h=1080&fit=crop"
                alt="Featured Movie" 
                className='w-full h-full object-cover'
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className='relative h-full max-w-7xl mx-auto px-8 flex items-end pb-20'>
              <div className='max-w-2xl space-y-6'>
                {/* Badge
                <div className="inline-flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className='text-white text-xs font-bold tracking-wider'>NOW SHOWING</span>
                </div> */}

                {/* Title */}
                <h1 className='text-white text-6xl font-bold leading-tight'>
                  {featuredMovie.title}
                </h1>

                {/* Meta Info */}
                <div className='flex items-center space-x-6 text-gray-300'>
                  <div className='flex items-center space-x-2'>
                    <FaStar className='text-yellow-500' />
                    <span className='font-semibold'>{featuredMovie.rating}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <FaClock className='text-gray-400' />
                    <span>{featuredMovie.duration}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <FaCalendarAlt className='text-gray-400' />
                    <span>{featuredMovie.year}</span>
                  </div>
                </div>

                {/* Genre Tags */}
                <div className='flex flex-wrap gap-2'>
                  {featuredMovie.genre.split(', ').map((genre, idx) => (
                    <span key={idx} className='px-3 py-1 bg-gray-800/80 border border-gray-700 text-gray-300 text-sm rounded-full'>
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className='text-gray-300 text-lg leading-relaxed max-w-xl'>
                  {featuredMovie.description}
                </p>

                {/* Action Buttons */}
                <div className='flex space-x-4 pt-4'>
                  <button className='flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 hover:scale-105 active:scale-95'>
                    <FaPlay className='w-4 h-4' />
                    <span className='text-lg'>BOOK NOW</span>
                  </button>
                  <button className='flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-full border border-gray-600 transition-all duration-300 hover:scale-105 active:scale-95'>
                    <FaInfoCircle className='w-4 h-4' />
                    <span className='text-lg'>MORE INFO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Now Showing Section */}
          <div className='max-w-7xl mx-auto px-8 py-20'>
            <div className='flex items-center space-x-6 mb-12'>
              <h2 className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 tracking-tight'>
                NOW
              </h2>
              <div className='text-white font-semibold text-lg tracking-widest leading-tight'>
                <div>SHOWING</div>
                <div>OUT THERE</div>
              </div>
            </div>

            {/* Movie Cards Scroll */}
            <div className='flex space-x-6 overflow-x-hidden scrollbar-hide pb-4'>
              {nowShowing.map((movie, index) => (
                <div key={movie.id} className='flex-shrink-0 group cursor-pointer'>
                  <div className='relative w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-yellow-500/20'>

                    {/* Movie Image */}
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                    {/* Gradient Overlay for better text visibility */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>

                    {/* Info - Always visible at bottom */}
                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                      <h3 className='text-white font-bold text-xl mb-2'>{movie.title}</h3>
                      <div className='flex items-center space-x-2 text-yellow-400'>
                        <FaStar />
                        <span className='font-semibold'>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentRole === "admin" && (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-yellow-500 mb-4'>Admin Dashboard</h1>
            <p className='text-gray-400'>Welcome to the admin panel</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;