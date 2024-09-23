import React, { useState } from "react";
import axios from 'axios';
import '../css/create_property.css'

const Property = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    type_property: '',
    parking: false,
    bedrooms: 0,
    bathrooms: 0,
  });

  const [file, setFile] = useState(null); //useState

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
    setFile(e.target.files[0]); // Save the file in a separate state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to send file with other form fields
    const propertyData = new FormData();
    propertyData.append('title', formData.title);
    propertyData.append('description', formData.description);
    propertyData.append('address', formData.address);
    propertyData.append('type_property', formData.type_property);
    propertyData.append('parking', formData.parking);
    propertyData.append('bedrooms', formData.bedrooms);
    propertyData.append('bathrooms', formData.bathrooms);
    if (file) {
      propertyData.append('file', file); // Append image file
    }

    try {
      const response = await axios.post('http://localhost:5000/property/create', propertyData);

      if (response.status === 201) {
        alert("Property created successfully!");
        // Reset the form
        setFormData({
          title: '',
          description: '',
          address: '',
          type_property: '',
          parking: false,
          bedrooms: 0,
          bathrooms: 0,
        });
        setFile(null); // Reset image file
        document.getElementById("file").value = ''; // Clear file input
      }
    } catch (error) {
      console.error("Error creating property", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Property</h2>
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
          <input id="file" type="file" accept="image/*" onChange={handleFileChange} /> {/* Removed value attribute */}
          <button id="submitbtn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Property;
