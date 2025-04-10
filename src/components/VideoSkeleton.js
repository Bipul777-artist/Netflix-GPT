import React from 'react';

const VideoTrailerSkeleton = () => {
  return (
    <div className="w-full h-0 pb-[56.25%] bg-gray-800 relative overflow-hidden">
      {/* Main skeleton container with aspect ratio */}
      <div className="absolute inset-0">
        <div className="animate-pulse flex flex-col items-center justify-center h-full w-full">
          {/* Play button placeholder */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-700">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 text-gray-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          
          {/* Title placeholder */}
          <div className="mt-4 h-2 bg-gray-700 rounded w-32"></div>
          
          {/* Bottom video info bar placeholders */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
          
          {/* Shimmer animation effect */}
          <div className="absolute inset-0 w-full h-full">
            {/* Moving shimmer effect */}
            <div className="shimmer-container relative w-full h-full overflow-hidden">
              <div 
                className="absolute -inset-full animate-shimmer" 
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                  animation: 'shimmer 2s infinite linear'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this style for the shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default VideoTrailerSkeleton;