import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/property.css';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    navigate('/property');
  };

  const showPropertyDetails = (id) => {
    navigate(`/property/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError(''); // Clear error when user types in search box
  };

  const searchProperties = async () => {
    setLoading(true); // Start loading state
    setError(''); // Reset error state

    try {
      const response = await axios.get(`http://localhost:5000/property/search?address=${searchQuery}`); // Updated
      console.log(searchQuery);

      console.log(response.data);
      // if (response.data.length === 0) {
      //   setError('No properties found with that address.');
      // }
      setProperties(response.data);

    } catch (error) {
      console.log('Error fetching properties:', error);
      setError('Error fetching properties. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
};

  useEffect(() => {
    const getPropertyList = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/property/get-properties');
        setProperties(response.data);
      } catch (error) {
        console.log('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    getPropertyList();
  }, []);

  return (
    <div className="container">
      <div className='property-container-div'>
        <input
          type="text"
          placeholder="Search by city..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={searchProperties} className="searchbtn">Search</button>
        <button onClick={handleClick} className="propertybtn">Create a Property List</button>

        {loading && <p>Loading properties...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="property-container">
          {properties.map((property, index) => (
            <div key={index} className="property-card" onClick={() => showPropertyDetails(property._id)}>
              <img src={`http://localhost:5000/images/${property.file}`} alt="Property" className="property-image" />
              <div className="property-details">
                <h1 className="property-title">{property.title}</h1>
                <MdLocationOn className="text-lg" />
                {property.address}
                <h3 className="property-description">{property.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
