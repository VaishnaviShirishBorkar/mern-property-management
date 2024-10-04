import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBath, FaBed, FaEdit, FaTrash } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import '../css/propertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from the route
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/property/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.log("Error fetching property details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleEdit = () => {
    navigate(`/property/edit/${id}`); // Navigate to edit page
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/property/delete/${id}`);
      alert("Property deleted successfully!");
      navigate('/'); // Navigate back to home page after deletion
    } catch (error) {
      console.log("Error deleting property:", error);
    }
  };

  if (!property) return <p>Loading property details...</p>;

  return (
    <div className="property-details-container">
      <img src={`http://localhost:5000/images/${property.file}`} alt={property.title} className="property-image-large" />
      <div className="property-info">
        <h1>{property.title}</h1>
        <MdLocationOn /> <span>{property.address}</span>
        <p className="property-description-p">{property.description}</p>
        <div className="property-stats">
          <FaBed /> <span>{property.bedrooms} Bedrooms</span>
          <FaBath /> <span>{property.bathrooms} Bathrooms</span>
        </div>
        <div className="property-actions">
          <FaEdit onClick={handleEdit} className="edit-icon" />
          <FaTrash onClick={handleDelete} className="delete-icon" />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
