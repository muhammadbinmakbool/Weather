import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

const Firebase = () => {
  const [fireBaseData, setFireBaseData] = useState('');

  const getData = async () => {
    const data = await firestore().Collection('Users').doc('Name').get();
    setFireBaseData(data.data());
  };
  return (
    <View>
      <Text>{fireBaseData}</Text>
    </View>
  );
};

export default Firebase;

const styles = StyleSheet.create({});
