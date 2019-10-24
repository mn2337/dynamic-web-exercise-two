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
    let getWeatherType = weather.data ? weather.data.weather[0].main : '';
    let getCloudy = weather.data ? weather.data.clouds.all : '';
    setWeatherType(getWeatherType);
    setCloudy(getCloudy);
  }, [])

  useEffect(() => {
  	const urlParams = new URLSearchParams(props.location.search)
  	const cityParam = urlParams.get('city') ? urlParams.get('city') : 'Morocco';

    queryWeatherAPI(`${cityParam}`);
    console.log('weather test', queryWeatherAPI('Morocco'));

  	setCity(cityParam);

    console.log(props);

    function queryWeatherAPI(cityParam) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&APPID=${apiKey}`)
      .then(function(response) {
        console.log('response', response)
        setWeather(response);
        return response;
      })
      .catch(function(error) {
        console.log('error', error);
        return error;
      });

    }
 }, []); 

return (
  <PageWrapper cloudy={cloudy}>
    <br></br>
    <div className="WeatherNav">
      <a 
        className={`WeatherNav__Item ${city === 'Morocco' ? 'WeatherNav__Item--active' : ''}`}
        href="/?city=Morocco"
      >
       Morocco
     </a>&nbsp;&nbsp;&nbsp;
      <a 
        className={`WeatherNav__Item ${city === 'Busan' ? 'WeatherNav__Item--active' : ''}`}
        href="/?city=Busan"
      >
        Busan
      </a>&nbsp;&nbsp;&nbsp;
      <a 
        className={`WeatherNav__Item ${city === 'Toronto' ? 'WeatherNav__Item--active' : ''}`}
        href="/?city=Toronto" 
      >
        Toronto
      </a>&nbsp;&nbsp;&nbsp;
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
      <br></br>
      <p>{weather.data ? weather.data.weather[0].main : ''}</p>
      <br></br>
      <p>Current Temp: {weather.data ? weather.data.main.temp: ''} - 273.15 C</p>
      <p>Humidity: {weather.data ? weather.data.main.humidity: ''}% </p>
      <p>High Temperature: {weather.data ? weather.data.main.temp_max: ''} - 273.15 C</p>
      <p>Low Temperature: {weather.data ? weather.data.main.temp_min: ''} - 273.15 C</p>
      <p>Cloudiness: {weather.data ? weather.data.clouds.all: ''}%</p>
      <p>Wind: {weather.data ? weather.data.wind.speed: ''}km/H coming at {weather.data ? weather.data.wind.deg: ''} degrees</p>
    </div>
  </PageWrapper>
  )
}