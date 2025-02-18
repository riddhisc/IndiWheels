import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CarListing from './components/CarListing';
import CarDetail from './components/CarDetail';
//import CarModel from './components/CarModel';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router basename="/IndiWheels">
      <div className="bg-[#1A1B25] min-h-screen">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarListing />} />
          <Route path="/cardetail/:id" element={<CarDetail />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;