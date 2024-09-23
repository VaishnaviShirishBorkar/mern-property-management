import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/property.css';
import axios from 'axios';
import {FaBath, FaBed} from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md';
 
const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const handleClick = () => {
    navigate('/property');
  };

  const showPropertyDetails = (id) => {
    navigate(`/property/${id}`);
  }

  useEffect(() => {
    const getPropertyList = async () => {
      try {
        const response = await axios.get('http://localhost:5000/property/get-properties');
        setProperties(response.data); // Access the data property
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    };

    getPropertyList();
  }, []);

  return (
    <div className='container'>
      <button onClick={handleClick} className='propertybtn'>Create a Property List</button>
      <div className='property-container'>
        {
          properties.map((property, index) => (
            <div key={index} className='property-card' onClick={() => showPropertyDetails(property._id)}>
              <img src={`http://localhost:5000/images/${property.file}`} alt="Property" className='property-image' />
              <div className='property-details'>
                <h1 className='property-title'>{property.title}</h1>
                {/* <FaBath className='text-lg' />
                {property.bedrooms}
                <FaBed className='text-lg' />
                {property.bathrooms} */}

                <MdLocationOn className='text-lg'/>
                {property.address}

                <h3 className='property-description'>{property.description}</h3>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
