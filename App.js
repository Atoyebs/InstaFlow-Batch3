import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, StatusBar, ScrollView, Linking, WebView } from 'react-native';
import Dimensions from 'Dimensions';

//Import Custom Components Here
import LoginButton from './src/components/LoginButton';
import TappableText from './src/components/TappableText';


//this code will give us the width and the height of our current screen
const windowSize = Dimensions.get('window');

//size definitions HERE
const standardComponentWidth = (0.82 * windowSize.width);

const colors = {
  facebook: 'rgb(59, 89, 152)',
  text: 'rgba(255, 255, 255, 0.7)',
  socialMediaButtonBorderColor: 'rgba(255, 255, 255, 0.35)'
}

const sizes = {
  buttonHeight: 52,
  pageFontSize: 12,
  borderWidth: 0.8,
  borderRadius: 5,
  twitterIcon: 18
}

const urls = {
  forgotInstagramLogin: 'https://www.instagram.com/accounts/password/reset',
  twitterLogin: 'https://twitter.com/login?lang=en',
  instagramSignUp: 'https://www.instagram.com/accounts/emailsignup/?hl=en',
  instagramAuthLogin: 'https://api.instagram.com/oauth/authorize/?client_id=c31ae4eb27dc48ddb9257a6816458cd0&redirect_uri=http://www.kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/',
}


export default class App extends Component {

  constructor(props){

    super(props);

    //this is what the state of the app will be when the app first starts up
    this.state = {
      authenticationURL: urls.instagramAuthLogin,
      accessToken: '',
      displayAuthenticationWebView: false,
      displayLoginScreen: true
    }

  }


  onURLStateChange = (webViewState) => {

    //the string to search for in the url in order to get an access token
    const accessTokenSubString = 'access_token=';

    //this will store the currentURL being displayed in our custom browser
    const currentURL = webViewState.url;

    console.log("Current URL = " + currentURL);

    //if the currentURL includes the accessTokenSubString
    if( currentURL.includes(accessTokenSubString) ){

      //if the access token hasn't been set/populated
      if(this.state.accessToken.length < 1){

        /*
        this will store the index of the a in access_token= and
        add on the number of characters in access_token= to find the
        beginning of the access token
        */
        var startIndexOfAccessToken = currentURL.lastIndexOf(accessTokenSubString) + accessTokenSubString.length;
        var foundAccessToken = currentURL.substr(startIndexOfAccessToken);

        console.log("Found Access Token = " + foundAccessToken);

        this.setState({ accessToken: foundAccessToken, displayAuthenticationWebView: false, displayLoginScreen: false  });

      }

    }

  }

  instagramFeedPageComponent = () => {
    return (
      <View style={[ viewStyles.container, { justifyContent: 'center'} ]}>
        <Text>Welcome to our instagram feed page</Text>
      </View>
    );
  }

  authenticationWebViewComponent = () => {
    return (
      <WebView
        source={{ uri: this.state.authenticationURL }}
        startInLoadingState={true}
        onNavigationStateChange={this.onURLStateChange}
      />
    );
  }

  buttonTapped = () => {
    //when the button is pressed, change displayAuthenticationWebView to true
    this.setState({ displayAuthenticationWebView: true, displayLoginScreen: false });
  }


