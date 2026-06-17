export default function Shapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Top Right Circles */}
      <div className="absolute top-10 right-20 flex gap-[-10px] animate-pulse">
        <div className="w-16 h-16 rounded-full bg-purple-500 -mr-4 relative z-20"></div>
        <div className="w-16 h-16 rounded-full bg-yellow-500 -mr-4 relative z-10"></div>
        <div className="w-16 h-16 rounded-full bg-cyan-500 relative z-0"></div>
      </div>

      {/* Spikey Star Left */}
      <svg className="absolute top-32 left-20 text-cyan-400 w-32 h-32 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L55 35 L90 20 L65 50 L90 80 L55 65 L50 100 L45 65 L10 80 L35 50 L10 20 L45 35 Z" />
      </svg>

      {/* Spikey Star Right Bottom */}
      <svg className="absolute bottom-40 right-32 text-cyan-400 w-20 h-20 animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L55 35 L90 20 L65 50 L90 80 L55 65 L50 100 L45 65 L10 80 L35 50 L10 20 L45 35 Z" />
      </svg>

      {/* Yellow Circle Left */}
      <div className="absolute top-24 left-1/3 w-6 h-6 rounded-full bg-yellow-500"></div>

      {/* Zigzags */}
      <svg className="absolute top-20 right-1/3 text-cyan-400 w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 50 L30 20 L50 80 L70 20 L90 50" />
      </svg>
      <svg className="absolute bottom-20 left-1/4 text-cyan-400 w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 50 L30 80 L50 20 L70 80 L90 50" />
      </svg>
      <svg className="absolute top-1/4 left-1/4 text-yellow-500 w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 50 L30 20 L50 80 L70 20 L90 50" />
      </svg>

      {/* Abstract Triangles */}
      <div className="absolute bottom-32 left-20 grid grid-cols-2 gap-1 w-20 h-20">
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-purple-500"></div>
        <div className="w-0 h-0 border-r-[40px] border-r-transparent border-b-[40px] border-b-yellow-500"></div>
        <div className="w-0 h-0 border-r-[40px] border-r-transparent border-b-[40px] border-b-yellow-500"></div>
        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-purple-500"></div>
      </div>

      {/* Striped Box Bottom Right */}
      <div className="absolute bottom-20 right-20 w-24 h-24 overflow-hidden rounded-lg">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #a855f7, #a855f7 4px, transparent 4px, transparent 10px)' }}></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-yellow-500"></div>
      </div>
      
      {/* Flower Top Right */}
      <svg className="absolute top-1/3 right-24 text-yellow-500 w-12 h-12 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 20 C 60 20, 60 40, 50 50 C 40 40, 40 20, 50 20 Z" />
        <path d="M80 50 C 80 60, 60 60, 50 50 C 60 40, 80 40, 80 50 Z" />
        <path d="M50 80 C 40 80, 40 60, 50 50 C 60 60, 60 80, 50 80 Z" />
        <path d="M20 50 C 20 40, 40 40, 50 50 C 40 60, 20 60, 20 50 Z" />
        <circle cx="50" cy="50" r="10" fill="#a855f7" />
      </svg>
    </div>
  );
}
