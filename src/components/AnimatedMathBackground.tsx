import React from 'react';

export const AnimatedMathBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Ambient Moving Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-200/30 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-200/25 blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-sky-200/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Floating Mathematical Geometric Symbols */}
      <div className="absolute top-[12%] left-[8%] text-3xl font-black text-amber-500/20 font-mono animate-float-slow">
        +
      </div>
      <div className="absolute top-[22%] right-[12%] text-4xl font-black text-rose-500/20 font-mono animate-float-fast" style={{ animationDelay: '1s' }}>
        ×
      </div>
      <div className="absolute top-[50%] left-[5%] text-4xl font-black text-sky-500/20 font-mono animate-float-slow" style={{ animationDelay: '2.5s' }}>
        ÷
      </div>
      <div className="absolute top-[68%] right-[8%] text-4xl font-black text-emerald-500/20 font-mono animate-float-fast" style={{ animationDelay: '0.8s' }}>
        −
      </div>
      <div className="absolute top-[35%] left-[18%] text-2xl font-black text-purple-500/15 font-mono animate-float-slow" style={{ animationDelay: '3.2s' }}>
        =
      </div>
      <div className="absolute top-[82%] left-[22%] text-3xl font-black text-amber-600/15 font-mono animate-float-fast" style={{ animationDelay: '1.7s' }}>
        %
      </div>
      <div className="absolute top-[18%] left-[45%] text-2xl font-black text-neutral-400/15 font-mono animate-float-slow" style={{ animationDelay: '4s' }}>
        ∑
      </div>
      <div className="absolute top-[75%] right-[28%] text-3xl font-black text-sky-600/15 font-mono animate-float-fast" style={{ animationDelay: '2s' }}>
        π
      </div>
      <div className="absolute top-[45%] right-[5%] text-xl font-black text-rose-400/20 font-mono animate-float-slow" style={{ animationDelay: '1.2s' }}>
        √
      </div>

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
};
