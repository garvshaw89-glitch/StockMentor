import React from "react";

export const AmbientField: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Micro-grid overlay */}
      <div className="absolute inset-0 ambient-grid opacity-50 dark:opacity-30 pointer-events-none" />

      {/* 2. Atmospheric Soft Lighting Fields (Behind Content) */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 dark:opacity-20 bg-blue-500/30 dark:bg-[#6F9BFF]/15 pointer-events-none" 
      />
      <div 
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[160px] opacity-10 dark:opacity-15 bg-violet-500/30 dark:bg-[#8B7CFF]/15 pointer-events-none" 
      />
      <div 
        className="absolute -bottom-40 left-1/3 w-[700px] h-[500px] rounded-full blur-[180px] opacity-10 dark:opacity-15 bg-emerald-500/20 dark:bg-[#6EE7B7]/10 pointer-events-none" 
      />

      {/* 3. Peripheral Vignette (Ensures 100% Readability and High Editorial Contrast) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,6,7,0.75)_100%)] opacity-70 pointer-events-none" />
    </div>
  );
};

