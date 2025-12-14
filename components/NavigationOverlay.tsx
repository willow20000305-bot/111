import React from 'react';
import { Wifi, Battery, MapPin, Navigation } from 'lucide-react';

export const NavigationOverlay: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-start pt-6 px-8 pointer-events-none">
      {/* Top Left: System Status */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-cyber-green font-mono text-sm">
            <Wifi size={16} />
            <span>AR_LINK: STABLE</span>
          </div>
          <div className="flex items-center gap-2 text-cyber-pink font-mono text-sm">
            <Battery size={16} />
            <span>PWR: 84%</span>
          </div>
          <div className="text-xs text-gray-400 font-display mt-1">SYS_V.9.2.4</div>
        </div>
      </div>

      {/* Top Center: Compass/Nav Strip */}
      <div className="flex-1 max-w-2xl mx-12">
        <div className="bg-cyber-dark/60 backdrop-blur-sm border-x border-cyber-green/30 h-12 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,157,0.1)_50%,transparent_100%)]"></div>
          
          {/* Compass Ticks */}
          <div className="flex gap-8 text-gray-500 font-mono text-xs w-full justify-between px-4">
             <span>NW</span><span>|</span><span>|</span><span>N</span><span>|</span><span className="text-white font-bold text-lg text-cyber-pink">NE</span><span>|</span><span>E</span>
          </div>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-cyber-pink"></div>
        </div>
        <div className="text-center mt-2">
           <span className="bg-black/80 text-cyber-green px-3 py-1 text-xs font-display tracking-[0.2em] rounded border border-cyber-green/30">
             DESTINATION: 1.2 KM
           </span>
        </div>
      </div>

      {/* Top Right: Environment */}
      <div className="flex flex-col items-end gap-1 font-mono text-right">
        <div className="text-4xl font-bold text-white">20:47</div>
        <div className="text-sm text-cyber-pink">TEMP: 22°C // HUM: 45%</div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <MapPin size={12} />
          <span>SHIBUYA SECTOR 4</span>
        </div>
      </div>
    </div>
  );
};