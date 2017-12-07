import React, {Component} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';

class LoginButton extends Component {

  constructor(props){
    super(props);
  }


  getViewComponent = () => {

    //if the component is supposed to have an icon
    if(this.props.iconSource){
      return (
        <View style={[this.props.buttonViewStyle, viewStyles.buttonViewStyle]}>
          <Image
            resizeMode={'contain'}
            style={[ {width: 30, height: 30}, this.props.iconStyle]}
            source={this.props.iconSource}
          />
          <Text style={[this.props.buttonTextStyle, { backgroundColor: 'transparent', marginLeft: 20} ]}>{this.props.children}</Text>
        </View>
      );
    }
    //this (else) is for if the button shouldn't have an icon
    else {
      return (
        <View style={[this.props.buttonViewStyle, viewStyles.buttonViewStyle]}>
          <Text style={[this.props.buttonTextStyle, { backgroundColor: 'transparent'} ]}>{this.props.children}</Text>
        </View>
      );
    }

  }

  render(){
    return(
      <TouchableHighlight
        underlayColor={'transparent'}
        activeOpacity={this.props.activeOpacity}
        style={[this.props.touchableHighlightStyle, viewStyles.touchableHighlightStyle]}
        onPress={this.props.buttonTapped}
      >

        <View style={[this.props.buttonViewStyle, viewStyles.buttonViewStyle]}>
          <Text style={[this.props.buttonTextStyle, { backgroundColor: 'transparent'} ]}>{this.props.children}</Text>
        </View>

      </TouchableHighlight>
    );
  }

}

const viewStyles = {
  touchableHighlightStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const textStyles = {

};

export default LoginButton;
