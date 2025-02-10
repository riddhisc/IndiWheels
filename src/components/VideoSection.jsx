import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

function VideoSection({ isVisible }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      data-section="video"
      className="relative w-full h-screen bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover absolute inset-0"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/api/placeholder/1920/1080"
      >
        <source src="/video/car.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl font-bold mb-4 text-white">Experience the Power</h2>
          <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
            Witness the perfect harmony of power and precision in every detail
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        
        <button
          onClick={toggleMute}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
      </div>
    </section>
  );
}

export default VideoSection;