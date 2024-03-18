// import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
import DeviceList from '../components/DeviceList.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const item = {"address": "05:2F:89:2D:08:27", "name": "Unnamed", "rawData": "0x1E        0xFF    0x06    0x00   0x01     0x09    0x20    0x22    0xAF    0x96    0x8A    0x47    0x84    0x33    0x1E    0x4C    0x33    0x02    0x3A    0x3E   0x7D     0x85    0x3D    0x0B    0x7D    0x0E    0x28    0xD7    0x5E    0xE8    0xA3    ", "rssi": -91}

function RawScreen({setIsScanning}) {
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'column'}}>

      <DeviceList screen='raw' setIsScanning={setIsScanning}/>
         
      </SafeAreaView>
    );
  }

  export default RawScreen;
 
  const styles = StyleSheet.create({
    box: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      padding: 5,
      elevation: 10, // for shadow in Android
      margin: 5,
      marginHorizontal: 8,
      borderWidth: 1,
    },

    boxRaw: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      padding: 7,
      elevation: 10, // for shadow in Android
      margin: 5,
      marginHorizontal: 8,
      borderWidth: 1,
    },

    btIcon: {
      fontSize: 30,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: '#224d52',
      color: 'white',
      height: 50,
      borderRadius: 25,
      margin: 5,
      paddingVertical: 7,
    },
  
    btName: {
      color: 'black',
      padding: 3,
      fontSize: 17,
    },
  
    btUUID: {
      fontSize: 15,
      color: '#888',
    },
  
    btStrength: {
      fontSize: 15,
      color: 'black',
      margin: 5,
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

    btRawData: {
      color: '#666',
      padding: 5,
      fontSize: 15,
    },
  });