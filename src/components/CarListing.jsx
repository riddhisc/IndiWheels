import React, { useState, useEffect, useCallback } from 'react';
import { Filter, RotateCcw, Search, ChevronUp, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from './CarCard';

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
};

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedFuelType, setSelectedFuelType] = useState('All');
  const [selectedBodyType, setSelectedBodyType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState(10000000);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    const start = window.pageYOffset;
    const duration = 800;
    const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = ease(progress);
      
      window.scrollTo(0, start * (1 - easedProgress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  useEffect(() => {
    let rafId;
    const toggleVisibility = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        const shouldBeVisible = window.pageYOffset > 300;
        setIsVisible(shouldBeVisible);
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  /*
  useEffect(() => {
    fetch('/data/test.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        return response.json();
      })
      .then(data => {
        const carsArray = data.carsData || [];
        setCars(carsArray);
        
        if (carsArray.length > 0) {
          const maxCarPrice = Math.max(...carsArray.map(car => car.price));
          setMaxPrice(maxCarPrice);
          setDefaultMaxPrice(maxCarPrice);
        }
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading cars:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);  */


  useEffect(() => {
  fetch('/data/test.json')  // Make sure it starts with a forward slash
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch car data');
      }
      return response.json();
    })
    .then(data => {
      const carsArray = Array.isArray(data) ? data : data.carsData || [];
      setCars(carsArray);
      
      if (carsArray.length > 0) {
        const maxCarPrice = Math.max(...carsArray.map(car => car.price));
        setMaxPrice(maxCarPrice);
        setDefaultMaxPrice(maxCarPrice);
      }
      
      setLoading(false);
    })
    .catch(error => {
      console.error('Error loading cars:', error);
      setError(error.message);
      setLoading(false);
    });
    
}, []);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All');
    setSelectedFuelType('All');
    setSelectedBodyType('All');
    setMaxPrice(defaultMaxPrice);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading cars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  const brands = ['All', ...new Set(cars.map(car => car.brand))];
  const fuelTypes = ['All', ...new Set(cars.map(car => car.fuelType))];
  const bodyTypes = ['All', ...new Set(cars.map(car => car.bodyType))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const filteredCars = cars.filter(car => {
    const searchMatch = searchQuery === '' || 
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const brandMatch = selectedBrand === 'All' || car.brand === selectedBrand;
    const fuelTypeMatch = selectedFuelType === 'All' || car.fuelType === selectedFuelType;
    const bodyTypeMatch = selectedBodyType === 'All' || car.bodyType === selectedBodyType;
    const priceMatch = car.price <= maxPrice;
    return searchMatch && brandMatch && fuelTypeMatch && bodyTypeMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 relative">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="pt-24 pb-8 space-y-8">
          <div className="text-white space-y-2">
            <h1 className="text-3xl font-bold">Indian Cars Catalog</h1>
            <p className="text-gray-400">Explore our collection of {cars.length} cars</p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-grow min-w-[250px]">
                <label className="text-sm text-gray-400 mb-1 block">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search model or brand..."
                    className="block w-full pl-8 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="text-sm text-gray-400 mb-1 block">Brand</label>
                <select 
                  className="w-full p-2 bg-gray-900 rounded-xl text-white"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="text-sm text-gray-400 mb-1 block">Fuel</label>
                <select 
                  className="w-full p-2 bg-gray-900 rounded-xl text-white"
                  value={selectedFuelType}
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                >
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="text-sm text-gray-400 mb-1 block">Body</label>
                <select 
                  className="w-full p-2 bg-gray-900 rounded-xl text-white"
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                >
                  {bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-grow">
                <label className="text-sm text-gray-400 block mb-1">
                  Maximum Price: {formatPrice(maxPrice)}
                </label>
                <input
                  type="range"
                  min={0}
                  max={defaultMaxPrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl text-white hover:bg-gray-700 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          <div className="text-white text-lg flex items-center gap-2">
            <Filter size={20} />
            <span>Showing {filteredCars.length} cars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-orange-600 text-white p-3 rounded-full shadow-lg 
          transition-all duration-500 ease-out
          ${isVisible 
            ? 'opacity-100 translate-y-0 scale-100 hover:scale-105' 
            : 'opacity-0 translate-y-10 scale-75'
          }
          hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
        aria-label="Scroll to top"
        style={{ 
          zIndex: 50,
          transitionProperty: 'opacity, transform, background-color',
          willChange: 'opacity, transform'
        }}
      >
        <ChevronUp className="w-6 h-6 transition-transform group-hover:rotate-180" />
      </button>
    </div>
  );
};

export default CarListing;