import React, { Suspense, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, useGLTF, Html, Preload, useProgress } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { 
  ChevronDown, 
  Gauge, 
  ArrowRight,
  Star,
  IndianRupee,
  Fuel,
  Settings,
  Award,
  Factory,
  Wrench,
  Play,
  Pause,
  Volume2, 
  VolumeX,
  Clock,
  Shield,
  MapPin
} from "lucide-react";

// Progressive loading for Model
function Model({ onLoad }) {
  const gltf = useGLTF("/models/gtb.glb", true);
  const { progress } = useProgress();
  
  useEffect(() => {
    if (progress === 100) {
      // Enhanced material settings for a vibrant red car
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Check if it's the car body material
          if (child.material.name.toLowerCase().includes('body') || 
              child.material.name.toLowerCase().includes('exterior')) {
            // Set to vibrant red color
            child.material.color.setHex(0xff0000);
            child.material.roughness = 0.2; // More glossy
            child.material.metalness = 0.9; // More metallic
            child.material.clearcoat = 1.0; // Add clearcoat for car paint effect
            child.material.clearcoatRoughness = 0.1;
            child.material.envMapIntensity = 1.5; // Enhance reflections
          } else {
            // For other materials (glass, chrome, etc.)
            child.material.roughness = 0.4;
            child.material.metalness = 0.8;
            child.material.envMapIntensity = 1.2;
          }
          
          child.receiveShadow = true;
          child.castShadow = true;
          child.frustumCulled = true;
          
          if (child.geometry) {
            child.geometry.computeBoundingSphere();
            child.geometry.computeBoundingBox();
          }
        }
      });
      onLoad();
    }
  }, [progress, onLoad, gltf.scene]);

  return <primitive object={gltf.scene} scale={2} dispose={null} />;
}


// Enhanced lighting setup
function ModelLighting() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-10, 10, -5]}
        intensity={1}
        castShadow
      />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.8}
        angle={Math.PI / 4}
        penumbra={0.1}
        castShadow
      />
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x444444}
        intensity={0.7}
      />
    </>
  );
}


// Loading Component with Progress
function LoadingFallback() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="w-20 h-20 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-orange-600 text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
        </div>
        <div className="text-white text-lg font-light mt-4">Loading Your Indian Car Experience</div>
      </div>
    </Html>
  );
}

