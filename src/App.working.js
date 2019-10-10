import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '14e9d5aa4b9258acb376e4ca1ed41684';

export default function Home(props) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  function queryWeatherAPI(queryCity) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&APPID=${apiKey}`)
    .then(function(response) {
      console.log('response', response);
      setWeather(response);
      return response;
    })
    .catch(function(error) {
      console.log('error', error);
      return error;
    });
  }


  useEffect(() => {
    setCity('Okinawa');
    queryWeatherAPI('Okinawa');
    console.log('weather test', queryWeatherAPI('Okinawa'));
  }, []); //closes initial function, empty array updates

  console.log('weather',weather);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Humidity: {weather.data ? weather.data.main.humidity: ''}% </p>
      <p>Temperature: {weather.data ? weather.data.main.temp: ''}K</p>
    </div>
  );
}