import React, { useState, useEffect } from 'react';
import { Car, Gauge, CarFront, Users, Fuel } from 'lucide-react';

const CarLoadingAnimation = ({ message = "Loading..." }) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [
    { Icon: Car, color: '#f97316' },
    { Icon: Gauge, color: '#3b82f6' },
    { Icon: CarFront, color: '#ef4444' },
    { Icon: Users, color: '#10b981' },
    { Icon: Fuel, color: '#8b5cf6' }
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 5);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Cycle through icons
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 900);
    
    return () => {
      clearInterval(interval);
      clearInterval(iconInterval);
    };
  }, []);
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="relative flex flex-col items-center">
          {/* Animated car icon */}
          <div 
            className="mb-8 transform transition-all duration-700 animate-pulse"
            style={{ 
              transform: `translateY(${Math.sin(Date.now() / 500) * 8}px)` 
            }}
          >
            {icons.map(({ Icon, color }, index) => (
              <Icon 
                key={index}
                className="w-16 h-16 transition-all duration-500 absolute top-0 left-1/2 transform -translate-x-1/2"
                style={{ 
                  opacity: currentIcon === index ? 1 : 0,
                  color
                }}
              />
            ))}
          </div>
          
          {/* Loading message */}
          <div className="text-xl font-medium mb-6">{message}</div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Loading tips */}
          <div className="text-sm text-gray-400 text-center italic">
            {progress < 33 && "Fetching the latest car information..."}
            {progress >= 33 && progress < 66 && "Polishing the headlights..."}
            {progress >= 66 && progress < 100 && "Almost there..."}
            {progress === 100 && "Starting the engine..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoadingAnimation;