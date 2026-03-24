import React, { useState, useEffect } from 'react';
import { Moon, Sun, Eye } from 'lucide-react';

const AccessibilityControls = ({ colors, onDarkModeToggle, onHighContrastToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    onDarkModeToggle(!isDarkMode);
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    onHighContrastToggle(!isHighContrast);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: isDarkMode ? colors.navy : 'white',
          border: `2px solid ${colors.gold}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? <Sun color="white" size={20} /> : <Moon color={colors.navy} size={20} />}
      </button>

      {/* High Contrast Toggle */}
      <button
        onClick={toggleHighContrast}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: isHighContrast ? '#000000' : 'white',
          border: `2px solid ${isHighContrast ? '#FFFF00' : colors.red}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        title="Toggle High Contrast Mode"
      >
        <Eye color={isHighContrast ? '#FFFF00' : colors.red} size={20} />
      </button>
    </div>
  );
};

// Hook for managing accessibility states
export const useAccessibility = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Apply dark mode styles
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--bg-color', '#1a1a1a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--card-bg', '#2a2a2a');
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#333333');
      root.style.setProperty('--card-bg', '#ffffff');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Apply high contrast styles
    const root = document.documentElement;
    if (isHighContrast) {
      root.style.setProperty('--font-size-multiplier', '1.2');
      root.style.setProperty('--high-contrast-bg', '#000000');
      root.style.setProperty('--high-contrast-text', '#FFFF00');
      root.style.setProperty('--high-contrast-accent', '#FF0000');
    } else {
      root.style.setProperty('--font-size-multiplier', '1');
      root.style.setProperty('--high-contrast-bg', 'inherit');
      root.style.setProperty('--high-contrast-text', 'inherit');
      root.style.setProperty('--high-contrast-accent', 'inherit');
    }
  }, [isHighContrast]);

  return {
    isDarkMode,
    isHighContrast,
    setIsDarkMode,
    setIsHighContrast
  };
};

export default AccessibilityControls;