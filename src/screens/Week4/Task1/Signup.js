import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native-animatable';

const Signup = ({navigation}) => {
  return (
    <View style={{margin: 5, flex: 1, backgroundColor: '#EDEDED'}}>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../../../assets/images/Week4/StatusBar.png')} />
      </View>

      {/* Welcome Note */}
      <View style={{flex: 2, justifyContent: 'center'}}>
        {/* Welcome Note */}
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
            }}>
            Welcome Onboard!
          </Text>
        </View>

        {/* Welcome Subnote */}
        <View>
          <Text
            style={{
              marginVertical: 10,
              color: '#55847AF7',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Let’s help you meet up your task
          </Text>
        </View>
      </View>

      {/* Credentials Input Field */}
      <View style={{flex: 3}}>
        <TextInput
          placeholder="Enter Your Full Name"
          style={styles.textinputfield}
        />
        <TextInput
          placeholder="Enter Your Email Address"
          style={styles.textinputfield}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Create a Password"
          style={styles.textinputfield}
        />
        <TextInput
          placeholder="Confirm Your Password"
          style={styles.textinputfield}
        />
      </View>

      {/* Sign Up Button */}
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#55847A',
            justifyContent: 'center',
            width: 220,
            alignSelf: 'center',
            height: 45,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Text */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signinbuttontext}>
          Already have an Account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

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
