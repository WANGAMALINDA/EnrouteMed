import React, { useState, useEffect } from 'react';
import { Calculator, MapPin } from 'lucide-react';

const ServiceQuoteTool = ({ colors }) => {
  const [careType, setCareType] = useState('BLS');
  const [distance, setDistance] = useState(50);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const careTypes = [
    { value: 'BLS', label: 'Basic Life Support', multiplier: 1 },
    { value: 'ALS', label: 'Advanced Life Support', multiplier: 1.5 },
    { value: 'Transport', label: 'Patient Transport', multiplier: 0.8 }
  ];

  const calculatePrice = () => {
    const baseRate = 25; // R25 per km base
    const careMultiplier = careTypes.find(type => type.value === careType).multiplier;
    const price = Math.round(baseRate * distance * careMultiplier);
    setEstimatedPrice(price);
  };

  useEffect(() => {
    calculatePrice();
  }, [careType, distance]);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      width: '100%',
      margin: '0 auto'
    }}>
      <h3 style={{
        fontSize: '24px',
        color: colors.navy,
        marginBottom: '20px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <Calculator />
        Service Quote Calculator
      </h3>

      {/* Care Type Selection */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          fontSize: '16px',
          fontWeight: 'bold',
          color: colors.navy,
          marginBottom: '10px'
        }}>
          Type of Care
        </label>
        <select
          value={careType}
          onChange={(e) => setCareType(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
            backgroundColor: 'white'
          }}
        >
          {careTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Distance Slider */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          fontSize: '16px',
          fontWeight: 'bold',
          color: colors.navy,
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <MapPin size={16} />
          Distance: {distance} km
        </label>
        <input
          type="range"
          min="0"
          max="500"
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: '#ddd',
            outline: 'none',
            WebkitAppearance: 'none'
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#666',
          marginTop: '5px'
        }}>
          <span>0 km</span>
          <span>500 km</span>
        </div>
      </div>

      {/* Estimated Price */}
      <div style={{
        backgroundColor: colors.gold,
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          color: colors.navy,
          marginBottom: '5px'
        }}>
          Estimated Price
        </div>
        <div style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: colors.navy
        }}>
          R{estimatedPrice.toLocaleString()}
        </div>
        <div style={{
          fontSize: '12px',
          color: colors.navy,
          opacity: 0.8
        }}>
          {careTypes.find(type => type.value === careType).label} • {distance} km
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        * This is an estimate. Final pricing may vary based on specific requirements and conditions.
      </div>
    </div>
  );
};

export default ServiceQuoteTool;