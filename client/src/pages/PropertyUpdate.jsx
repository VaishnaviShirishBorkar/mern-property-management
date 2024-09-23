import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/create_property.css';
import { useParams, useNavigate } from 'react-router-dom';

const PropertyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    type_property: '',
    parking: false,
    bedrooms: 0,
    bathrooms: 0,
  });

  const [file, setFile] = useState(null);

  // Fetch the property data when the component mounts
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/property/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching property details", error);
      }
    };

    fetchProperty();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = new FormData();
    propertyData.append('title', formData.title);
    propertyData.append('description', formData.description);
    propertyData.append('address', formData.address);
    propertyData.append('type_property', formData.type_property);
    propertyData.append('parking', formData.parking);
    propertyData.append('bedrooms', formData.bedrooms);
    propertyData.append('bathrooms', formData.bathrooms);
    if (file) {
      propertyData.append('file', file);
    }

    try {
      const response = await axios.put(`http://localhost:5000/property/update/${id}`, propertyData);

      if (response.status === 200) {
        alert("Property updated successfully!");
        navigate('/'); // Navigate to home page
      }
    } catch (error) {
      console.error("Error updating property", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Update Property</h2>
        <form onSubmit={handleSubmit}>
          <input id="title" type="text" placeholder="Enter title" value={formData.title} onChange={handleChange} />
          <textarea id="description" rows="10" cols="15" placeholder="Enter Description" value={formData.description} onChange={handleChange} />
          <input id="address" type="text" placeholder="Enter Address" value={formData.address} onChange={handleChange} />
          <input id="type_property" type="text" placeholder="Enter Type of Property" value={formData.type_property} onChange={handleChange} />
          <div className="parking-container">
            <input id="parking" type="checkbox" checked={formData.parking} onChange={handleChange} />
            <span>Parking</span>
          </div>
          <input id="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
          <input id="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
          <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
          <button id="submitbtn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyUpdate;
