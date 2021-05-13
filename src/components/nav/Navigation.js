import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn){
		return (
			<nav style={{ float: 'right'}}>
				<p onClick={() => onRouteChange('SignIn')} className='f3 link dim black underline pa3 pointer ma0'>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav style={{ float: 'right'}}>
				<p onClick={() => onRouteChange('SignIn')} className='f5 link dim black underline pa3 pointer ma0'>Sign In</p>
				<p onClick={() => onRouteChange('Register')} className='f5 link dim black underline pa3 pointer ma0'>Register</p>
			</nav>
		);
	}
}

export default Navigation;