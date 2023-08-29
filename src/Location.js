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

const Location = () => {
  const navigation = useNavigation();
  const {wdata, setCity} = useContext(ApiDataContext);
  const [search, setSearch] = useState();
  const [cityWeatherData, setCityWeatherData] = useState([]);
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
          <Icon name="search" color="white" style={{fontSize: 20}} />
        </TouchableOpacity>
      </View>

      {/* City Temperature Card Container */}
      <View style={{marginTop: 20}}>
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
