import React, { Suspense, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, useGLTF, Html, Preload, useProgress } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { 
  ChevronDown, 
  ArrowRight,
  Star,
  IndianRupee,
  Award,
  Factory,
  Wrench,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Globe,
  Zap
} from "lucide-react";

// Original Draco asset is public/models/gtb.glb. The page loads the meshopt
// version so the car does not wait on 247 Draco decodes or the gstatic decoder.
const MODEL_PATH = `${import.meta.env.BASE_URL}models/gtb-fast.glb`;
useGLTF.preload(MODEL_PATH, false, true);

function Model({ onLoad }) {
  const { scene } = useGLTF(MODEL_PATH, false, true);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return <primitive object={scene} scale={2} />;
}

function AutoRotatingModel({ onLoad }) {
  const orbitControlsRef = useRef();

  useEffect(() => {
    const controls = orbitControlsRef.current;
    if (!controls) return;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.enableZoom = false;
    controls.enablePan = false;
    if (controls.domElement) controls.domElement.style.touchAction = "pan-y";
    if (controls._domElementKeyEvents && typeof controls.stopListenToKeyEvents === "function") {
      controls.stopListenToKeyEvents();
    }
  }, []);

  return (
    <>
      <Model onLoad={onLoad} />
      <ModelLighting />
      <OrbitControls
        ref={orbitControlsRef}
        autoRotate
        autoRotateSpeed={2}
        enableZoom={false}
        enablePan={false}
        enableRotate
        keyEvents={false}
        target={[0, 0, 0]}
        minDistance={3.5}
        maxDistance={22}
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

function BrandCard({ name, count }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate({
      pathname: "/cars",
      search: `?brand=${encodeURIComponent(name)}`,
    });
  }, [name, navigate]);

  return (
    <div 
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
        <p className="text-zinc-400">{count === 1 ? "1 model" : `${count} models`}</p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-orange-600 flex items-center gap-2">
            View Models <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
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
      data-feature-label
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
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
      setIsMuted(true);
    });
    return () => {
      video.pause();
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
    <section data-section="video" className="relative w-full h-screen bg-black">
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

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
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
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
    </section>
  );
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [catalogCars, setCatalogCars] = useState([]);
  const scrollRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}data/cars.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch car data");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setCatalogCars(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setCatalogCars([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const catalog = useMemo(() => {
    const counts = new Map();
    let lowest = Infinity;
    let highest = -Infinity;

    for (const car of catalogCars) {
      if (!car?.brand) continue;
      counts.set(car.brand, (counts.get(car.brand) || 0) + 1);
      if (Number.isFinite(car.price)) {
        lowest = Math.min(lowest, car.price);
        highest = Math.max(highest, car.price);
      }
    }

    const brands = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    const priced = Number.isFinite(lowest) && Number.isFinite(highest);

    return {
      stats: [
        { value: String(catalogCars.length), label: "Models" },
        { value: String(counts.size), label: "Brands" },
        { value: priced ? inr.format(lowest) : "—", label: "Starts at" },
        { value: priced ? inr.format(highest) : "—", label: "Up to" },
      ],
      brands,
    };
  }, [catalogCars]);

  const indianInnovations = useMemo(() => [
    {
      title: "Electric Mobility",
      icon: Zap,
      description: "Battery EVs from brands in this catalog are on sale now."
    },
    {
      title: "Connected Cars",
      icon: Globe,
      description: "Phone connectivity, navigation, and over-the-air style features are now common."
    },
    {
      title: "Sustainable Manufacturing",
      icon: Factory,
      description: "Makers are publishing efficiency and cleaner-production steps alongside the cars."
    }
  ], []);

  const handleModelReady = useCallback(() => {
    setIsLoading(false);
    setIsModelVisible(true);
  }, []);

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

    document.querySelectorAll("[data-section]").forEach((section) => {
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
      <section data-section="hero" className="min-h-screen relative pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none"></div>
        
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
            <div className="relative h-[80vh]">
              <Canvas
                {...canvasProps}
                style={{ position: "relative", width: "100%", height: "100%", display: "block", touchAction: "pan-y" }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <AutoRotatingModel onLoad={handleModelReady} />
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
                onClick={() => navigate("/cars")}
                className="group bg-orange-700 hover:bg-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                disabled={isLoading}
              >
                Explore Indian Cars
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({ behavior: "smooth" });
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
        data-section="catalog"
        className="py-24 bg-[#1A1B25]"
      >
        {catalogCars.length > 0 && (
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {catalog.stats.map(({ value, label }) => (
              <div key={label} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-0.5 bg-orange-600 mx-auto mb-6"></div>
                <h3 className="text-3xl font-bold mb-2">{value}</h3>
                <p className="text-zinc-400 text-lg">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-400 mt-12">
            Prices are ex-showroom starting prices from the manufacturers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {catalog.brands.map((brand) => (
              <BrandCard
                key={brand.name}
                name={brand.name}
                count={brand.count}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/cars")}
              className="group bg-orange-600 text-white px-12 py-4 text-lg font-medium rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              View all cars
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        )}
      </section>

      <VideoSection title="The Spirit of Indian Engineering" />

      <section
        data-section="innovation"
        className="py-32 bg-zinc-900"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Indian Innovation Hub</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Indian manufacturers now sell electric, connected, and more efficient models in the same showrooms as petrol cars. IndiWheels lists current models with ex-showroom starting prices taken from each manufacturer's India site.
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
                src={`${import.meta.env.BASE_URL}img/hyundai-motor-group.jpg`}
                alt="Indian Automotive Innovation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-orange-600/80 hover:bg-orange-600 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </button>
      </div>
    </div>
  );
}

export default HomePage;
