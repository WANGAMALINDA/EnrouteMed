import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Ambulance } from 'lucide-react';

const AmbulanceTracker = ({ colors }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [eta, setEta] = useState(15); // minutes

  const stages = ['Dispatched', 'En Route', 'At Scene', 'Transporting'];

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          setCurrentStage(prevStage => (prevStage + 1) % stages.length);
          return 15; // Reset ETA for demo
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [stages.length]);

  const progressWidth = ((currentStage + 1) / stages.length) * 100;

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
        textAlign: 'center'
      }}>
        Ambulance Status
      </h3>

      {/* Progress Bar */}
      <div style={{
        backgroundColor: '#eee',
        height: '8px',
        borderRadius: '4px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progressWidth}%`,
          height: '100%',
          backgroundColor: colors.gold,
          transition: 'width 0.5s ease'
        }} />
      </div>

      {/* Stages */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px'
      }}>
        {stages.map((stage, index) => (
          <div key={stage} style={{
            textAlign: 'center',
            flex: 1
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: index <= currentStage ? colors.gold : '#ddd',
              margin: '0 auto 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {index <= currentStage && <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'white'
              }} />}
            </div>
            <span style={{
              fontSize: '12px',
              color: index <= currentStage ? colors.navy : '#999',
              fontWeight: index === currentStage ? 'bold' : 'normal'
            }}>
              {stage}
            </span>
          </div>
        ))}
      </div>

      {/* ETA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <Clock color={colors.red} />
        <span style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: colors.navy
        }}>
          ETA: {eta} minutes
        </span>
      </div>

      {/* Map Placeholder */}
      <div style={{
        height: '200px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Simple iframe for demo - replace with actual map integration */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.5!2d28.0473!3d-25.7479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ0JzUyLjQiUyAyOMKwMDInNTAuMyJF!5e0!3m2!1sen!2sza!4v1634567890123!5m2!1sen!2sza"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
        
        {/* Moving ambulance marker simulation */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          animation: 'moveMarker 10s linear infinite'
        }}>
          <Ambulance color={colors.red} size={24} />
        </div>
      </div>

      <style>
        {`
          @keyframes moveMarker {
            0% { left: 20%; }
            100% { left: 80%; }
          }
        `}
      </style>
    </div>
  );
};

export default AmbulanceTracker;