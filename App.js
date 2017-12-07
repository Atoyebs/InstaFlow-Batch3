import React, { Component } from 'react';
import {Text, View, ImageBackground, Image, StatusBar, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';


//this code will give us the width and the height of our current screen
const windowSize = Dimensions.get('window');


export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {

    }

  }

  loginScreenComponent = () => {
    return (
      <ImageBackground
        style={viewStyles.container}
        resizeMode={'cover'}
        source={require('./src/images/instabackground-3.jpg')}
      >

        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />

        <ScrollView style={viewStyles.scrollViewStyle}>

          <Image
            style={viewStyles.instagramLogo}
            resizeMode={'contain'}
            source={require('./src/images/instagram-text-logo.png')}
          />


        </ScrollView>

      </ImageBackground>
    );
  }


  render() {
    return (
      this.loginScreenComponent()
    );
  }
}

const viewStyles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  instagramLogo: {
    width: (0.45 * windowSize.width),
    height: (0.15 * windowSize.height),
    marginBottom: 25,
    alignSelf: 'center'
  },
  scrollViewStyle: {
    paddingTop: '35%'
  }

};
