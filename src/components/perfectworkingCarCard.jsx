{/* import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cardetail/${car.id}`);
  };

  return (
    <div 
      className="bg-gray-900 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl"
      onClick={handleCardClick}
    >
      {/* Image Section *
      <div className="relative mb-2">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-44 object-cover rounded-t-xl"  // Reduced from h-64 to h-44
        />
        <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full">  // Reduced padding
          <span className="font-bold text-white">${car.price}</span>
          <span className="text-xs text-gray-200">/day</span>
        </div>
      </div>

      {/* Content Section *
      <div className="p-4">  {/* Reduced padding from p-6 */}
        {/* Car Info 
        <div className="mb-3">  {/* Reduced margin from mb-6 
          <h3 className="text-xl font-bold text-white mb-1">{car.name}</h3>  {/* Reduced text size 
          <p className="text-gray-400 text-base">{car.year}</p>  {/* Reduced text size 
        </div>

        {/* Specifications 
        <div className="grid grid-cols-3 gap-2">  {/* Reduced gap from gap-4 
          {Object.entries(car.specs).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center text-center p-2 bg-gray-800 rounded-lg">  {/* Reduced padding 
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 mb-1"></div>  {/* Reduced size and margin 
              <span className="text-gray-400 text-xs font-medium">{key}</span>  {/* Reduced text size *
              <span className="text-white text-xs">{value}</span>  {/* Reduced text size 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};  

export default CarCard;   */}

import React from 'react';
import { Car, Fuel, IndianRupee,  Wrench } from 'lucide-react';

const CarCard = ({ vehicle }) => {
  const {
    model = 'Unknown Model',
    category = 'Unknown Category',
    variants = []
  } = vehicle || {};

  // Get the first variant for main specs
  const mainVariant = variants[0] || {};
  const specs = mainVariant.specifications || {};

  // Get all unique fuel types for this vehicle
  const fuelTypes = [...new Set(variants.map(v => v.type))].join(', ') || 'Not specified';

  // Get the main powertrain spec (either power for ICE or battery capacity for EV)
  const powertrainSpec = specs.battery 
    ? `${specs.battery} Battery` 
    : specs.power 
    ? specs.power 
    : 'N/A';

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-800/20 transition-all duration-300 hover:-translate-y-1">
      {/* Image container */}
      <div className="relative h-48 bg-gray-800 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <Car className="w-16 h-16 text-gray-700" />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-200">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-1 hover:text-gray-200 transition-colors">
            {model}
          </h3>
          <div className="h-px w-16 bg-red-500 mt-2"></div>
        </div>

        {/* Specifications */}
        <div className="space-y-3">
          {/* Power/Battery Info */}
          <div className="flex items-center text-gray-400 gap-2">
            <Wrench className="w-4 h-4" />
            <p className="text-sm">
              {mainVariant.type === 'Electric' ? 'Battery:' : 'Power:'}{' '}
              <span className="text-white">{powertrainSpec}</span>
            </p>
          </div>

          {/* Fuel Types */}
          <div className="flex items-center text-gray-400 gap-2">
            <Fuel className="w-4 h-4" />
            <p className="text-sm">
              Available in: <span className="text-white">{fuelTypes}</span>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        {specs.features && specs.features.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {specs.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
              {specs.features.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{specs.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Variants Count */}
        <div className="pt-2">
          <span className="text-xs text-gray-500">
            {variants.length} variant{variants.length !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;