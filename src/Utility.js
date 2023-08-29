import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

const Utility = ({iconCode, size}) => {
  // Getting Weather Image
  const imageMapping = {
    '01d': 'https://i.imgur.com/5xQSDP9.png',
    '02d': 'https://i.imgur.com/SfCRlY1.png',
    '03d': 'https://i.imgur.com/7qAeVcu.png',
    '04d': 'https://i.imgur.com/ZHhBvYx.png',
    '09d': 'https://i.imgur.com/OQx4Sgf.png',
    '10d': 'https://i.imgur.com/SGZoWQX.png',
    '11d': 'https://i.imgur.com/RrDltCv.png',
    '13d': 'https://i.imgur.com/QTQcH0U.png',
    '50d': 'https://i.imgur.com/143oKtM.png',
    '01n': 'https://i.imgur.com/IxMmVLR.png',
    '02n': 'https://i.imgur.com/bOyIXau.png',
    '03n': 'https://i.imgur.com/7qAeVcu.png',
    '04n': 'https://i.imgur.com/ZHhBvYx.png',
    '09n': 'https://i.imgur.com/OQx4Sgf.png',
    '10n': 'https://i.imgur.com/vVVyRwR.png',
    '11n': 'https://i.imgur.com/RrDltCv.png',
    '13n': 'https://i.imgur.com/QTQcH0U.png',
    '50n': 'https://i.imgur.com/143oKtM.png',
  };

  const imageurl = imageMapping[iconCode];
  if (imageurl) {
    return (
      <View>
        <Image
          source={{uri: imageurl}}
          style={[styles.hourlyWeatherIcon, {height: size, width: size}]}
        />
      </View>
    );
  }
};

export default Utility;

const styles = StyleSheet.create({
  hourlyWeatherIcon: {
    alignSelf: 'center',
    marginVertical: 5,
  },
});
