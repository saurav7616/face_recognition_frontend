import React from 'react';
import './FaceReco.css';

const FaceReco = ({imgUrl, box}) => {
	return(
		<div className='center'>
			<div className='absolute'>
				<img alt='   ' id='inputImage' src={imgUrl} style={{ paddingTop: 20, height: 280, width: 'auto'}}/>
				<div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}} ></div>
			</div>
		</div>
	);
}

export default FaceReco; 