import React from "react";

const ScreenArch: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16">
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[110%] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 50%, transparent 80%)',
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(35px)'
        }}
      />
      <svg className="relative z-10 mx-auto" width="100%" height="60" viewBox="0 0 600 60" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path 
          d="M40 35 Q300 -5 560 35" 
          stroke="white" 
          strokeWidth="3" 
          fill="transparent" 
          strokeLinecap="round" 
          filter="url(#glow)" 
          className="opacity-90" 
        />
        <text 
          x="300" 
          y="55" 
          textAnchor="middle" 
          fill="white" 
          fontSize="8" 
          fontWeight="900" 
          letterSpacing="12" 
          className="opacity-25 uppercase"
        >
          SCREEN
        </text>
      </svg>
    </div>
  );
};

export default ScreenArch;