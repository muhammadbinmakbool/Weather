import {FlatList, Text, View, Dimensions} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Layout from './Layout';
import LinearGradient from 'react-native-linear-gradient';
import ApiDataContext from './ApiDataContext';
import Utility from './Utility';
import styles from './Styles';

const Future = () => {
  const deviceHeight = Dimensions.get('screen').height;
  const [selectedData, setSelectedData] = useState();

  const {wdata} = useContext(ApiDataContext);

  // Day Name
  const getDaybyDate = d => {
    const apiDate = new Date(d);
    const dayofWeek = apiDate.getDay();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = days[dayofWeek];
    if (dayName) {
      return <Text>{dayName}</Text>;
    }
  };

  // Daily Forecast Data Filter
  const getSelectedData = useCallback(() => {
    const selectedIndex = [8, 16, 24, 32];
    if (wdata) {
      const selectData = selectedIndex.map(i => {
        return {
          dt_txt: wdata.list[i].dt_txt,
          temp: wdata.list[i].main.temp,
          icon: wdata.list[i].weather[0].icon,
        };
      });
      setSelectedData(selectData);
    }
  }, [wdata]);

  useEffect(() => {
    getSelectedData();
  }, [wdata]);

  return (
    <View>
      <Layout>
        <View>
          <Text style={styles.title}>Forecast Details</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              marginLeft: 10,
              fontFamily: 'serif',
              fontWeight: 'bold',
            }}>
            Today
          </Text>
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
                    borderColor: 'black',
                    borderRadius: 1,
                    margin: 10,
                    padding: 5,
                  }}>
                  <Text style={styles.hourly_temp}>
                    {item.dt_txt.substring(11, 16)}
                  </Text>
                  <View style={styles.hourlyIconBackgroundStyle}>
                    <Utility iconCode={item.weather[0].icon} size={30} />
                  </View>
                  <Text style={styles.hourly_temp}>{item.main.temp}°C</Text>
                </View>
              );
            }}
          />
        )}

        {/* Daily Forecast */}
        <View style={{height: deviceHeight * 0.735}}>
          <Text style={styles.title}>Next Forecast</Text>
          <FlatList
            data={selectedData}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    borderRadius: 15,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      'rgba(199,75,76,1)',
                      'rgba(199,75,76,0.5)',
                      'rgba(199,75,76,0)',
                    ]}
                    style={styles.containerBorderDailyTemp}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[
                        'rgba(108,66,67,1)',
                        'rgba(108,66,67,0.5)',
                        'rgba(108,66,67,0)',
                      ]}
                      style={styles.linearGradient}>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.dailyWeatherText}>
                          {getDaybyDate(item.dt_txt)}
                        </Text>
                        <Text style={{color: 'white'}}>
                          {item.dt_txt.substring(0, 10)}
                        </Text>
                      </View>
                      <Text style={styles.dailyWeatherText}>{item.temp}°C</Text>
                      <Utility iconCode={item.icon} size={50} />
                    </LinearGradient>
                  </LinearGradient>
                </View>
              );
            }}
          />
        </View>
      </Layout>
    </View>
  );
};

export default Future;
