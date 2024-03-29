import React from 'react';

export default function PageWrapper({cloudy, children}) {
	const wrapperOpacity = cloudy ? (cloudy * 0.01) : 0;

	return (
		<div style={{
			height: '100%',
			width: '100%',
			minHeight: '100vh',
			minWidth: '100vw',
			backgroundColor: `rgba((0,0,0,${wrapperOpacity}))`
		}}>
			<div className="PageWrapper">
				{children}
			</div>
		</div>
	)
}