import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Property from './pages/Property';
import PropertyDetails from './pages/PropertyDetails'
import PropertyUpdate from './pages/PropertyUpdate'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/property' element={<Property/>} />
        <Route path='/property/:id' element={<PropertyDetails/>} />
        <Route path='/property/edit/:id' element={<PropertyUpdate/>} />
      </Routes>
    </Router>
  );
}

export default App;