  loginWithTwitterComponent = () => {
    return (
      <View style={viewStyles.twitterLoginContainer}>

        <Image
          resizeMode={'contain'}
          style={viewStyles.twitterIcon}
          source={require('./src/images/icons/twitter_bird.png')}
        />

        <TappableText
          textStyle={[textStyles.forgotLoginDetails, textStyles.forgotLoginDetailsBold, {fontSize: 12} ]}
          textTapped={ () => Linking.openURL(urls.twitterLogin) }
        >
          Log In With Twitter
        </TappableText>

      </View>
    );
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

          <LoginButton
            buttonViewStyle={viewStyles.instagramLoginButtonView}
            buttonTextStyle={textStyles.instragamButtonTextStyle}
            buttonTapped={this.buttonTapped}
            touchableHighlightStyle={viewStyles.instagramTouchableHighlightStyle}
            activeOpacity={0.75}
          >
            Log In (Via Instagram)
          </LoginButton>

          <LoginButton
            buttonViewStyle={[viewStyles.instagramLoginButtonView, viewStyles.facebookLoginButtonView]}
            buttonTextStyle={[textStyles.instragamButtonTextStyle, { fontSize: 15, fontWeight: 'bold'}]}
            buttonTapped={this.buttonTapped}
            touchableHighlightStyle={[viewStyles.instagramTouchableHighlightStyle, viewStyles.facebookButtonTouchableHighlightStyle]}
            activeOpacity={0.75}
            iconSource={require('./src/images/facebook-white-logo.png')}
          >
             acebook
          </LoginButton>

          { this.forgotLoginDetailsComponent('Forgot your login details?', 'Get help signing in.', urls.forgotInstagramLogin) }

          { this.orSeparatorComponent() }

          { this.loginWithTwitterComponent() }

        </ScrollView>

        { this.signupFooterComponent() }

      </ImageBackground>
    );
  }

  signupFooterComponent = () => {
    return (
      <View style={viewStyles.signupFooterContainer}>
        { this.forgotLoginDetailsComponent('Dont have an account?', 'Sign up.', urls.instagramSignUp) }
      </View>
    );
  }

  forgotLoginDetailsComponent = (normalText, boldText, url) => {
    return (
      <View style={viewStyles.forgotLoginDetailsContainer}>
        <Text style={textStyles.forgotLoginDetails}>{normalText}</Text>
        <TappableText
          textStyle={[textStyles.forgotLoginDetails, textStyles.forgotLoginDetailsBold]}
          textTapped={ () => Linking.openURL(url) }
        >
          {boldText}
        </TappableText>
      </View>
    );
  }

  orSeparatorComponent = () => {
    return(
      <View style={viewStyles.orSeparatorContainer}>
        <View style={viewStyles.orSeparatorLine}/>
        <Text style={textStyles.orSeparatorTextStyle}>OR</Text>
        <View style={viewStyles.orSeparatorLine}/>
      </View>
    );
  }

  render() {

    const shouldDisplayFeedPage = (this.state.accessToken.length > 1 && this.state.displayAuthenticationWebView == false && this.state.displayLoginScreen == false);

    if(this.state.displayLoginScreen && this.state.displayAuthenticationWebView == false){
      return (
        this.loginScreenComponent()
      );
    }
    else if (this.state.displayLoginScreen == false && this.state.displayAuthenticationWebView){
      return (
        this.authenticationWebViewComponent()
      );
    }
    else if (shouldDisplayFeedPage){
      return (
        this.instagramFeedPageComponent()
      );
    }

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
    marginBottom: 20,
    alignSelf: 'center'
  },
  scrollViewStyle: {
    paddingTop: '30%'
  },
  instagramLoginButtonView: {
    backgroundColor: 'transparent',
    borderColor: colors.socialMediaButtonBorderColor,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    width: standardComponentWidth,
    height: sizes.buttonHeight
  },
  facebookLoginButtonView: {
    backgroundColor: colors.facebook,
    borderColor: 'transparent'
  },
  instagramTouchableHighlightStyle: {
    width: standardComponentWidth,
    height: sizes.buttonHeight,
    marginTop: 5
  },
  facebookButtonTouchableHighlightStyle:{
    marginTop: 20,
    marginBottom: 5
  },
  forgotLoginDetailsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10
  },
  orSeparatorContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '7%'
  },
  orSeparatorLine:{
    height: 1,
    flex: 5,
    backgroundColor: colors.socialMediaButtonBorderColor,
    borderColor: colors.socialMediaButtonBorderColor,
    borderWidth: 0.5,
    marginHorizontal: 5
  },
  twitterLoginContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  twitterIcon: {
    width: sizes.twitterIcon,
    height: sizes.twitterIcon,
    marginHorizontal: 4
  },
  signupFooterContainer: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5.5 },
    width: '100%'
  }

};

const textStyles = {

  instragamButtonTextStyle: {
    color: colors.text,
    fontWeight: '500'
  },
  forgotLoginDetails:{
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: sizes.pageFontSize,
    marginRight: 3
  },
  forgotLoginDetailsBold: {
    fontWeight: 'bold'
  },
  orSeparatorTextStyle: {
    color: colors.socialMediaButtonBorderColor,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 13
  }

};
