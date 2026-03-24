import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Heart } from 'lucide-react';

const QuickActionOverlay = ({ colors }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [isGettingGPS, setIsGettingGPS] = useState(false);

  const handleGPS = () => {
    setIsGettingGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGpsLocation(`Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`);
          setIsGettingGPS(false);
          alert(`Your location: Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}\nPlease read this to the dispatcher.`);
        },
        (error) => {
          alert('Unable to retrieve your location. Please enable location services.');
          setIsGettingGPS(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsGettingGPS(false);
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+27763036455';
  };

  const handleCPR = () => {
    // This will be handled by the FirstAidHelper component
    alert('CPR Metronome activated! (This would integrate with the First Aid Helper)');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: colors.red,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        <Phone color="white" size={24} />
      </button>

      {/* Expanded Menu */}
      {isExpanded && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <button
            onClick={handleCall}
            style={{
              backgroundColor: colors.red,
              color: 'white',
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <Phone size={16} />
            Call Dispatch Now
          </button>

          <button
            onClick={handleGPS}
            disabled={isGettingGPS}
            style={{
              backgroundColor: colors.navy,
              color: 'white',
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: isGettingGPS ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              opacity: isGettingGPS ? 0.6 : 1
            }}
          >
            <MapPin size={16} />
            {isGettingGPS ? 'Getting GPS...' : 'Share My Live GPS'}
          </button>

          <button
            onClick={handleCPR}
            style={{
              backgroundColor: colors.gold,
              color: colors.navy,
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <Heart size={16} />
            Start CPR Metronome
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickActionOverlay;