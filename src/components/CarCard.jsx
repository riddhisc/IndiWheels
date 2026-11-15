import React, { useState } from 'react';
import { Car, Fuel, Settings, Users, GaugeCircle, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(car.price);

  return (
    <div
      className="block relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group"
    >
      <Link
        to={`/cardetail/${car.id}`}
        className="absolute inset-0 z-10 rounded-3xl"
        aria-label={`${car.brand} ${car.model}`}
      />
      {/* Darker Background with Enhanced Hover Effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-950/98 to-black/98 backdrop-blur-xl border border-gray-800/30 rounded-3xl transform transition-all duration-500 
        group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:border-blue-900/50" />

      {/* Content sits above the card link. Clicks pass through except on the price. */}
      <div className="relative z-20 pointer-events-none">
        {/* Image Section with Smooth Zoom */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          {car.imageUrl ? (
            <img
              src={car.imageUrl}
              alt={`${car.brand} ${car.model}`}
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out 
                group-hover:scale-110 
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Placeholder/Fallback */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
            style={{ display: car.imageUrl && imageLoaded ? 'none' : 'flex' }}
          >
            <Car className="w-20 h-20 text-gray-800 animate-pulse" />
          </div>

          {/* Darker Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-gray-800/30">
              {car.bodyType || 'N/A'}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">{car.brand}</div>
            <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
              {car.model}
            </h3>
            {car.priceSource ? (
              <a
                href={car.priceSource}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${formattedPrice}, manufacturer price page`}
                className="pointer-events-auto relative z-20 inline-flex items-center gap-1.5 text-red-500 font-bold text-xl"
              >
                {formattedPrice}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <div className="text-red-500 font-bold text-xl">{formattedPrice}</div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            <FeatureItem icon={<Fuel className="w-5 h-5" />} label={car.fuelType || 'N/A'} />
            <FeatureItem icon={<Settings className="w-5 h-5" />} label={car.transmission || 'N/A'} />
            <FeatureItem icon={<Users className="w-5 h-5" />} label={car.seatingCapacity != null ? `${car.seatingCapacity} Seats` : 'N/A'} />
            <FeatureItem 
              icon={<GaugeCircle className="w-5 h-5" />} 
              label={car.mileage ? `${car.mileage} km/l` : 'N/A'} 
            />
          </div>

          {/* Footer with Always Visible View Details */}
          <div className="pt-4 border-t border-gray-800/30 flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{car.manufactureYear || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
              <span>View Details</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Item Subcomponent
const FeatureItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors p-2 rounded-xl hover:bg-black/50">
    <div className="text-blue-400">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default CarCard;