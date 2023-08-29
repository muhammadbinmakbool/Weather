import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native-animatable';

const Login = ({navigation}) => {
  return (
    <View style={{margin: 5, backgroundColor: '#EDEDED'}}>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../../../assets/images/Week4/StatusBar.png')} />
      </View>
      {/* Welcome Note */}
      <View style={{justifyContent: 'center', marginVertical: 10}}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
              marginVertical: 20,
            }}>
            Welcome Back!
          </Text>
        </View>

        <View>
          <Image
            source={require('../../../assets/images/Week4/youngman.png')}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
        </View>
      </View>

      {/* Credentials Input Field */}
      <View style={{marginVertical: 10}}>
        <TextInput
          placeholder="Enter Your Email Address"
          style={styles.textinputfield}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.textinputfield}
        />
      </View>

      {/* Sign In Button */}
      <View style={{marginVertical: 10}}>
        <Text
          style={{
            color: '#55847AF7',
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Forgot Password?
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#55847A',
            justifyContent: 'center',
            width: 220,
            alignSelf: 'center',
            height: 45,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('AddTask')}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signinbuttontext}>
          Don't Have an Account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  signinbuttontext: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  textinputfield: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    fontWeight: 'bold',
  },
});
