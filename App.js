import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Keyboard, Animated, Dimensions, KeyboardAvoidingView} from 'react-native';
import logo from './logo-final.png';

let {width, height} = Dimensions.get('window');
const bigImage = width / 2 - 22;
const smallImage = width / 5;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //topLogo: {height: bigImage},
      contentToggle: true
    };
    this.imageHeight = new Animated.Value(bigImage);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow (e) {
    console.log('keyboardDidShow', e);
    //let newSize = height - e.endCoordinates.height;
    this.setState({
      //visibleHeight: newSize,
      //topLogo: {height: smallImage},
      contentToggle: false
    })

    Animated.parallel([
      Animated.timing(this.imageHeight, {
        duration: 300,
        toValue: smallImage
      })
    ]).start();
  }

  keyboardDidHide (e) {
    console.log('keyboardDidHide', e);
    this.setState({
      //visibleHeight: height,
      //topLogo: {height: bigImage},
      contentToggle: true
    })

    Animated.parallel([
      Animated.timing(this.imageHeight, {
        duration: 300,
        toValue: bigImage
      })
    ]).start();
  }

  render() {
    console.log('State', this.state);
    return (
        <View style={[styles.container]}>
          <View>
            <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
          </View>

          {this.state.contentToggle ?
              <Text>{instructions}</Text>
              : null
          }

          <KeyboardAvoidingView>
            <TextInput
                placeholder="Email"
                style={styles.input}
            />
          </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: width - 30,
  },
  logo: {
    //height: width / 2,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20
  }
});
