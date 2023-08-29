// {/* <View style={{marginTop: deviceHeight * 0.1}}>
// {/* Wind */}
// <View
//   style={[
//     styles.detailCard,
//     {marginHorizontal: deviceWidth * 0.05},
//   ]}>
//   <View style={{flexDirection: 'row'}}>
//     <Image
//       source={require('./assets/images/wind.png')}
//       style={{alignSelf: 'center', width: 60, height: 60}}
//     />
//     <Text style={styles.detailtext}>Wind</Text>
//   </View>
//   <Text style={[styles.detailtext, {marginRight: 30}]}>
//     {data[0].wind}
//   </Text>
// </View>

// {/* RainFall */}
// <View
//   style={[
//     styles.detailCard,
//     {marginHorizontal: deviceWidth * 0.05},
//   ]}>
//   <View style={{flexDirection: 'row'}}>
//     <Image
//       source={require('./assets/images/rain.png')}
//       style={{alignSelf: 'center', width: 60, height: 60}}
//     />
//     <Text style={styles.detailtext}>RainFall</Text>
//   </View>
//   <Text style={[styles.detailtext, {marginRight: 30}]}>
//     {data[0].rainfall}
//   </Text>
// </View>

// {/* Humidity */}
// <View
//   style={[
//     styles.detailCard,
//     {marginHorizontal: deviceWidth * 0.05},
//   ]}>
//   <View style={{flexDirection: 'row'}}>
//     <Image
//       source={require('./assets/images/humidity.png')}
//       style={{alignSelf: 'center', width: 60, height: 60}}
//     />
//     <Text style={styles.detailtext}>Humidity</Text>
//   </View>
//   <Text style={[styles.detailtext, {marginRight: 30}]}>
//     {data[0].humidity}
//   </Text>
// </View>
// </View> */}

// FireBase====================
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
const App = () => {
  useEffect(() => {
    getData();
  }, []);
  const [data, setData] = useState('');
  const [value, setValue] = useState('');
  const getData = async () => {
    const users = await firestore().collection('Users').doc('First').get();
    setData(users.data());
  };

  const postData = () => {
    firestore()
      .collection('Users')
      .doc('Second')
      .delete()
      .then(console.log('Deleted Uploaded'));
  };
  return (
    <View>
      <Text>{data.age}</Text>
      <TextInput
        value={value}
        onChangeText={value => {
          setValue(value);
        }}
      />
      <Button title="Add Data" onPress={postData} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
