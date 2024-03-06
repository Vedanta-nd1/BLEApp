import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, NativeModules } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const {PermissionsModule} = NativeModules;

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const { t } = useTranslation();


  useEffect(() => {
    DeviceEventEmitter.addListener('BLEScanResult', handleScanResult);
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  const handleScanResult = (scanResult) => {
    setDevices(prevDevices => {
      const existingDeviceIndex = prevDevices.findIndex(device => device.address === scanResult.address);

      if (existingDeviceIndex !== -1) {
        // Update existing device
        const updatedDevices = [...prevDevices];
        updatedDevices[existingDeviceIndex] = scanResult;
        return updatedDevices;
      } else {
        // Add new device
        return [...prevDevices, scanResult];
      }
    });
  };

  const renderDeviceItem = ({ item }) => (
    <TouchableOpacity onPress={() => {connectAlert(item.name, item.address, t)}}>
      <View style={[styles.box, {flexDirection:'row', flex:1}]}> 
        <View style={styles.btIcon} >
          <FeatherIcon name="bluetooth" style={styles.btIcon} />
        </View>

      <View > 
        <Text style={styles.btName}> {item.name} </Text>
        <Text style={styles.btUUID}> {item.address} </Text>
        <Text style={styles.btStrength}> 
          <MaterialCommunityIcon name="wifi-strength-2" size={20} color="black" /> {" "}
          {item.rssi}{" dbm"}  {"   "}
         <FontAwesome5Icon name="arrows-alt-h" size={20} color="black" /> {" "}
          {/* 430.0 ms  */}
         </Text>
      </View>
    </View>

      {/* Render other device information as needed */}
    </TouchableOpacity>
  );
  const sortedDevices = (devices.sort((a, b) => a.rssi - b.rssi)).slice(0, 10);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={sortedDevices}
        renderItem={renderDeviceItem}
        keyExtractor={(item, index) => item.address + index}
        windowSize={10}
    />
    </SafeAreaView>
  );
};

export default DeviceList;

const connectAlert = (name, address, t) => {
  Alert.alert(
    t("deviceList.connect") + " " + name + "?",
    t("deviceList.connectMessage") + "? \n" + address,
    [
      {
        text: t("deviceList.cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: t("deviceList.connect"), onPress: () => {
        {PermissionsModule.connectToDevice(address)} 
        console.log("Connect Pressed for " + name + " at " + address);
      }
    }
    ],
    { cancelable: true }
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width:2, height:4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: 5,
    elevation: 10, // for shadow in Android
    margin: 5,
    marginHorizontal: 8,
    },

  btIcon: {
    fontSize:30,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#224d52',
    color: 'white',
    height: 50,
    borderRadius:25,
    margin:5,
    paddingVertical:7,
  },

  btName: {
    color: 'black',
    fontWeight: 'bold', 
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
    }

});
