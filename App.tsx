import React, { useState, useEffect } from 'react';
import { generateCityBlueprint } from './services/geminiService';
import { HeartRateMonitor } from './components/HeartRateMonitor';
import { NavigationOverlay } from './components/NavigationOverlay';
import { PanoramaPanel } from './components/PanoramaPanel';
import { PartnerWidget } from './components/PartnerWidget';
import { DataPathOverlay } from './components/DataPathOverlay';
import { GenerationStatus } from './types';
import { Loader2, Camera, Layers, Zap } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (hasKey) setApiKey(process.env.API_KEY || '');
      } else if (process.env.API_KEY) {
         setApiKey(process.env.API_KEY);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      setApiKey(process.env.API_KEY || 'valid'); 
    }
  };

  const handleGenerate = async () => {
    if (!apiKey) await handleSelectKey();
    setStatus(GenerationStatus.LOADING);
    try {
      const currentKey = process.env.API_KEY || apiKey;
      const imageUrl = await generateCityBlueprint(currentKey);
      setGeneratedImage(imageUrl);
      setStatus(GenerationStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(GenerationStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-deepPurple flex flex-col items-center justify-center p-4 font-sans text-white overflow-hidden relative">
      
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(138,43,226,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(138,43,226,0.1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      {/* Control Panel */}
      <div className="z-50 absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="bg-black/90 p-2 rounded-full border border-cyber-purple shadow-2xl backdrop-blur-sm flex items-center gap-4 px-6">
            <h1 className="text-sm font-display font-bold text-cyber-cyan hidden sm:block">CYBERLOVE AR</h1>
             <button
            onClick={handleGenerate}
            disabled={status === GenerationStatus.LOADING}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full font-mono text-xs font-bold tracking-wider transition-all
              ${status === GenerationStatus.LOADING 
                ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                : 'bg-cyber-purple text-white hover:bg-cyber-pink hover:shadow-[0_0_15px_#ff00ff]'}`}
          >
            {status === GenerationStatus.LOADING ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Zap size={14} />
            )}
            {status === GenerationStatus.LOADING ? 'GENERATING...' : 'GENERATE'}
          </button>
          
           {status === GenerationStatus.SUCCESS && (
            <button 
              onClick={() => setShowUI(!showUI)}
              className="p-2 rounded-full border border-white/20 hover:bg-white/10 text-cyber-cyan"
            >
              <Layers size={14} />
            </button>
          )}
        </div>
      </div>

      {/* The AR Viewport */}
      {/* Aspect Ratio 840:297 is approx 2.82:1 (Ultrawide) */}
      <div className="relative w-full max-w-7xl aspect-[2.82/1] bg-[#0a0514] border-2 border-cyber-purple/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(138,43,226,0.15)] group transition-all duration-500">
        
        {/* 1. Generated Image Layer */}
        {generatedImage ? (
          <img 
            src={generatedImage} 
            alt="Cyberpunk City AR Map" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cyber-purple/30">
            <div className="w-96 h-96 border border-current rounded-full flex items-center justify-center animate-pulse">
                <div className="w-64 h-64 border border-current rounded-full flex items-center justify-center">
                    <Camera size={48} />
                </div>
            </div>
            <p className="font-mono uppercase tracking-widest mt-8">INITIALIZE_SYSTEM...</p>
          </div>
        )}

        {/* 2. AR Overlay Layer */}
        {showUI && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            
            {/* Environment Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] opacity-80"></div>
            <DataPathOverlay />
            
            {/* Top HUD */}
            <NavigationOverlay />

            {/* Widgets */}
            <PartnerWidget name="BETTY LORA" image="https://picsum.photos/id/64/200/200" />
            
            <PanoramaPanel />

            {/* Floating Biometrics (Moved to bottom left to match reference style) */}
            <div className="absolute bottom-8 left-12 flex gap-4">
                 <HeartRateMonitor label="MY PULSE" color="green" baseRate={75} />
                 <HeartRateMonitor label="BETTY" color="pink" baseRate={82} />
            </div>

            {/* Central Route Text */}
            <div className="absolute top-[30%] left-[25%] pointer-events-auto">
               <div className="text-[10px] font-mono text-cyber-cyan bg-black/60 px-2 border-l-2 border-cyber-cyan">
                  CODE_PATH: #88492
               </div>
            </div>

          </div>
        )}
        
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-cyber-pink/40 rounded-tl-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-cyber-purple/40 rounded-br-3xl opacity-50"></div>

      </div>

      <div className="mt-4 text-cyber-purple/50 font-mono text-xs flex gap-4">
        <span>DIM: 840x297mm</span>
        <span>|</span>
        <span>MODE: CODE_PATH_VISUALIZATION</span>
        <span>|</span>
        <span>SYNC: ACTIVE</span>
      </div>
    </div>
  );
}