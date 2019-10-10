import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcon from '../components/WeatherIcon';
import PageWrapper from '../components/PageWrapper';

const apiKey = '14e9d5aa4b9258acb376e4ca1ed41684';

export default function Home(props) {
  const [error, isError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, isSuccess] = useState(true);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherType, setWeatherType] = useState('');
  const [cloudy, setCloudy] = useState(0);

  function apiCallback(response) {
    console.log('response', response);
    if(response.status !== 200) {
      isError(true);
      setErrorMessage(`${response.status}: ${'Error'}`);
    } else {
      isSuccess(true);
    }
    setWeather(response.data);
  }

  useEffect(() => {
    let getWeatherType = weather.weather ? weather.weather[0].main : '';
    let getCloudy = weather.clouds ? weather.clouds.all : 0;
    setWeatherType(getWeatherType)
    setCloudy(getCloudy)
  }, [weather])

  useEffect(() => {
  	const urlParams = new URLSearchParams(props.location.search)
  	const cityParam = urlParams.get('city') ? urlParams.get('city') : 'Okinawa';

  	setCity(cityParam);

    console.log(props);

    function queryWeatherAPI(cityParam) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&APPID=${apiKey}`)
      .then(function(response) {
        console.log('response', response);
        setWeather(response);
        return response;
      })
      .catch(function(error) {
        console.log('error', error);
        return error;
      });

    queryWeatherAPI('Okinawa');
    console.log('weather test', queryWeatherAPI('Okinawa'));
    }
 }, []); //closes initial function, empty array 

    return (
      <PageWrapper cloudy={cloudy}>
            <div className="WeatherNav">
              <a 
                className={`WeatherNav__Item ${city === 'Morocco' ? 'WeatherNav__Item--active' : ''}`}
                href="/?city=Morocco"
              >
                Morocco
              </a>
              <a 
                className={`WeatherNav__Item ${city === 'Busan' ? 'WeatherNav__Item--active' : ''}`}
                href="/?city=Busan"
              >
                Busan
              </a>
              <a 
                className={`WeatherNav__Item ${city === 'Toronto' ? 'WeatherNav__Item--active' : ''}`}
                href="/?city=Toronto"
              >
                Toronto
              </a>
              <a 
                className={`WeatherNav__Item ${city === 'Reykjavik' ? 'WeatherNav__Item--active' : ''}`}
                href="/?city=Reykjavik"
              >
                Reykjavik
              </a>
           </div>
          
          
          <div>
            <h3>Weather in: <span>{city}</span></h3>


            <WeatherIcon weatherValue={weatherType}/>
            <p>{weatherType}</p>
            <p>Current Temp: {weather.data ? weather.data.main.temp: ''}</p>
            <p>Humidity: {weather.data ? weather.data.main.humidity: ''}% </p>
            <p>High Temperature: {weather.data ? weather.data.main.temp_max: ''}</p>
            <p>Low Temperature: {weather.data ? weather.data.main.temp_min: ''}</p>
            <p>Cloudiness: {weather.clouds ? weather.data.clouds.all: ''}</p>
            <p>Wind: {weather.wind ? weather.wind.speed: ''}km/H coming at {weather.wind ? weather.wind.degrees: ''}}</p>
          </div>
      </PageWrapper>
    )
}