import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import ApiDataContext from './ApiDataContext';
import LottieView from 'lottie-react-native';
const Layout = ({children}) => {
  const {loading} = useContext(ApiDataContext);
  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  return (
    <View>
      <ImageBackground
        blurRadius={10}
        source={{
          uri: 'https://1.bp.blogspot.com/-Iz8Pxypj45E/XHfPWwyVMhI/AAAAAAAA--4/zmtgHK5Iexoy57Ja4iYROMs_PkcF1RdJQCLcBGAs/s1600/tumblr_pb5dml9vkW1svp654o1_1280.jpg',
        }}
        style={{
          width: deviceWidth,
          height: deviceHeight,
          position: 'absolute',
          opacity: 1,
        }}>
        {loading && (
          <View style={styles.container}>
            <LottieView
              source={require('./assets/animation/Loading2.json')}
              autoPlay
              loop
              style={{
                width: '100%',
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        )}
        {!loading && children}
      </ImageBackground>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
