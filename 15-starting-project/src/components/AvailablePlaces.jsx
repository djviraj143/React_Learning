import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailablePlaces} from '../http.js';

// const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetching(true);
        // Simulate a network request delay
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places, position.coords.latitude, position.coords.longitude);
          console.log('Current position:', position);
          setAvailablePlaces(sortedPlaces || []);
          setIsFetching(false);
        });
      } catch (error) {
        console.error('Error fetching available places:', error);
        setError({message: error.message || 'Could not fetch places, please try again later.'});
        setIsFetching(false);
      }
    }
    
    fetchPlaces();
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:3000/places')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAvailablePlaces(data.places || []);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching available places:', error);
  //     });
  // },[]);

  if (error) {
    return (
      <Error
        title="Error fetching places"
        message={error.message}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading available places ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
