import React, { useMemo } from 'react';

// Generates a random set of connected points to simulate the "code path"
export const DataPathOverlay: React.FC = () => {
  const nodes = useMemo(() => {
    // Generate ~15 random nodes in the central area
    const points = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 60, // Keep mostly left/center
      y: 20 + Math.random() * 60,
      size: Math.random() > 0.8 ? 6 : 3
    }));
    
    // Create connections
    const links: { from: number; to: number }[] = [];
    points.forEach((p, i) => {
        // Connect to 1-2 random other nodes
        const numLinks = Math.floor(Math.random() * 2) + 1;
        for(let j=0; j<numLinks; j++) {
            const target = Math.floor(Math.random() * points.length);
            if (target !== i) links.push({ from: i, to: target });
        }
    });

    return { points, links };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg className="w-full h-full opacity-60">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        {/* Draw Links */}
        {nodes.links.map((link, i) => {
            const p1 = nodes.points[link.from];
            const p2 = nodes.points[link.to];
            return (
                <line 
                    key={`line-${i}`}
                    x1={`${p1.x}%`} 
                    y1={`${p1.y}%`} 
                    x2={`${p2.x}%`} 
                    y2={`${p2.y}%`}
                    stroke={i % 2 === 0 ? "#ff00ff" : "#00ffff"}
                    strokeWidth="0.5"
                    strokeDasharray="4 2"
                    filter="url(#glow)"
                />
            );
        })}

        {/* Draw Nodes */}
        {nodes.points.map((p, i) => (
             <g key={`node-${i}`}>
                 <circle cx={`${p.x}%`} cy={`${p.y}%`} r={p.size} fill="#fff" fillOpacity="0.8" filter="url(#glow)" />
                 <circle cx={`${p.x}%`} cy={`${p.y}%`} r={p.size + 4} stroke={i % 3 === 0 ? "#ff00ff" : "#00ffff"} strokeWidth="1" fill="none" opacity="0.5" />
                 {p.size > 4 && (
                     <text x={`${p.x + 1}%`} y={`${p.y - 1}%`} fill="#fff" fontSize="8" fontFamily="monospace">
                         NODE_{p.id.toString().padStart(2, '0')}
                     </text>
                 )}
             </g>
        ))}
      </svg>
    </div>
  );
};