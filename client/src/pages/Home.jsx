import React, {useRef ,useEffect } from "react";
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN ;

const Home = (props) => {
  // Implement react map box here.
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/light-v10',
      center: [2.3488, 48.8534],
      zoom: 12.5,
    });
  })

  

  
  return (
    <div style={{width: "100%", height:"100vh"}} ref={mapContainerRef}>
      <h1>MAPBOX MAP HERE</h1>
      <p>On home /</p>
    </div>
  );
};

export default Home;
