import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';

// make the imports camelCase

export default function WeatherIcon({weatherValue}) {
	switch(weatherValue) {
		case 'Rain':
			return (
				<FontAwesomeIcon 
					icon={faCloudRain}
				/>
			);
		case 'Cloudy':
			return (
				<FontAwesomeIcon 
					icon={faCloud}
					className="WeatherIcon"
					size="2x"
				/>
			);
		case 'Sun':
			return (
				<FontAwesomeIcon
					icon={faSun}
					className="WeatherIcon"
					size="2x"
				/>
			);
		default:
			return (<div>{weatherValue}</div>);
	}
} 
