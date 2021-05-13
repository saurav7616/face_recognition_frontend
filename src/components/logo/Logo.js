import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		<div className='ma0 mb5 pa0 mt0'>
			<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 50, width: 150 }} >
				 <div className="Tilt-inner pa0"><img alt='logo' src={brain}/></div>
			</Tilt>
		</div>
	);
}

export default Logo;