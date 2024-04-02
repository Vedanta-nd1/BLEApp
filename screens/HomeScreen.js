import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import DeviceList from '../components/DeviceList.js';

function HomeScreen({setIsScanning}) {
    return (
      <View style={{ flex: 1 }}>

      <DeviceList style={{flex: 1}} screen='home' setIsScanning={setIsScanning} />
        
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
    searchInput: {
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 10,
      paddingHorizontal: 10,
      borderRadius: 15,
      color: '#224d52',
      backgroundColor: '#eee',
    },
  });

  export default HomeScreen;