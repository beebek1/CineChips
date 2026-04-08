import { FaFilter, FaChevronDown, FaThLarge } from "react-icons/fa";

type Props = {
  title: string;
  subtitle: string;
  countText: string;

  genres: string[];
  activeFilter: string;
  isFilterOpen: boolean;

  onToggleFilter: () => void;
  onSelectGenre: (genre: string) => void;
};

export default function MovieHeader({
  title,
  subtitle,
  countText,
  genres,
  activeFilter,
  isFilterOpen,
  onToggleFilter,
  onSelectGenre,
}: Props) {
  return (
    <header className="max-w-7xl mx-auto px-8 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-end space-x-4 mb-4">
            <h1 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none">
              CC
            </h1>

            <div className="pb-2">
              <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">
                {subtitle}
              </h3>

              <h2 className="text-white text-5xl font-light tracking-tighter uppercase">
                {title}
              </h2>
            </div>
          </div>

          <p className="text-gray-500 text-sm max-w-md tracking-wide">
            {countText}
          </p>
        </div>

        <div className="flex items-center space-x-4 relative">
          <div
            onClick={onToggleFilter}
            className="group cursor-pointer flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:border-[#d4af37]/50 transition-all select-none"
          >
            <FaFilter className="text-[#d4af37] text-[10px]" />
            <span className="text-[10px] font-black tracking-widest uppercase">
              {activeFilter}
            </span>

            <FaChevronDown
              className={`text-gray-600 text-[10px] transition-transform duration-300 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isFilterOpen && (
            <div className="absolute top-full mt-2 right-12 w-48 bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl">
              {genres.map((genre) => (
                <div
                  key={genre}
                  onClick={() => onSelectGenre(genre)}
                  className={`px-6 py-3 text-[10px] font-black tracking-[0.2em] cursor-pointer transition-colors hover:bg-[#d4af37] hover:text-black ${
                    activeFilter === genre
                      ? "text-[#d4af37] bg-white/5"
                      : "text-gray-400"
                  }`}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}

          <div className="cursor-pointer bg-[#d4af37] text-black p-3.5 rounded-xl">
            <FaThLarge className="text-sm" />
          </div>
        </div>
      </div>
    </header>
  );
}