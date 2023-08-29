import {FlatList, Image, Text, View, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import Layout from './Layout';
import ApiDataContext from './ApiDataContext';
import Utility from './Utility';
import styles from './Styles';
const Home = () => {
  const deviceHeight = Dimensions.get('screen').height;

  // Getting Data from Context API
  const {wdata} = useContext(ApiDataContext);

  return (
    <Layout>
      <View style={{justifyContent: 'center', paddingTop: deviceHeight * 0.04}}>
        {/* City Name */}
        <Text style={styles.cityName}>{wdata?.city?.name}</Text>

        {/* Temperature */}
        <View style={styles.temperature}>
          <Utility iconCode={wdata?.list[0].weather[0].icon} size={70} />
          <Text style={styles.cityName}>{wdata?.list[0]?.main?.temp}°C</Text>
        </View>

        {/* Weather Details */}
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: 8,
            marginHorizontal: deviceHeight * 0.05,
            marginVertical: deviceHeight * 0.05,
            // opacity: 0.5,
            borderRadius: 15,
          }}>
          {/* 1st Row */}
          <View style={styles.detailRow}>
            {/* Humidity */}
            <View>
              <Image
                source={{uri: 'http://i.imgur.com/FPVzgY4.png'}}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>Humidity</Text>
              <Text style={styles.detailText}>
                {wdata?.list[0]?.main?.humidity} %
              </Text>
            </View>
            {/* Wind */}
            <View>
              <Image
                source={{uri: 'https://i.imgur.com/FxTYkzM.png'}}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>wind</Text>
              <Text style={styles.detailText}>
                {wdata?.list[0]?.wind?.speed} km/h
              </Text>
            </View>
            {/* Cloud */}
            <View>
              <Image
                source={{uri: 'https://i.imgur.com/fdNkZBI.png'}}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>Cloud</Text>
              <Text style={styles.detailText}>
                {wdata?.list[0]?.clouds?.all} %
              </Text>
            </View>
          </View>

          {/* 2nd Row */}
          <View style={styles.detailRow}>
            {/* Sea Level */}
            <View>
              <Image
                source={{uri: 'https://i.imgur.com/18xJymp.png'}}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>Sea Level</Text>
              <Text style={styles.detailText}>
                {wdata?.list[0]?.main?.sea_level}
              </Text>
            </View>
            {/* Pressure */}
            <View>
              <Image
                source={{uri: 'https://i.imgur.com/hr0JWrW.png'}}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>Pressure</Text>
              <Text style={styles.detailText}>
                {wdata?.list[0]?.main?.humidity} %
              </Text>
            </View>
            {/* Visibility */}
            <View>
              <Image
                source={{uri: 'https://i.imgur.com/4cPFbwt.png'}}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>Visibility</Text>
              <Text style={styles.detailText}>
                {wdata?.list[0]?.visibility}
              </Text>
            </View>
          </View>
        </View>

        {/* Hourly Temperature */}
        {wdata && (
          <FlatList
            data={wdata.list.slice(1, 9)}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255,0.8)',
                    padding: 8,
                    marginHorizontal: 5,
                    opacity: 0.8,
                    borderRadius: 15,
                    width: 70,
                    marginTop: deviceHeight * 0.05,
                  }}>
                  <Text style={styles.hourlyWeatherDetail}>
                    {item.dt_txt.substring(11, 16)}
                  </Text>
                  <Utility iconCode={item.weather[0].icon} size={30} />
                  <Text style={styles.hourlyWeatherDetail}>
                    {item.weather[0].main}
                  </Text>
                  <Text style={styles.hourlyWeatherDetail}>
                    {item.main.temp}°C
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </Layout>
  );
};

export default Home;
