import { useState, useEffect } from "react";

export default function AlbumArtPreview({ title, genre = "Action" }) {
  const [pattern, setPattern] = useState(0);
  
  // Generate random pattern on mount
  useEffect(() => {
    setPattern(Math.floor(Math.random() * 4));
  }, []);
  
  // Get pattern based on genre - darker gradients to match website theme
  const getPatternStyle = () => {
    const patterns = {
      0: "bg-gradient-to-br from-rose-800 via-pink-900 to-red-900", // Dark red/pink
      1: "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900", // Dark blue/purple
      2: "bg-gradient-to-br from-gray-800 via-gray-900 to-zinc-900", // Dark gray/neutral
      3: "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900" // Dark amber/orange
    };
    
    return patterns[pattern];
  };
  
  // Get accent color based on pattern
  const getAccentColor = () => {
    const accents = {
      0: "text-rose-400", // Accent for dark rose
      1: "text-blue-400", // Accent for dark blue
      2: "text-gray-400", // Accent for dark gray
      3: "text-amber-400" // Accent for dark amber
    };
    
    return accents[pattern];
  };
  
  return (
    <div 
      className="relative w-full aspect-video rounded-sm overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110"
    >
      {/* Cover background with website-matching gradients */}
      <div className={`absolute inset-0 ${getPatternStyle()}`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </pattern>
              <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
                <rect width="120" height="120" fill="url(#smallGrid)" />
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Vinyl record styled to match website aesthetic */}
      <div className="absolute -right-8 top-8 w-28 h-28 rounded-full bg-gray-900 shadow-lg opacity-90">
        <div className="absolute inset-3 rounded-full bg-gray-800 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white/80"></div>
        </div>
        <div className="absolute inset-9 rounded-full border border-gray-700 opacity-60"></div>
        <div className="absolute inset-12 rounded-full border border-gray-700 opacity-60"></div>
        <div className="absolute inset-16 rounded-full border border-gray-700 opacity-40"></div>
      </div>
      
      {/* Content overlay with black background to match website */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="bg-black/70 p-3">
          <div className={`uppercase tracking-widest font-bold ${getAccentColor()} text-xs`}>
            Preview Not Available
          </div>
          

        </div>
      </div>
      
      {/* Status indicator matching website style */}
      <div className="absolute top-3 left-3 bg-black/80 border border-gray-700 text-white text-xs px-2 py-1 font-medium">
        Preview For This Video is Not Available!
      </div>
    </div>
  );
}