// Optimized AutoRotatingModel with RAF cleanup
function AutoRotatingModel({ onLoad }) {
  const orbitControlsRef = useRef();
  const rotationSpeed = useRef(0);
  const animationFrameRef = useRef();
  const targetRotationSpeed = 2;

  useEffect(() => {
    if (orbitControlsRef.current) {
      const animate = () => {
        if (rotationSpeed.current < targetRotationSpeed) {
          rotationSpeed.current += 0.05;
          orbitControlsRef.current.autoRotateSpeed = rotationSpeed.current;
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      orbitControlsRef.current.autoRotate = true;
      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, []);

  return (
    <>
      <ModelLighting />
      <Model onLoad={onLoad} />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  );
}

// Feature Label Component with Intersection Observer
function FeatureLabel({ children, className = "", icon: Icon, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const labelRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (labelRef.current) {
      observer.observe(labelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={labelRef}
      className={`
        flex items-center gap-3 
        transform transition-all duration-700 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {Icon && <Icon className="w-5 h-5 text-orange-600" />}
      <div className="w-16 h-[1px] bg-orange-600"></div>
      <p className="text-zinc-300 text-sm tracking-wider">{children}</p>
    </div>
  );
}

// Optimized Video Section Component
function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for autoplay policy
        setIsPlaying(false);
        setIsMuted(true);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return (
    <section className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover absolute inset-0"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
      >
        <source src="/video/car.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl font-bold mb-4 text-white">Experience Indian Engineering</h2>
          <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
            Witness the perfect blend of power, precision, and indigenous innovation
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
    </section>
  );
}

// Smooth scroll utility
const smoothScroll = (target, duration = 1000) => {
  const start = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top;
  const startTime = performance.now();

  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animation = (currentTime) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, start + targetPosition * ease(progress));

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Custom Intersection Observer Hook
function useIntersectionObserver(callback, options = {}) {
  const observerRef = useRef();

  const observe = useCallback((element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(callback, options);

    if (element) {
      observerRef.current.observe(element);
    }
  }, [callback, options]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return observe;
}

// Main HomePage Component
function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const scrollRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Memoized static data
  const performanceStats = useMemo(() => [
    { icon: Gauge, stat: "320 PS", label: "Max Power" },
    { icon: Settings, stat: "2.0L mStallion", label: "Engine" },
    { icon: Fuel, stat: "20.5 kmpl", label: "Mileage" },
    { icon: Clock, stat: "6.5 sec", label: "0-100 km/h" },
    { icon: Wrench, stat: "4x4", label: "Drive System" }
  ], []);

  const heritageStats = useMemo(() => [
    { label: "Made in India", value: "100%" },
    { label: "Service Centers", value: "1000+" },
    { label: "Cities Covered", value: "500+" },
    { label: "Happy Customers", value: "2M+" }
  ], []);

  const technicalFeatures = useMemo(() => [
    {
      icon: Shield,
      title: "Safety First",
      description: "5-star safety rating with advanced driver assistance systems and multiple airbags for complete peace of mind."
    },
    {
      icon: Settings,
      title: "Smart Features",
      description: "Connected car technology with smartphone integration, voice commands, and over-the-air updates."
    },
    {
      icon: MapPin,
      title: "Local Innovation",
      description: "Designed for Indian roads with advanced terrain management and climate control systems."
    }
  ], []);

  // Optimized section observer
  const observeSection = useIntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
          entry.target.classList.add('animate-in');
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px' }
  );

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(observeSection);
  }, [observeSection]);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      smoothScroll(scrollRef.current);
    }
  }, []);

  // Canvas optimization
  const canvasProps = useMemo(() => ({
    camera: { position: [0, 2, 10], fov: 45 },
    dpr: Math.min(window.devicePixelRatio, 2),
    performance: { min: 0.5 },
    gl: { 
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      logarithmicDepthBuffer: true, // Better depth precision
      toneMapping: THREE.ACESFilmicToneMapping, // Enhanced color reproduction
      toneMappingExposure: 1.2, // Slightly brighter
    }
  }), []);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section data-section="hero" className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        
        <div className="relative z-20">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-light mb-2 tracking-wider">
                INDIA'S FINEST AUTOMOBILES
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-orange-600"></div>
                <p className="text-orange-600 font-medium">
                  LEADING THE AUTOMOTIVE REVOLUTION
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="h-[80vh]">
            <Canvas {...canvasProps}>
      <Suspense fallback={<LoadingFallback />}>
        <AutoRotatingModel 
          onLoad={() => {
            setIsLoading(false);
            setIsModelVisible(true);
          }} 
        />
        <Preload all />
      </Suspense>
    </Canvas>

              {isModelVisible && (
                <div className="absolute inset-0 pointer-events-none">
                  <FeatureLabel 
                    className="absolute top-[15%] right-[10%]"
                    icon={Factory}
                    delay={200}
                  >
                    MADE IN INDIA
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute bottom-[40%] left-[10%]"
                    icon={Wrench}
                    delay={400}
                  >
                    WORLD-CLASS ENGINEERING
                  </FeatureLabel>

                  <FeatureLabel 
                    className="absolute top-[30%] left-[15%]"
                    icon={Award}
                    delay={600}
                  >
                    GLOBALLY CERTIFIED
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute bottom-[30%] right-[20%]"
                    icon={Star}
                    delay={800}
                  >
                    PREMIUM QUALITY
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute top-[50%] right-[15%]"
                    icon={IndianRupee}
                    delay={1000}
                  >
                    VALUE FOR MONEY
                  </FeatureLabel>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-8 w-full py-8">
              <button
                onClick={() => navigate('/cars')}
                className="group bg-orange-700 hover:bg-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                disabled={isLoading}
              >
                Explore Our Cars
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleScroll}
                className="text-white animate-bounce"
                aria-label="Scroll to content"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats Section */}
      <section 
        ref={scrollRef}
        data-section="performance"
        className="py-32 bg-gradient-to-b from-black to-zinc-900"
      >
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Power Meets Innovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {performanceStats.map(({ icon: Icon, stat, label }) => (
              <div key={label} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-600/20 blur-xl rounded-full"></div>
                  <Icon className="w-16 h-16 mx-auto mb-4 text-orange-600 relative" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat}</h3>
                <p className="text-zinc-400 text-lg">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Heritage Section */}
      <section 
        data-section="heritage"
        className="py-32 bg-zinc-900"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Indian Engineering Excellence</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Experience the pinnacle of Indian automotive innovation. Our vehicles are designed, developed, and manufactured in India, embodying the spirit of Atmanirbhar Bharat while setting new benchmarks in global automotive excellence.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {heritageStats.map(({ label, value }) => (
                  <div key={label} className="border-l-2 border-orange-600 pl-4">
                    <h3 className="text-2xl font-bold mb-1">{value}</h3>
                    <p className="text-zinc-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-black/20 rounded-lg"></div>
              <img
                src="/api/placeholder/600/400"
                alt="Indian Manufacturing Excellence"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section 
        data-section="technical"
        className="py-32 bg-black"
      >
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {technicalFeatures.map(({ icon: Icon, title, description }) => (
              <div 
                key={title} 
                className="bg-zinc-900/50 p-8 rounded-xl hover:bg-zinc-800/50 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        data-section="cta"
        className="py-32 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-orange-600/5"></div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-8">Begin Your Journey</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join the revolution in Indian automotive excellence. Experience the perfect blend of power, technology, and comfort.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="group bg-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                Book Test Drive
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border border-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full hover:bg-orange-600/10 transition-all duration-300 flex items-center gap-2">
                Download Brochure
                <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation Hint */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </button>
      </div>
    </div>
  );
}

export default HomePage;