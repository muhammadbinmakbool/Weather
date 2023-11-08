import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Cicon from 'react-native-vector-icons/Entypo';
import Layout from './Layout';
import ApiDataContext from './ApiDataContext';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import Utility from './Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Location = () => {
  const navigation = useNavigation();
  const {wdata, setCity} = useContext(ApiDataContext);
  const [search, setSearch] = useState();
  const [cityWeatherData, setCityWeatherData] = useState([]);
  const [reFetchWeatherData, setReFetchWeatherData] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  // City Input
  const searchCity = city => {
    setSearch('');
    setCity(city);
    Keyboard.dismiss();
  };

  // Data Rendering
  useEffect(() => {
    if (!initialRender) {
      const checkcity = cityWeatherData.some(
        item => item.city === wdata.city.name,
      );
      if (!checkcity) {
        addCityData();
      }
      // else {
      //   Alert.alert('City Data Already Available');
      // }
      console.log(wdata.city.name, 'mmmmmmmmmmmmmm');
    } else {
      setInitialRender(false);
      getDatafromStorage();
    }
    console.log(cityWeatherData);
  }, [wdata]);

  // Adding New Data
  const addCityData = async () => {
    const firstData = [
      ...cityWeatherData,
      {
        city: wdata.city.name,
        temp: wdata.list[0].main.temp,
        icon: wdata.list[0].weather[0].icon,
      },
    ];
    await setDatatoStorage(firstData);
  };

  // Storing Data in Storage
  const setDatatoStorage = async data => {
    try {
      const value = JSON.stringify(data);
      await AsyncStorage.setItem('cityWeatherData', value);
      console.log('======Data Stored======');
      getDatafromStorage();
    } catch (error) {
      console.log('Error Storing Data');
    }
  };

  // Getting Data from Storage
  const getDatafromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('cityWeatherData');
      const convertData = JSON.parse(value);
      console.log('^^^^Data Fetched^^^^', convertData);
      if (convertData) {
        setCityWeatherData(convertData);
      } else {
        const firstData = {
          city: wdata.city.name,
          temp: wdata.list[0].main.temp,
          icon: wdata.list[0].weather[0].icon,
        };
        setCityWeatherData([firstData]);
      }
    } catch (e) {
      console.log('====Error Fetching Data====', e);
    }
  };

  // Delete Card
  const deleteHandler = value => {
    const filteredData = cityWeatherData.filter(item => item.city !== value);
    setDatatoStorage(filteredData);
  };

  // Navigate to Home
  const navigateToHome = value => {
    navigation.navigate('Home');
    setCity(value);
  };

  //Updating Weather Data
  const reFetchData = async () => {
    const updatedData = await (async () => {
      try {
        return await Promise.all(
          cityWeatherData.map(async item => {
            const response = await axios.get(
              `http://api.openweathermap.org/data/2.5/forecast?q=${item.city}&appid=8856d7e188a8d48769ee6a15d564a1f8&units=metric`,
            );
            if (response.status === 200) {
              const data = response.data;
              return {
                city: data.city.name,
                temp: data.list[0].main.temp,
                icon: data.list[0].weather[0].icon,
              };
            }
          }),
        );
      } catch (error) {
        console.log('Error Updating Data', error);
      }
    })();
    setCityWeatherData(updatedData);
  };

  return (
    <Layout>
      {/* Search Bar */}
      <View style={styles.locationSearchBar}>
        <TextInput
          style={{color: '#e0e0e0', fontSize: 16}}
          placeholder="Search City"
          keyboardAppearance="light"
          keyboardType="default"
          placeholderTextColor="#e0e0e0"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          onPress={() => searchCity(search)}
          style={{alignSelf: 'center'}}>
          <Icon name="search" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          // backgroundColor: 'blue',
          marginTop: 24,
          marginRight: 18,
          alignContent: 'center',
        }}>
        <TouchableOpacity onPress={() => reFetchData()}>
          <Icon name="reload-circle-outline" color="white" size={28} />
        </TouchableOpacity>
      </View>

      {/* City Temperature Card Container */}
      <View style={{marginTop: 6}}>
        <FlatList
          data={cityWeatherData}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.containerBorderCityTemp}
                onPress={() => navigateToHome(item.city)}>
                {/* Linear Gradient for Border */}
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    'rgba(199,75,76,1)',
                    'rgba(199,75,76,0.5)',
                    'rgba(199,75,76,0)',
                  ]}
                  style={styles.containerBorderCityTemp}>
                  {/* Linear Gradient for Card */}
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[
                      'rgba(108,66,67,1)',
                      'rgba(108,66,67,0.5)',
                      'rgba(108,66,67,0.1)',
                    ]}
                    style={styles.containerCityTemp}>
                    <TouchableOpacity onPress={() => deleteHandler(item.city)}>
                      <Cicon
                        name="cross"
                        color="grey"
                        style={{
                          position: 'absolute',
                          top: 3,
                          right: 7,
                        }}
                        size={15}
                      />
                    </TouchableOpacity>
                    <View
                      style={[
                        {
                          flex: 2,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                        },
                      ]}>
                      <Text style={styles.dailyWeatherText}>{item.temp}</Text>
                      <Utility iconCode={item.icon} size={50} />
                    </View>
                    <View style={{paddingLeft: 10, paddingBottom: 10}}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        {item.city}
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Layout>
  );
};

export default Location;
