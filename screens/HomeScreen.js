import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Button } from 'react-native';
import Box from '../components/Box.js';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import DeviceList from '../components/DeviceList.js';

function HomeScreen({navigation, data, setData}) {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Filter")}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',
            elevation: 5}}>
          {/* <Text style={{fontWeight: 'bold', color: 'white'}}> Y </Text> */}
          <IoniconsIcons name="funnel" size={17} color="white" />
          <Text style={{fontSize:17, color: 'white'}}> 
            {" "}Filter 
          </Text>
        </View>
      </TouchableOpacity>

      {/* <View style={styles.box} ><Box /></View>
      <View style={styles.box}><Box /></View>
      <View style={styles.box}><Box /></View> */}
      {data? <DeviceList /> : null}

      {/* <Button onPress={() => navigation.navigate('Settings')} title="Go to Settings" /> */}
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    box: {
      height: '19%',
      },

    button: {
      color: 'white',
      alignItems: 'center',
      backgroundColor: '#224d52',
      padding: 10,
      margin: 10,
      borderRadius: 10,
    },
  });

  export default HomeScreen;