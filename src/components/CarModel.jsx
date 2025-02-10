import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Engine,
  Fuel,
  Gauge,
  Battery,
  Car,
  Users,
  Weight,
  Maximize,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CarModel = () => {
  const [car, setCar] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState('engine');
  const { id } = useParams();
  
  React.useEffect(() => {
    fetch('/data/test.json')
      .then(res => res.json())
      .then(data => {
        const selectedCar = data.carsData.find(c => c.id === parseInt(id));
        setCar(selectedCar);
      });
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const specifications = {
    engine: {
      title: 'Engine',
      icon: <Engine className="w-6 h-6" />,
      specs: [
        { label: 'Engine Capacity', value: `${car.engineCapacity} cc` },
        { label: 'Engine Power', value: `${car.enginePower} bhp` },
        { label: 'Fuel Type', value: car.fuelType },
        { label: 'Transmission', value: car.transmission }
      ]
    },
    performance: {
      title: 'Performance',
      icon: <Gauge className="w-6 h-6" />,
      specs: [
        { label: 'Mileage', value: `${car.mileage} km/l` },
        { label: 'Top Speed', value: `${car.topSpeed || 'N/A'} km/h` },
        { label: 'Acceleration', value: `${car.acceleration || 'N/A'} sec` }
      ]
    },
    dimensions: {
      title: 'Dimensions',
      icon: <Maximize className="w-6 h-6" />,
      specs: [
        { label: 'Ground Clearance', value: `${car.groundClearance} mm` },
        { label: 'Kerb Weight', value: `${car.kerbWeight} kg` },
        { label: 'Seating Capacity', value: `${car.seatingCapacity} Seats` }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <Link to="/cars" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Listings
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
          <p className="text-gray-400">{car.bodyType}</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Car Visualization */}
          <div className="bg-gray-900 rounded-2xl p-8 flex items-center justify-center">
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
              <Car className="w-48 h-48 text-gray-700" />
              
              {/* Hotspots */}
              <button 
                onClick={() => setActiveSection('engine')}
                className={`absolute top-1/4 left-1/4 p-3 rounded-full transition-all ${
                  activeSection === 'engine' ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                <Engine className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveSection('performance')}
                className={`absolute top-1/2 right-1/4 p-3 rounded-full transition-all ${
                  activeSection === 'performance' ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                <Gauge className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveSection('dimensions')}
                className={`absolute bottom-1/4 left-1/2 p-3 rounded-full transition-all ${
                  activeSection === 'dimensions' ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Specifications Panel */}
          <div className="bg-gray-900 rounded-2xl p-8">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 text-xl font-semibold">
                {specifications[activeSection].icon}
                <h2>{specifications[activeSection].title} Specifications</h2>
              </div>

              <div className="space-y-6">
                {specifications[activeSection].specs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-4">
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModel;