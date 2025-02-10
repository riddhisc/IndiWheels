import { Link, useLocation } from 'react-router-dom';
import { Home, Car, Menu } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-[#1E1F2E] fixed left-0 h-screen w-16 flex flex-col items-center py-4 space-y-8">
      <div className="text-purple-600">
        <Car size={28} />
      </div>
      
      <div className="flex flex-col space-y-6">
        <Link 
          to="/" 
          className={`p-2 rounded-lg ${location.pathname === '/' ? 'bg-purple-600' : 'text-gray-400 hover:bg-purple-600/20'}`}
        > 
          <Home size={24} />
        </Link>
        <Link 
          to="/cars" 
          className={`p-2 rounded-lg ${location.pathname === '/cars' ? 'bg-purple-600' : 'text-gray-400 hover:bg-purple-600/20'}`}
        >
          <Car size={24} />
        </Link>
      </div>

      <div className="mt-auto text-gray-400 hover:text-white cursor-pointer">
        <Menu size={24} />
      </div>
    </nav>
  );
};

export default Navbar;