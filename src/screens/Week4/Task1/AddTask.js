import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const AddTask = ({navigation}) => {
  const [todo, settodo] = useState('');
  const [todolist, settodolist] = useState(['Morning Walk']);

  const addtask = todo => {
    const newtask = todo;
    const updatedlist = [...todolist, newtask];
    settodolist(updatedlist);
    settodo('');
    navigation.navigate('TodoList', {updatedlist: updatedlist});
  };

  return (
    <View style={{margin: 5, backgroundColor: '#EDEDED'}}>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../../../assets/images/Week4/StatusBar.png')} />
      </View>
      {/* Welcome Note */}
      <View style={{justifyContent: 'center', marginVertical: 10}}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
              marginVertical: 20,
            }}>
            Welcome OnBoard!
          </Text>
        </View>

        <View>
          <Image
            source={require('../../../assets/images/Week4/Girlboy.png')}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
        </View>
        <View>
          <Text
            style={{
              marginVertical: 10,
              color: '#55847AF7',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Add What Your Want to do Later
          </Text>
        </View>
      </View>

      {/* Add Task */}
      <View>
        <TextInput
          placeholder="Add Task"
          style={styles.textinputfield}
          onChangeText={settodo}
        />
      </View>
      <TouchableOpacity
        onPress={() => addtask(todo)}
        style={{
          backgroundColor: '#55847A',
          justifyContent: 'center',
          width: 220,
          alignSelf: 'center',
          height: 45,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          Add to List
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  addtolistbutton: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  textinputfield: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    fontWeight: 'bold',
  },
});
