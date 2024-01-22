"use client"
import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth*0.5
  };
  
  const {source, setSource}=useContext(SourceContext);
  const {destination,setDestination}=useContext(DestinationContext);

  const [center, setCenter]=useState(
    {lat: 6.5,
    lng: 3.3
  });

  const [map, setMap] = React.useState(null)
  const [directionRoutePoints, setDirectionRoutePoint] = useState([]);

  //basically the useEffect function over here works with the [sources] or [destination] 
  useEffect(()=>{
    if (source.length !== 0 && map) {

      map.panTo(
        {
          lat:source.lat,
         lng:source.lng
        })
  
      setCenter({
        lat:source.lat,
        lng:source.lng
      })
    }

  
    if (source.length!==0&&destination.length!==0){
      directionRoute();
    }
  },[source])

  useEffect(()=>{

    if (destination.length !== 0 && map) {
      // your code
      setCenter({
        lat:destination.lat,
        lng:destination.lng
      })
    }
   
    if (source.length!==0&&destination.length!==0){
      directionRoute();
    }
  },[destination])

  const directionRoute = async () => {
    const DirectionService = new google.maps.DirectionsService();
  
    try {
      const result = await DirectionService.route({
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      setDirectionRoutePoint(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  const onLoad = React.useCallback(function callback(map) {
   
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
  map.fitBounds(bounds);
  setMap(map);
}, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'b6cc0bf325a0d63'}}
      >
        {source.length!=[]?<MarkerF
        position={{lat:source.lat, lng:source.lng}}
        icon={{
          url:"/source.png"
        }}
        />:null}

        {destination.length!=[]?<MarkerF
        position={{lat:destination.lat, lng:destination.lng}}
        icon={{
          url:"/dest.png"
        }}
        />:null}
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions:{
            strokeColor:'#374151'
          },
          suppressMarkers:true
        }}
        />
      </GoogleMap>
  )
}

export default GoogleMapSection