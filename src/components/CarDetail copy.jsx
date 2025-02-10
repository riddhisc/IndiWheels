import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Car, Fuel, Settings, Users, GaugeCircle, Download, Calendar } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Navbar Component - Keeping consistent with other pages
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
              className="text-gray-300 hover:text-orange-500 transition-colors"
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
};

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await fetch('/data/test.json');
        const data = await response.json();
        const selectedCar = data.carsData.find(car => car.id === id);
        if (selectedCar) {
          setCar(selectedCar);
        } else {
          setError('Car not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex items-center justify-center">
        <div className="text-xl flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-500">{error || 'Car not found'}</div>
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

  const features = [
    { icon: GaugeCircle, label: 'Engine', value: car.engineCC ? `${car.engineCC} CC` : 'N/A' },
    { icon: Users, label: 'Capacity', value: car.seatingCapacity ? `${car.seatingCapacity} Seats` : 'N/A' },
    { icon: Settings, label: 'Transmission', value: car.transmission || 'N/A' },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType || 'N/A' }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-16">
        {/* Breadcrumb */}
        <div className="py-4 flex items-center gap-2 text-gray-400">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-orange-500 transition-colors">Cars</Link>
          <span>/</span>
          <span className="text-orange-500">{car.model}</span>
        </div>

        {/* Image Section */}
        <div className="relative h-[60vh] mb-8 rounded-3xl overflow-hidden group">
          {/* Background Blur Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
            style={{ backgroundImage: `url(${car.imageUrl})` }}
          />
          
          {/* Main Image */}
          <div className="relative h-full flex items-center justify-center">
            <img
              src={car.imageUrl}
              alt={`${car.brand} ${car.model}`}
              className={`max-h-full max-w-full object-contain transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading State */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Car className="w-20 h-20 text-gray-800 animate-pulse" />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <Link 
              to="/cars" 
              className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-orange-600 transition-all duration-300 group flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Back</span>
            </Link>
            <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-orange-600 transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Car Details Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{car.brand} {car.model}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {car.manufactureYear}
                </span>
                <span className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  {car.bodyType}
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Experience the perfect blend of power and luxury with the {car.brand} {car.model}. 
              This {car.bodyType.toLowerCase()} comes with state-of-the-art features and 
              cutting-edge technology to ensure a superior driving experience.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, label, value }) => (
                <div 
                  key={label} 
                  className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800/50 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <p className="text-gray-400 text-sm">{label}</p>
                  </div>
                  <p className="text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Price and CTA */}
          <div className="lg:pl-8 lg:border-l border-gray-800/50">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50">
              <div className="mb-8">
                <p className="text-gray-400 mb-2">Starting from</p>
                <p className="text-4xl font-bold text-orange-500">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  }).format(car.price)}
                </p>
              </div>

              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  Book Test Drive
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full px-6 py-4 bg-black/50 text-white rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
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

export default CarDetail;