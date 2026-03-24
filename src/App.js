import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Ambulance, 
  Stethoscope, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Users, 
  Briefcase, 
  ChevronRight,
  Mail,
  HeartPulse
} from 'lucide-react';
import QuickActionOverlay from './QuickActionOverlay';
import AmbulanceTracker from './AmbulanceTracker';
import FirstAidHelper from './FirstAidHelper';
import ServiceQuoteTool from './ServiceQuoteTool';

const MalindaEMS = () => {
  // State for responsiveness and hover effects
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredRequestQuote, setHoveredRequestQuote] = useState(false);
  const [showFirstAidHelper, setShowFirstAidHelper] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = `Name: ${contactName}\nEmail: ${contactEmail}\nSubject: ${contactSubject}\nMessage: ${contactMessage}`;
    const mailtoUrl = `mailto:wangamalinda4@gmail.com?subject=${encodeURIComponent('Website query')}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  // Track window size for mobile-first responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  // Design System Constants
  const colors = {
    navy: '#1a2e5a',
    gold: '#f1b53e',
    red: '#d32f2f',
    white: '#ffffff',
    gray: '#f4f4f4',
    textDark: '#333333',
    textGray: '#666666',
    green: '#22c55e'
  };

  // --- Styled Components Logic ---
  
  const containerStyle = {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    color: colors.textDark,
    backgroundColor: colors.white,
    margin: 0,
    padding: 0,
    overflowX: 'hidden'
  };

  const sectionPadding = {
    padding: isMobile ? '60px 20px' : '100px 80px'
  };

  const navItemStyle = (item) => ({
    textDecoration: 'none',
    color: colors.navy,
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    borderBottom: hoveredBtn === item ? `2px solid ${colors.gold}` : '2px solid transparent'
  });

  const services = [
    { title: 'Emergency Medical Services', icon: <Ambulance color={colors.red} />, desc: 'Rapid response ALS and BLS units available 24/7.' },
    { title: 'Inter-hospital Transfers', icon: <HeartPulse color={colors.red} />, desc: 'Safe patient transport between medical facilities.' },
    { title: 'Events Medical Standby', icon: <Users color={colors.red} />, desc: 'Comprehensive medical coverage for sports and corporate events.' },
    { title: 'First Aid Training', icon: <Award color={colors.red} />, desc: 'Accredited training for individuals and corporate teams.' },
    { title: 'Medical Accident Assistance', icon: <ShieldCheck color={colors.red} />, desc: 'Professional assistance for road and home accidents.' },
    { title: 'Occupational Medical Incidents', icon: <Briefcase color={colors.red} />, desc: 'Specialized care for workplace-related emergencies.' },
  ];

  return (
    <div style={containerStyle}>
      
      {/* Quick Action Overlay */}
      <QuickActionOverlay colors={colors} />
      
      {/* 1. STICKY HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: colors.white,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '15px 20px' : '15px 80px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: colors.red, padding: '8px', borderRadius: '8px' }}>
            <Ambulance color="white" size={27} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '22px', color: colors.navy, letterSpacing: '-0.5px' }}>
            Enroute<span style={{ color: colors.gold }}>Med</span>
          </span>
        </div>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '30px' }}>
            {['Services', 'Status', 'Quote', 'About Us', 'Contact'].map(item => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                onMouseEnter={() => setHoveredBtn(item)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={navItemStyle(item)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        <a 
          href="tel:+27763036455"
          style={{
            backgroundColor: colors.red,
            color: 'white',
            padding: isMobile ? '8px 15px' : '12px 25px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: isMobile ? '12px' : '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(243, 39, 39, 0.45)'
          }}
        >
          <Phone size={18} />
          {isMobile ? 'CALL NOW' : 'EMERGENCY: +27 76 303 6455'}
        </a>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '85vh',
        width: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(26, 46, 90, 0.7)', // Navy overlay
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          padding: '0 20px',
          maxWidth: '900px'
        }}>


          <h1 style={{
            fontSize: isMobile ? '40px' : '64px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '25px'
          }}>
            Serving with <span style={{ color: colors.gold }}>Compassion.</span>
          </h1>
          <p style={{
            fontSize: isMobile ? '18px' : '22px',
            marginBottom: '40px',
            opacity: 0.9,
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Professional Emergency Medical Care across South Africa. Every second counts, every life matters.
          </p>

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <a href="tel:+27763036455" style={{
                backgroundColor: colors.gold,
                color: colors.navy,
                padding: '18px 35px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer'
              }}>Call Now</a>
              <button 
                onClick={() => {
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setHoveredRequestQuote(true)}
                onMouseLeave={() => setHoveredRequestQuote(false)}
                style={{
                  backgroundColor: hoveredRequestQuote ? 'rgba(255,255,255,0.25)' : 'transparent',
                  color: 'white',
                  padding: '18px 35px',
                  borderRadius: '8px',
                  border: '2px solid white',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>Request a Quote</button>
            </div>

            {/* Live Status Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '8px 16px',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: colors.green,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${colors.green}`
              }} />
              <span style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>AVAILABLE 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section id="services" style={{ ...sectionPadding, backgroundColor: '#fdfdfd' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', color: colors.navy, marginBottom: '15px' }}>Our Services</h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: colors.gold, margin: '0 auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {services.map((service, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: '40px 30px',
                backgroundColor: 'white',
                border: `1px solid ${hoveredCard === index ? colors.gold : '#eee'}`,
                borderRadius: '12px',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                boxShadow: hoveredCard === index ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
                transform: hoveredCard === index ? 'translateY(-5px)' : 'none'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                {service.icon}
                <div style={{ width: '30px', height: '2px', backgroundColor: colors.red, marginTop: '10px' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '15px', color: colors.navy }}>{service.title}</h3>
              <p style={{ color: colors.textGray, lineHeight: '1.6', fontSize: '15px' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ambulance Tracker Section */}
      <section id="status" style={{ ...sectionPadding, backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', color: colors.navy, marginBottom: '15px' }}>Live Ambulance Status</h2>
            <div style={{ width: '80px', height: '4px', backgroundColor: colors.gold, margin: '0 auto' }} />
          </div>
          <AmbulanceTracker colors={colors} />
        </div>
      </section>

      {/* Service Quote Tool Section */}
      <section id="quote" style={{ ...sectionPadding }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', color: colors.navy, marginBottom: '15px' }}>Get Instant Quote</h2>
            <div style={{ width: '80px', height: '4px', backgroundColor: colors.gold, margin: '0 auto' }} />
          </div>
          <ServiceQuoteTool colors={colors} />
        </div>
      </section>

      {/* 4. ABOUT & STATS */}
      <section id="aboutus" style={{ 
        ...sectionPadding, 
        backgroundColor: colors.navy, 
        color: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '60px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '36px', marginBottom: '25px' }}>
            Clinical Excellence, <span style={{ color: colors.gold }}>Rapid Response.</span>
          </h2>
          <p style={{ lineHeight: '1.8', opacity: 0.9, marginBottom: '30px' }}>
            Enroute Medical Services is a premier South African-based provider. We are dedicated to delivering clinical excellence through advanced medical protocols and rapid response times. Our fleet is equipped with state-of-the-art technology to ensure every patient receives the best care possible.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['24/7 Operations Control', 'HPCSA Registered Medics', 'South Africa Wide Coverage'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <ChevronRight color={colors.gold} size={20} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ 
          flex: 1, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px',
          width: '100%'
        }}>
          {[
            { label: 'Years Experience', val: '4+', icon: <Clock /> },
            { label: 'Qualified Medics', val: '27+', icon: <Users /> },
            { label: 'Emergency Units', val: '14', icon: <Ambulance /> },
            { label: 'Satisfied Clients', val: '1k+', icon: <Award /> }
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '30px 20px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', color: colors.gold }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>{stat.val}</div>
              <div style={{ fontSize: '13px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONTACT & FOOTER */}
      <section id="contact" style={sectionPadding}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '80px'
        }}>
          {/* Contact Info */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '32px', color: colors.navy, marginBottom: '30px' }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <MapPin color={colors.red} />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>Our Location</h4>
                  <p style={{ margin: 0, color: colors.textGray }}>Centurion, Gauteng, South Africa</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <MapPin color={colors.red} />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>Our Address</h4>
                  <p style={{ margin: 0, color: colors.textGray }}>6613 Blue Lily street, Thatchfield, 0157</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Phone color={colors.red} />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>Phone Number</h4>
                  <p style={{ margin: 0, color: colors.textGray }}>+27 76 303 6455</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Clock color={colors.red} />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>Working Hours</h4>
                  <p style={{ margin: 0, color: colors.textGray }}>Open 24 Hours / 7 Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ flex: 1.5 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row' }}>
                <input
                  placeholder="Full Name"
                  style={inputStyle}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
                <input
                  placeholder="Email Address"
                  style={inputStyle}
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <input
                placeholder="Subject (e.g., Event Standby)"
                style={inputStyle}
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                style={{ ...inputStyle, resize: 'none' }}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
              />
              <button 
                onMouseEnter={() => setHoveredBtn('submit')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  backgroundColor: hoveredBtn === 'submit' ? colors.navy : colors.gold,
                  color: hoveredBtn === 'submit' ? 'white' : colors.navy,
                  padding: '15px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer style={{
        backgroundColor: colors.navy,
        color: 'white',
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: `1px solid rgba(255,255,255,0.1)`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
          <p style={{ fontSize: '14px', margin: 0, opacity: 0.7 }}>
            © 2026 Enroute Medical Services. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Mail size={20} style={{ cursor: 'pointer' }} />
            <Phone size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </footer>

      {/* First Aid Helper Modal */}
      <FirstAidHelper 
        colors={colors} 
        isOpen={showFirstAidHelper} 
        onClose={() => setShowFirstAidHelper(false)} 
      />

      {/* First Aid Helper Button */}
      <button 
        onClick={() => setShowFirstAidHelper(true)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          backgroundColor: colors.red,
          color: 'white',
          padding: '15px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
          fontSize: '12px',
          fontWeight: 'bold',
          width: '60px',
          height: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px'
        }}
        title="First Aid Helper"
      >
        <HeartPulse size={16} />
        <span style={{ fontSize: '8px' }}>HELP</span>
      </button>
    </div>
  );
};

// Global input style helper
const inputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#f9f9f9'
};

export default MalindaEMS;