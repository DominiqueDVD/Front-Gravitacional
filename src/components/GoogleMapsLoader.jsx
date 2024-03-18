import React, { useEffect, useState } from 'react';

function GoogleMapsLoader({ children }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing,places&v=weekly`;
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return scriptLoaded ? children : null;
}

export default GoogleMapsLoader;
