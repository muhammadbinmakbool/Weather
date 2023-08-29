import {View, Text} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';

const ApiDataContext = createContext();

export const ApiDataProvider = ({children}) => {
  const [city, setCity] = useState('Rahimyar Khan');
  const [wdata, setWdata] = useState(null);
  const [loading, setLoading] = useState(true);

  // Getting Data from API
  const fetchData = cityName => {
    try {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8856d7e188a8d48769ee6a15d564a1f8&units=metric`,
      )
        .then(res => res.json())
        .then(res => {
          setWdata(res);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // City Value Change Fetching
  useEffect(() => {
    fetchData(city);
  }, [city]);

  return (
    <ApiDataContext.Provider value={{wdata, setCity, loading}}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataContext;
