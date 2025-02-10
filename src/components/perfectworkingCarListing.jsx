import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import CarCard from './CarCard';

const CarListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    fetch('/data/vehicles.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles data');
        }
        return response.json();
      })
      .then(data => {
        // Check the structure of the data
        console.log('Fetched data:', data);
        
        // If data is nested under a property like 'vehicles', extract it
        const vehiclesArray = Array.isArray(data) ? data : 
                            data.vehicles ? data.vehicles : 
                            Object.values(data);
                            
        setVehicles(vehiclesArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading vehicles:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Debug log
  console.log('Current vehicles state:', vehicles);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading vehicles...</div>
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

  // Ensure vehicles is an array before filtering
  const validVehicles = Array.isArray(vehicles) ? vehicles : [];

  // Filter out commercial vehicles and get passenger vehicles
  const passengerVehicles = validVehicles.filter(v => 
    v && v.category && 
    !['Commercial', 'Commercial Truck', 'Commercial Van', 'Commercial Bus', 
      'Commercial Pickup', 'Commercial Electric Truck'].includes(v.category)
  );

  // Get unique categories and types
  const categories = ['All', ...new Set(passengerVehicles.map(v => v.category))];
  const types = ['All', ...new Set(passengerVehicles.flatMap(v => 
    v.variants ? v.variants.map(variant => variant.type) : []
  ))];

  // Filter vehicles based on selection
  const filteredVehicles = passengerVehicles.filter(vehicle => {
    const categoryMatch = selectedCategory === 'All' || vehicle.category === selectedCategory;
    const typeMatch = selectedType === 'All' || 
                     (vehicle.variants && 
                      vehicle.variants.some(v => v.type === selectedType));
    return categoryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-8 space-y-8">
          {/* Header */}
          <div className="text-white space-y-2">
            <h1 className="text-3xl font-bold">Indian Cars Catalog</h1>
            <p className="text-gray-400">Explore our collection of {passengerVehicles.length} vehicles</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-gray-400 mb-1 block">Category</label>
              <select 
                className="w-full p-3 bg-gray-900 rounded-xl text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-gray-400 mb-1 block">Fuel Type</label>
              <select 
                className="w-full p-3 bg-gray-900 rounded-xl text-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-white text-lg flex items-center gap-2">
            <Filter size={20} />
            <span>Showing {filteredVehicles.length} vehicles</span>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {filteredVehicles.map((vehicle) => (
            <CarCard key={vehicle.model} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarListing;