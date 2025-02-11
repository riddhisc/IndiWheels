import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CarFront, 
  Fuel, 
  Gauge, 
  Users, 
  CreditCard, 
  Calendar, 
  ArrowLeft, 
  ArrowRight,
  Download,
  Settings,
  Home
} from 'lucide-react';

// Color mapping function
const getColorHex = (colorName) => {
  const colorMap = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    yellow: '#FFFF00',
    purple: '#800080',
    orange: '#FFA500',
    brown: '#A52A2A',
    gray: '#808080',
    silver: '#C0C0C0',
    gold: '#FFD700',
    bronze: '#CD7F32',
    pearl: '#F0EAD6',
    metallic: '#C0C0C0',
    'pearl white': '#FAFAFA',
    'midnight black': '#141414',
    'racing red': '#FF0000',
    'royal blue': '#4169E1',
    'forest green': '#228B22',
    'silver grey': '#C0C0C0',
    'cosmic grey': '#808080',
    'crystal white': '#FFFFFF',
    'phantom black': '#000000',
    'mystic blue': '#2E5090',
    'burgundy red': '#800020',
    'racing green': '#004225',
    'galaxy blue': '#2A4B7C',
    'graphite grey': '#383838',
  };

  const cleanColorName = colorName.toLowerCase().trim();

  if (colorMap[cleanColorName]) {
    return colorMap[cleanColorName];
  }

  const partialMatch = Object.entries(colorMap).find(([key]) => 
    cleanColorName.includes(key) || key.includes(cleanColorName)
  );

  if (partialMatch) {
    return partialMatch[1];
  }

  return '#808080';
};

const ColorSwatch = ({ colorName }) => {
  const [colorHex, setColorHex] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setColor = async () => {
      try {
        const hex = getColorHex(colorName);
        setColorHex(hex);
      } catch (error) {
        console.error('Error setting color:', error);
        setColorHex('#808080');
      } finally {
        setIsLoading(false);
      }
    };

    setColor();
  }, [colorName]);

  return (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors">
      {isLoading ? (
        <div className="w-8 h-8 rounded-full animate-pulse bg-gray-600" />
      ) : (
        <div 
          className="w-8 h-8 rounded-full border-2 border-gray-700"
          style={{ 
            backgroundColor: colorHex,
            boxShadow: colorHex.toLowerCase() === '#ffffff' ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none'
          }}
        />
      )}
      <span className="text-sm font-medium">{colorName}</span>
    </div>
  );
};

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.jsonbin.io/v3/b/67aa4297acd3cb34a8dce65f", {
          headers: {
            "X-Master-Key": "$2a$10$m.41BaxaqeIliqWf2bCrp.pqQse.5gbVIjW44xtPwPXvP2oQvk40C"
          }
        });
        const data = await response.json();
        const selectedCar = data.record.find(car => car.id === id);
        
        if (selectedCar) {
          setCar(selectedCar);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        setError('Failed to fetch car details');
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const Navbar = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="font-bold">Indian Motors</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className="text-orange-500 font-medium"
            >
              Cars
            </Link>
            <button
              onClick={() => navigate('/cars')}
              className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Book Test Drive
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white">
        <div className="text-xl flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-500">{error}</div>
        <button 
          onClick={() => navigate('/cars')}
          className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cars
        </button>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex items-center justify-center">
        Car not found
      </div>
    );
  }

  const features = [
    { icon: Settings, label: 'Engine', value: `${car.engineCC} CC` },
    { icon: Users, label: 'Capacity', value: `${car.seatingCapacity} Seater` },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Gauge, label: 'Mileage', value: `${car.mileage} kmpl` }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white">
      <Navbar />
      
      <div className="relative h-[80vh] w-full mb-8 pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${car.imageUrl})` }}
        />
        
        <div className="relative h-full flex items-center justify-center">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className={`max-h-full w-auto object-contain transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CarFront className="w-20 h-20 text-gray-800 animate-pulse" />
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-8 right-8 flex justify-between">
          <button 
            onClick={() => navigate('/cars')}
            className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-orange-600 transition-all duration-300 group flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Back to Cars</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-4">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-6 text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {car.manufactureYear}
                  </span>
                  <span className="flex items-center gap-2">
                    <CarFront className="w-5 h-5" />
                    {car.bodyType}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-lg">
                {car.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, label, value }) => (
                <div 
                  key={label} 
                  className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6 text-orange-500" />
                    <p className="text-gray-400 text-sm">{label}</p>
                  </div>
                  <p className="text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800/50">
              <h3 className="text-xl font-semibold mb-6">Available Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {car.colorOptions.map((color) => (
                  <ColorSwatch key={color} colorName={color} />
                ))}
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800/50">
              <h3 className="text-xl font-semibold mb-6">Technical Specifications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Body Type</span>
                    <span className="font-medium">{car.bodyType}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Engine</span>
                    <span className="font-medium">{car.engineCC} CC</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Transmission</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Power</span>
                    <span className="font-medium">{car.power} bhp</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Torque</span>
                    <span className="font-medium">{car.torqueNm} Nm</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Top Speed</span>
                    <span className="font-medium">{car.topSpeedKmh} km/h</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Acceleration (0-100)</span>
                    <span className="font-medium">{car.acceleration0100Sec} sec</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Fuel Tank</span>
                    <span className="font-medium">{car.fuelTankCapacityL} L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Ground Clearance</span>
                    <span className="font-medium">{car.groundClearanceMm} mm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Fuel Type</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price and CTA Column */}
          <div className="lg:col-span-4">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50 sticky top-24">
              <div className="mb-8">
                <p className="text-gray-400 mb-2">Starting from</p>
                <p className="text-5xl font-bold text-orange-500">
                  {formatPrice(car.price)}
                </p>
              </div>

              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  Book Test Drive
                  <ArrowRight className="w-5 h-5" />
                </button>
              
                <button className="w-full bg-black/20 text-white rounded-xl py-4 border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;