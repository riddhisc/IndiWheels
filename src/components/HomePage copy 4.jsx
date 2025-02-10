import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  useGLTF, 
  Html, 
  Preload, 
  useProgress,
  PerspectiveCamera,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows
} from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { 
  ChevronDown, 
  Battery, 
  Gauge, 
  ArrowRight,
  Shield,
  Star,
  IndianRupee,
  Fuel,
  Settings,
  Award,
  Factory,
  Wrench
} from "lucide-react";

const VideoSection = React.lazy(() => import("./VideoSection"));


// Model Component
function Model({ onLoad }) {
  const { scene } = useGLTF("/models/gtb.glb");
  const { progress } = useProgress();
  
  useEffect(() => {
    if (progress === 100) {
      onLoad();
    }
  }, [progress, onLoad]);

  return <primitive object={scene} scale={2} />;
}

// Auto-rotating Model Component
function AutoRotatingModel({ onLoad }) {
  const orbitControlsRef = useRef();

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = true;
      orbitControlsRef.current.autoRotateSpeed = 2;
    }
  }, []);

  return (
    <>
      <Model onLoad={onLoad} />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
      />
    </>
  );
}

// Loading Component
function LoadingFallback() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-white text-lg font-light">Loading: {progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}


// Optimized Feature Label Component
const FeatureLabel = React.memo(function FeatureLabel({ children, className = "", icon: Icon }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Icon && <Icon className="w-5 h-5 text-orange-600" />}
      <div className="w-16 h-[1px] bg-orange-600"></div>
      <p className="text-zinc-300 text-sm tracking-wider">{children}</p>
    </div>
  );
});

// Main HomePage Component with optimization
function HomePage() {
  const navigate = useNavigate();
  const [fadeInClass, setFadeInClass] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    performance: false,
    heritage: false,
    technical: false,
    features: false,
    video: false,
    cta: false
  });


  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Memoized performance stats
  const performanceStats = useMemo(() => [
    { icon: Gauge, stat: "200 PS", label: "Max Power" },
    { icon: Settings, stat: "2.0L mStallion", label: "Engine" },
    { icon: Fuel, stat: "16.5 kmpl", label: "Mileage" }
  ], []);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        
        <div className="relative z-20">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-light mb-2 tracking-wider">INDIAN AUTOMOTIVE EXCELLENCE</h1>
              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-orange-600"></div>
                <p className="text-orange-600 font-medium">DISCOVER OUR HERITAGE</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="h-[80vh]">
              <Canvas
                camera={{ position: [0, 2, 10], fov: 45 }}
                dpr={window.devicePixelRatio}
                performance={{ min: 0.5 }}
              >
                <React.Suspense fallback={<LoadingFallback />}>
                  <PerspectiveCamera makeDefault />
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                  <AutoRotatingModel onLoad={() => setIsLoading(false)} />
                  <AdaptiveDpr pixelated />
                  <AdaptiveEvents />
                  <BakeShadows />
                </React.Suspense>
              </Canvas>

              {!isLoading && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Feature labels */}
                  <FeatureLabel 
                    className="absolute top-[15%] right-[10%] opacity-0 animate-fadeIn"
                    icon={Factory}
                  >
                    MADE IN INDIA
                  </FeatureLabel>
                  {/* Add other feature labels similarly */}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col items-center gap-8 w-full py-8">
              <button
                onClick={() => navigate('/cars')}
                className="group bg-orange-700 text-white px-12 py-4 text-lg font-medium rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                disabled={isLoading}
              >
                Explore Indian Cars
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white animate-bounce"
                aria-label="Scroll to content"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
          
        </div>
        
      </div>

      <div className="fixed inset-0 pointer-events-none select-none opacity-5">
          <h1 className="text-[20vw] font-bold tracking-tighter">INDIA</h1>
        </div>
    
      {/* Performance Stats Section */}
      <section
      ref={scrollRef}
      data-section="performance"
      className={`py-32 bg-gradient-to-b from-black to-zinc-900 ${fadeInClass} ${isVisible.performance ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Power Meets Luxury</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Gauge, stat: "200 PS", label: "Max Power" },
              { icon: Settings, stat: "2.0L mStallion", label: "Engine" },
              { icon: Fuel, stat: "16.5 kmpl", label: "Mileage" }
            ].map(({ icon: Icon, stat, label }) => (
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

      {/* Lazy-loaded Video Section */}
      <Suspense fallback={<div className="h-screen bg-black"></div>}>
        <VideoSection isVisible={isVisible.video} />
      </Suspense>

      {/* Heritage Section */}
      <section 
        data-section="heritage"
        className={`py-32 bg-zinc-900 ${fadeInClass} ${
          isVisible.heritage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Indian Engineering Excellence</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Experience the perfect blend of Indian innovation and world-class technology. 
                Our vehicles are designed and manufactured in India, embodying the spirit of 
                Make in India while meeting global standards of quality and performance.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Made in India", value: "100%" },
                  { label: "Service Centers", value: "500+" },
                  { label: "Cities Covered", value: "300+" },
                  { label: "Happy Customers", value: "1M+" }
                ].map(({ label, value }) => (
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
                alt="Indian Manufacturing"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Optimized animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
    will-change: transform, opacity;
  }

  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
`;
document.head.appendChild(style);

export default HomePage;