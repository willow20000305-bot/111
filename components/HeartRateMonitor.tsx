import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Props {
  label: string;
  color: 'pink' | 'green';
  baseRate: number;
}

export const HeartRateMonitor: React.FC<Props> = ({ label, color, baseRate }) => {
  const [rate, setRate] = useState(baseRate);
  const [graphData, setGraphData] = useState<number[]>(new Array(20).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate heart rate slightly
      const fluctuation = Math.floor(Math.random() * 5) - 2;
      const newRate = baseRate + fluctuation;
      setRate(newRate);

      // Update graph bars
      setGraphData(prev => {
        const newData = [...prev.slice(1), Math.random() * 40 + 10];
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [baseRate]);

  const colorClass = color === 'pink' ? 'text-cyber-pink' : 'text-cyber-green';
  const bgClass = color === 'pink' ? 'bg-cyber-pink' : 'bg-cyber-green';

  return (
    <div className="bg-cyber-dark/80 backdrop-blur-md border border-white/10 p-4 rounded-lg w-64 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-2">
        <span className={`font-display text-sm uppercase tracking-widest ${colorClass}`}>{label}</span>
        <Heart className={`${colorClass} w-4 h-4 animate-pulse`} fill="currentColor" />
      </div>
      
      <div className="flex items-end gap-1 h-12 mb-2 opacity-80">
        {graphData.map((h, i) => (
          <div 
            key={i} 
            className={`w-2 rounded-t-sm transition-all duration-300 ${bgClass}`}
            style={{ height: `${h}%`, opacity: (i + 5) / 25 }}
          />
        ))}
      </div>

      <div className="flex justify-between items-baseline border-t border-white/10 pt-2">
        <span className="text-xs text-gray-400 font-mono">BPM</span>
        <span className="text-3xl font-mono font-bold text-white">{rate}</span>
      </div>
    </div>
  );
};