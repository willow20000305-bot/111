import React from 'react';
import { Image, Share2, Heart, Maximize2 } from 'lucide-react';

export const PanoramaPanel: React.FC = () => {
  return (
    <div className="absolute top-1/2 right-12 -translate-y-1/2 w-80 bg-cyber-deepPurple/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(138,43,226,0.2)] transform perspective-1000 rotate-y-[-5deg]">
        
        {/* Header */}
        <div className="bg-white/5 p-3 border-b border-white/10 flex justify-between items-center">
            <div>
                <h3 className="text-xs font-display font-bold text-white tracking-wider">LANDSCAPE VIEW SHARING</h3>
                <p className="text-[8px] font-mono text-gray-400">Like Data Statistics</p>
            </div>
            <div className="flex gap-2">
                <Share2 size={12} className="text-cyber-pink" />
            </div>
        </div>

        {/* Main View Area */}
        <div className="p-3">
            <div className="relative aspect-video bg-black/50 rounded border border-white/10 overflow-hidden mb-3 group">
                <img src="https://picsum.photos/id/16/400/250" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                
                {/* Overlay UI on Image */}
                <div className="absolute top-2 right-2">
                     <Maximize2 size={12} className="text-white drop-shadow-md" />
                </div>
                <div className="absolute bottom-2 left-2 flex gap-1">
                     <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                         <div className="h-full w-2/3 bg-cyber-pink"></div>
                     </div>
                </div>
            </div>

            {/* Grid Gallery - The "Code Path" of images */}
            <div className="flex gap-2 h-48">
                 {/* Sidebar Stats */}
                 <div className="w-6 flex flex-col gap-1 pt-2">
                    <div className="w-full h-32 border-r border-white/20 relative">
                        {/* Fake sparkline */}
                         <svg className="absolute inset-0 w-full h-full stroke-cyber-pink fill-none stroke-[1px]" viewBox="0 0 24 100" preserveAspectRatio="none">
                            <path d="M0,100 Q12,50 24,0" strokeDasharray="2 2" />
                            <path d="M0,80 Q12,60 24,40" className="stroke-cyber-cyan" />
                         </svg>
                    </div>
                 </div>

                 {/* Photo Grid */}
                 <div className="flex-1 grid grid-cols-3 gap-1 overflow-y-auto no-scrollbar content-start">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="aspect-square bg-white/5 rounded-sm overflow-hidden relative cursor-pointer hover:ring-1 hover:ring-cyber-cyan transition-all">
                             <img src={`https://picsum.photos/seed/${i + 40}/100/100`} className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                             {i === 4 && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                     <Heart size={10} className="text-cyber-pink fill-cyber-pink" />
                                 </div>
                             )}
                        </div>
                    ))}
                 </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="bg-white/5 p-2 text-[8px] font-mono text-center text-gray-500 border-t border-white/10">
            SYNCED_WITH_DEVICE_ID_9942
        </div>
    </div>
  );
};