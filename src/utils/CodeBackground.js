import React, { useEffect } from 'react';

const CodeBackground = () => {
  useEffect(() => {
    // Create random code lines on component mount
    const createRandomCodeLines = () => {
      const backgroundContainer = document.getElementById('background-container');
      if (!backgroundContainer) return;
      
      const codeLineLengths = ['w-16', 'w-32', 'w-48']; // short, medium, long
      const codeLineColors = [
        'bg-red-200', 'bg-pink-300', 'bg-red-300', 'bg-pink-200', 'bg-rose-300'
      ];
      
      // Create 30 random code lines
      for (let i = 0; i < 30; i++) {
        const codeLine = document.createElement('div');
        
        // Add base classes
        codeLine.classList.add(
          'absolute', 'h-2', 'rounded', 'opacity-10'
        );
        
        // Add random length class
        const randomLengthClass = codeLineLengths[Math.floor(Math.random() * codeLineLengths.length)];
        codeLine.classList.add(randomLengthClass);
        
        // Add random color class
        const randomColorClass = codeLineColors[Math.floor(Math.random() * codeLineColors.length)];
        codeLine.classList.add(randomColorClass);
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        codeLine.style.top = `${top}%`;
        codeLine.style.left = `${left}%`;
        
        // Add to container
        backgroundContainer.appendChild(codeLine);
      }
    };
    
    createRandomCodeLines();
    
    // Cleanup function
    return () => {
      const backgroundContainer = document.getElementById('background-container');
      if (backgroundContainer) {
        const codeLines = backgroundContainer.querySelectorAll('.code-line');
        codeLines.forEach(line => line.remove());
      }
    };
  }, []);
  
  return (
    <div 
      id="background-container"
      className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-br from-pink-950 via-red-900 to-pink-900"
    >
      {/* Gradient blobs */}
      <div className="absolute top-[10%] left-[5%] h-80 w-80 rounded-full bg-pink-600/30 blur-[80px]"></div>
      <div className="absolute bottom-[20%] right-[15%] h-64 w-64 rounded-full bg-red-500/30 blur-[80px]"></div>
      <div className="absolute bottom-[10%] left-[30%] h-72 w-72 rounded-full bg-rose-400/30 blur-[80px]"></div>
      
      {/* Predefined code lines */}
      {/* Top left */}
      <div className="absolute top-12 left-5 h-2 w-20 rounded bg-red-200 opacity-10"></div>
      <div className="absolute top-[70px] left-8 h-2 w-36 rounded bg-pink-300 opacity-10"></div>
      <div className="absolute top-[90px] left-4 h-2 w-48 rounded bg-red-300 opacity-10"></div>
      
      {/* Top right */}
      <div className="absolute top-14 right-6 h-2 w-32 rounded bg-pink-200 opacity-10"></div>
      <div className="absolute top-[80px] right-16 h-2 w-20 rounded bg-rose-300 opacity-10"></div>
      
      {/* Bottom left */}
      <div className="absolute bottom-24 left-12 h-2 w-48 rounded bg-red-300 opacity-10"></div>
      <div className="absolute bottom-[80px] left-8 h-2 w-20 rounded bg-pink-300 opacity-10"></div>
      
      {/* Bottom right */}
      <div className="absolute bottom-28 right-10 h-2 w-32 rounded bg-rose-300 opacity-10"></div>
      <div className="absolute bottom-[90px] right-5 h-2 w-48 rounded bg-red-200 opacity-10"></div>
    </div>
  );
};


export default CodeBackground;