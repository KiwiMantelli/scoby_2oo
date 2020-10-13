import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";




const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});


const Home = (props) => {
  // Implement react map box here.
  

  
  

  
  return (
    <Map style="mapbox://styles/mapbox/light-v10"  center={[2.3488, 48.85341]}  containerStyle={{
      height: '100vh',
      width: '100vw',
     
    }}>
<Marker
  coordinates={[2.416815, 48.5285582]}
  anchor="bottom">
  <img style={{width: 64, height: 64}} src="https://pbs.twimg.com/profile_images/561277979855056896/4yRcS2Zo.png" alt=""/>
</Marker>
    </Map>
  );
};

export default Home;
