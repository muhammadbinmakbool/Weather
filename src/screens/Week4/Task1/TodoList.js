import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

const TodoList = ({route}) => {
  const updatedlist = route.params;
  const [todoTask, setTodoTask] = useState([
    'Morning Walk',
    'Evening Exercise',
  ]);
  return (
    <View style={{margin: 5, backgroundColor: '#EDEDED'}}>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../../../assets/images/Week4/StatusBar.png')} />
      </View>
      {/* Welcome Note */}

      <View style={{justifyContent: 'center'}}>
        <View>
          <Image
            source={require('../../../assets/images/Week4/handsome.png')}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
              //   marginVertical: 20,
            }}>
            Welcome Minhaj!
          </Text>
        </View>

        <View>
          <Image
            source={require('../../../assets/images/Week4/backview.png')}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
        </View>
        <View>
          <Text
            style={{
              //   marginVertical: 10,
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              //   textAlign: 'center',
            }}>
            Todo Tasks.
          </Text>
        </View>
      </View>

      <ScrollView
        style={{backgroundColor: 'white', borderRadius: 5, padding: 10}}>
        <Text style={{color: '#999999', fontWeight: 'bold'}}>Dairy Tasks.</Text>

        {todoTask.map((item, index) => {
          return (
            <View style={{paddingVertical: 10}}>
              <Text style={{fontWeight: 'bold', color: 'black', fontSize: 15}}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Text>TodoList</Text>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({});
