import React from 'react';

export const RouteProgress: React.FC = () => {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-2/3 bg-cyber-dark/80 backdrop-blur-md border border-white/20 p-4 rounded-xl">
      <div className="flex justify-between mb-2 text-xs font-display tracking-widest text-gray-400">
        <span>START POINT</span>
        <span className="text-white">DATE PROGRESS: 54%</span>
        <span>FINAL DESTINATION</span>
      </div>
      
      {/* The Bar */}
      <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden relative border border-white/10">
        {/* Completed Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-[54%] bg-gradient-to-r from-cyber-pink via-purple-500 to-cyber-green animate-pulse">
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30"></div>
        </div>
        {/* Uncompleted */}
        <div className="absolute right-0 top-0 bottom-0 w-[46%] bg-gray-900/80">
           <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#000_5px,#000_10px)] opacity-20"></div>
        </div>
      </div>

      {/* Checkpoints */}
      <div className="relative w-full h-2 mt-2">
         <div className="absolute left-[20%] -top-1 w-2 h-2 bg-cyber-pink rounded-full shadow-[0_0_10px_#ff00ff]"></div>
         <div className="absolute left-[54%] -top-1 w-3 h-3 bg-white border-2 border-cyber-green rounded-full shadow-[0_0_15px_#00ff9d] z-10">
            <div className="absolute -top-8 -left-12 w-28 bg-black/90 text-[10px] text-center py-1 text-cyber-green border border-cyber-green/50">
               CURRENT LOCATION
            </div>
         </div>
         <div className="absolute left-[80%] -top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};