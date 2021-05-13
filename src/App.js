import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/nav/Navigation.js';
import SignIn from './components/signin/SignIn.js';
import Register from './components/register/Register.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imgLinkForm/ImageLinkForm.js';
import Rank from './components/rank/Rank.js';
import FaceReco from './components/facereco/FaceReco.js';



const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)  
      }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://limitless-beyond-15822.herokuapp.com/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://limitless-beyond-15822.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response=> response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
      
  }

  loadUser = (data) => {
    this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if(route === 'SignIn'){
      this.setState({isSignedIn:false});
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true, imageUrl: ''});
    }

    this.setState({ route: route});
  }

  render() {
    return (
      <div className="App">
         <Particles 
          className='particles'
          params={particlesOptions}
         />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home' 
              ? <div> 
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm 
                        onInputChange={this.onInputChange} 
                        onButtonSubmit={this.onButtonSubmit} 
                    />
                    <FaceReco box={this.state.box} imgUrl={this.state.imageUrl} />
                </div>
              : ( this.state.route === 'SignIn'
                    ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange } />
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange } />
                )
        }
      </div>
    );
  }
}

export default App;