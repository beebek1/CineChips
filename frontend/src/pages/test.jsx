// HeroSection.tsx
import heroImg from "../assets/one.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              Your Trusted Partner <br /> for Strategic Growth
            </h1>

            <p className="max-w-lg text-base text-gray-600 md:text-lg">
              Empower your business with expert guidance. Biztar Consulting
              delivers strategic solutions for sustainable growth. Your success
              starts here.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800">
                Let&apos;s Get Started!
              </button>

              <button className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100">
                See Case Studies
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] md:max-w-lg lg:max-w-xl">
              <img
                src={heroImg}
                alt="Consulting team discussion"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;