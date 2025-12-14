import React from 'react';
import { Radio, Mic } from 'lucide-react';

interface Props {
  name: string;
  image: string;
}

export const PartnerWidget: React.FC<Props> = ({ name, image }) => {
  return (
    <div className="absolute top-8 left-8 flex flex-col gap-4 animate-float">
      {/* Main Avatar Circle */}
      <div className="relative group">
        {/* Rotating Rings */}
        <div className="absolute inset-0 rounded-full border border-cyber-pink/30 w-32 h-32 -m-2 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full border-t border-cyber-cyan/50 w-32 h-32 -m-2 animate-[spin_3s_linear_infinite_reverse]"></div>
        
        <div className="w-28 h-28 rounded-full border-2 border-white/20 overflow-hidden relative bg-black/50 backdrop-blur-sm">
          <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 w-full bg-cyber-pink/80 text-[8px] font-display text-center py-1 text-black font-bold">
            CONNECTED
          </div>
        </div>
        
        {/* Label Tag */}
        <div className="absolute top-4 -right-24 bg-cyber-dark/80 border border-cyber-pink px-3 py-1 text-xs font-display">
          <div className="text-[8px] text-gray-400">CONNECTED TO</div>
          <div className="text-white font-bold tracking-wider">{name}</div>
        </div>
      </div>

      {/* Audio Waveform Viz */}
      <div className="w-48 bg-cyber-dark/60 border border-cyber-cyan/30 p-2 rounded relative overflow-hidden">
        <div className="flex justify-between items-center mb-1">
           <Mic size={10} className="text-cyber-cyan" />
           <span className="text-[8px] font-mono text-cyber-cyan">VOICE_CHANNEL_01</span>
        </div>
        <div className="flex items-end gap-[2px] h-8">
           {Array.from({ length: 20 }).map((_, i) => (
             <div 
                key={i} 
                className="w-1 bg-cyber-cyan/60 animate-pulse" 
                style={{ 
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.05}s`
                }} 
             />
           ))}
        </div>
      </div>
    </div>
  );
};