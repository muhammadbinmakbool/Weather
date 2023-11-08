import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from './src/Home';
import {NavigationContainer} from '@react-navigation/native';
import Future from './src/Future';
import Location from './src/Location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ApiDataProvider} from './src/ApiDataContext';
import {BlurView} from '@react-native-community/blur';
import styles from './src/Styles';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <ApiDataProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused}) => {
              let iconName;
              let iconText;
              if (route.name === 'Home') {
                iconName = 'home';
                iconText = 'Home';
              } else if (route.name === 'Forecast') {
                iconName = 'weather-partly-cloudy';
                iconText = 'Forecast';
              } else if (route.name === 'Location') {
                iconName = 'location-city';
                iconText = 'Location';
              }
              const iconColor = focused ? '#C74B4C' : '#444444';
              return (
                <View>
                  {iconName.includes('weather') ? (
                    <View>
                      <WIcon
                        name={iconName}
                        style={[styles.iconstyle, {color: iconColor}]}
                      />
                      <Text style={[styles.icontextstyle, {color: iconColor}]}>
                        {iconText}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Icon
                        name={iconName}
                        style={[styles.iconstyle, {color: iconColor}]}
                      />
                      <Text style={[styles.icontextstyle, {color: iconColor}]}>
                        {iconText}
                      </Text>
                    </View>
                  )}
                </View>
              );
            },
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Forecast" component={Future} />
          <Tab.Screen name="Location" component={Location} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApiDataProvider>
  );
};

export default App;
