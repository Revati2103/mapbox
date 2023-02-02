import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import Map, {NavigationControl} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API

export default function App() {

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4
  });



  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

 

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 500 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );
  const navControlStyle = {
    left: 10,
    bottom: 10,
  };

  return (
    <div style={{ height: "100vh" }}>
      <Map
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        projection= 'globe' 
        
      >
       
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      
      <NavigationControl
       style={navControlStyle}
       showCompass={true}
       showZoom={true}
     />

      </Map>
    </div>
  );
};

