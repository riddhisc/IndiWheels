
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
  MapPin,
  Heart,
  Users,
  Truck,
  Globe,
  Zap
} from "lucide-react";

// Model Components remain the same
function Model({ onLoad }) {
  const modelPath = `${import.meta.env.BASE_URL}models/gtb.glb`;
  const { scene } = useGLTF(modelPath, true);
  const { progress } = useProgress();
  
  useEffect(() => {
    if (progress === 100) {
      onLoad();
    }
  }, [progress, onLoad]);

  return <primitive object={scene} scale={2} />;
}

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
      <ModelLighting />
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

// Unified BrandCard component
function BrandCard({ brand, onClick }) {
  const navigate = useNavigate();
  
  const handleClick = useCallback(() => {
    navigate('/cars', { 
      state: { 
        selectedBrand: brand.name,
        autoFilter: true 
      }
    });
    if (onClick) {
      onClick();
    }
  }, [brand.name, navigate, onClick]);

  return (
    <div 
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2 text-white">{brand.name}</h3>
        <p className="text-zinc-400">{brand.desc}</p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-orange-600 flex items-center gap-2">
            View Models <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
      {brand.image && (
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

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
        <div className="text-white text-lg font-light mt-4">Loading Your Indian Automotive Experience</div>
      </div>
    </Html>
  );
}

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

function VideoSection({ title = "Experience Indian Engineering" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
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
        <source src={`${import.meta.env.BASE_URL}video/car.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
            Witness the perfect blend of Indian innovation, engineering excellence, and global standards
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

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const scrollRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');

  const performanceStats = useMemo(() => [
    { icon: Factory, stat: "7+ Brands", label: "Made in India" },
    { icon: Globe, stat: "150+ Countries", label: "Global Exports" },
    { icon: Users, stat: "5M+", label: "Indian Owners" },
    { icon: Heart, stat: "92%", label: "Customer Satisfaction" },
    { icon: Truck, stat: "2M+", label: "Annual Production" }
  ], []);

  const heritageStats = useMemo(() => [
    { label: "Indian R&D Centers", value: "50+" },
    { label: "Manufacturing Plants", value: "30+" },
    { label: "Employment Generation", value: "1.5M+" },
    { label: "Export Revenue", value: "$15B+" }
  ], []);

  const technicalFeatures = useMemo(() => [
    {
      icon: Shield,
      title: "Indian Innovation",
      description: "Advanced technology developed by Indian engineers, perfectly suited for diverse road conditions."
    },
    {
      icon: Settings,
      title: "Made for India",
      description: "Vehicles designed specifically for Indian conditions with enhanced features and durability."
    },
    {
      icon: Wrench,
      title: "Global Standards",
      description: "Meeting international quality benchmarks while maintaining cost-effectiveness."
    }
  ], []);

  const featuredBrands = useMemo(() => [
    { 
      name: "Tata Motors", 
      desc: "Leading the EV revolution",
      specialties: ["Electric Vehicles", "Premium SUVs", "Commercial Vehicles"]
    },
    { 
      name: "Mahindra & Mahindra", 
      desc: "Adventure-ready SUVs",
      specialties: ["Rugged SUVs", "Electric Vehicles", "Farm Equipment"]
    },
    { 
      name: "Maruti Suzuki", 
      desc: "People's choice",
      specialties: ["Compact Cars", "Family Vehicles", "SUVs"]
    },
    { 
      name: "Hyundai India", 
      desc: "Robust utility vehicles",
      specialties: ["Commercial Vehicles", "Off-road Vehicles", "Defense Vehicles"]
    }
  ], []);

  const indianInnovations = useMemo(() => [
    {
      title: "Electric Mobility",
      icon: Zap,
      description: "Leading the charge in affordable electric vehicles"
    },
    {
      title: "Connected Cars",
      icon: Globe,
      description: "Advanced IoT integration for smart mobility"
    },
    {
      title: "Sustainable Manufacturing",
      icon: Factory,
      description: "Green production practices and recycling initiatives"
    }
  ], []);

  const observeSection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.dataset.section);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observeSection, {
      threshold: 0.3
    });

    document.querySelectorAll('[data-section]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [observeSection]);

  const canvasProps = useMemo(() => ({
    camera: { position: [0, 2, 10], fov: 45 },
    dpr: Math.min(window.devicePixelRatio, 2),
    performance: { min: 0.5 },
    gl: { 
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      logarithmicDepthBuffer: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.2,
    }
  }), []);

  return (
    <div className="bg-black text-white">
      <section data-section="hero" className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        
        <div className="relative z-20">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-light mb-2 tracking-wider">
                DISCOVER INDIA'S AUTOMOTIVE LEGACY
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-orange-600"></div>
                <p className="text-orange-600 font-medium">
                  SHOWCASING INDIA'S FINEST AUTOMOBILES
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
                   MAKE IN INDIA EXCELLENCE
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute bottom-[40%] left-[10%]"
                    icon={Wrench}
                    delay={400}
                  >
                    INDIGENOUS ENGINEERING
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute top-[30%] left-[15%]"
                    icon={Award}
                    delay={600}
                  >
                    GLOBAL QUALITY STANDARDS
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute bottom-[30%] right-[20%]"
                    icon={Star}
                    delay={800}
                  >
                    INDIAN INNOVATION
                  </FeatureLabel>
                  <FeatureLabel 
                    className="absolute top-[50%] right-[15%]"
                    icon={IndianRupee}
                    delay={1000}
                  >
                    WORLD-CLASS VALUE
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
                Explore Indian Cars
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-white animate-bounce"
                aria-label="Scroll to content"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={scrollRef}
        data-section="brands"
        className="py-24 bg-gradient-to-b from-zinc-900 to-black"
      >
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Proud Indian Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBrands.map((brand) => (
              <BrandCard 
                key={brand.name}
                brand={brand}
               
              />
            ))}
          </div>
        </div>
      </section>

      <section 
        data-section="stats"
        className="py-32 bg-black"
      >
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-center">Indian Automotive Power</h2>
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

      <VideoSection title="The Spirit of Indian Engineering"  />

      <section 
        data-section="innovation"
        className="py-32 bg-zinc-900"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Indian Innovation Hub</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                India's automotive sector is at the forefront of global innovation, combining cutting-edge technology with sustainable practices. Our manufacturers are leading the way in electric mobility, connected vehicles, and smart manufacturing.
              </p>
              <div className="grid grid-cols-1 gap-8">
                {indianInnovations.map(({ title, icon: Icon, description }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="bg-orange-600/20 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{title}</h3>
                      <p className="text-zinc-400">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-black/20"></div>
              <img
                src={`${import.meta.env.BASE_URL}/img/hyundai-motor-group.jpg`}
                alt="Indian Automotive Innovation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section 
        data-section="cta"
        className="py-32 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-orange-600/5"></div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-8">Experience Indian Engineering</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Discover the perfect blend of innovation, performance, and value in India's finest automobiles.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => navigate('/cars')}
                className="group bg-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                View All Cars
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border border-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full hover:bg-orange-600/10 transition-all duration-300 flex items-center gap-2">
                Compare Models
                <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </section>

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