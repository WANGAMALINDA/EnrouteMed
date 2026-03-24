import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, Heart } from 'lucide-react';

const FirstAidHelper = ({ colors, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const metronomeRef = useRef(null);

  const emergencies = [
    { id: 'choking', title: 'Choking', icon: '🤧' },
    { id: 'bleeding', title: 'Heavy Bleeding', icon: '🩸' },
    { id: 'unconscious', title: 'Unconscious', icon: '😴' }
  ];

  const steps = {
    choking: [
      { instruction: 'Ask: "Are you choking?" If they can speak, coughing is helping.', action: 'Next' },
      { instruction: 'Give 5 back blows between shoulder blades with heel of hand.', action: 'Next' },
      { instruction: 'Give 5 abdominal thrusts (Heimlich maneuver).', action: 'Next' },
      { instruction: 'Call emergency services if not resolved.', action: 'Finish' }
    ],
    bleeding: [
      { instruction: 'Apply direct pressure to the wound with a clean cloth.', action: 'Next' },
      { instruction: 'Keep pressure on for at least 10 minutes.', action: 'Next' },
      { instruction: 'Elevate the injured area above heart level if possible.', action: 'Next' },
      { instruction: 'Call emergency services immediately.', action: 'Finish' }
    ],
    unconscious: [
      { instruction: 'Check for breathing and pulse. If neither, start CPR.', action: 'Start CPR' },
      { instruction: 'Place hands on chest, push hard and fast at 100-120 compressions per minute.', action: 'Next' },
      { instruction: 'Use metronome for correct rhythm.', action: 'Finish' }
    ]
  };

  useEffect(() => {
    if (isMetronomeActive) {
      const interval = setInterval(() => {
        // Flash effect
        if (metronomeRef.current) {
          metronomeRef.current.style.backgroundColor = colors.red;
          setTimeout(() => {
            if (metronomeRef.current) {
              metronomeRef.current.style.backgroundColor = 'transparent';
            }
          }, 100);
        }
        // Beep sound (simple audio context)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }, 545); // 110 BPM = 60/110 ≈ 0.545 seconds

      return () => clearInterval(interval);
    }
  }, [isMetronomeActive, colors.red]);

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency(emergency);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps[selectedEmergency].length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleStartCPR = () => {
    setIsMetronomeActive(true);
    handleNext();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px'
          }}
        >
          <X />
        </button>

        {!selectedEmergency ? (
          <div>
            <h2 style={{
              fontSize: '24px',
              color: colors.navy,
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              What is the emergency?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {emergencies.map(emergency => (
                <button
                  key={emergency.id}
                  onClick={() => handleEmergencySelect(emergency.id)}
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    border: '2px solid #eee',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = colors.gold}
                  onMouseLeave={(e) => e.target.style.borderColor = '#eee'}
                >
                  <span style={{ fontSize: '30px' }}>{emergency.icon}</span>
                  {emergency.title}
                  <ChevronRight style={{ marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{
              fontSize: '20px',
              color: colors.navy,
              marginBottom: '20px'
            }}>
              {emergencies.find(e => e.id === selectedEmergency).title} - Step {currentStep + 1}
            </h2>
            
            <div style={{
              fontSize: '18px',
              lineHeight: '1.6',
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              borderLeft: `4px solid ${colors.red}`
            }}>
              {steps[selectedEmergency][currentStep].instruction}
            </div>

            {selectedEmergency === 'unconscious' && currentStep === 0 && (
              <div style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <button
                  onClick={handleStartCPR}
                  style={{
                    backgroundColor: colors.red,
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Start CPR Metronome
                </button>
              </div>
            )}

            {isMetronomeActive && (
              <div style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <div
                  ref={metronomeRef}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: `3px solid ${colors.red}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    transition: 'background-color 0.1s'
                  }}
                >
                  <Heart size={40} color={colors.red} />
                </div>
                <p style={{ color: colors.red, fontWeight: 'bold' }}>
                  Metronome Active - 110 BPM
                </p>
                <button
                  onClick={() => setIsMetronomeActive(false)}
                  style={{
                    backgroundColor: colors.navy,
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Stop Metronome
                </button>
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: colors.gold,
                  color: colors.navy,
                  padding: '15px 30px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {steps[selectedEmergency][currentStep].action}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstAidHelper;