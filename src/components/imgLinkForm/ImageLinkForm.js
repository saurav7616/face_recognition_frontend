import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className='f3'>
				{'face detection in images'}
			</p>
			<div className='w-60 shadow-2 pa4 br3 center pattern'>
				<input className='f4 pa2 w-70 center' placeholder='enter url of your image (jpg only)' type='text' onChange={ onInputChange }/>
				<button className='w-30 grow f4 link ph3 pv2 dib br2 white bg-light-purple'
						onClick={ onButtonSubmit } >Detect</button>
			</div>
		</div>
	);
} 

export default ImageLinkForm;