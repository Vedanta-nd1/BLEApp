import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, NativeModules, TextInput, Platform } from 'react-native';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const { PermissionsModule } = NativeModules;  //  Android module
const { BluetoothManager } = NativeModules;  //  iOS module

const DeviceList = ({screen, setIsScanning}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setDevices([]);
    setIsRefreshing(false);
  }

  useEffect(() => {
    const eventEmitter = Platform.OS === 'ios' ? DeviceEventEmitter : new NativeEventEmitter(BluetoothManager);
    const eventName = Platform.OS === 'ios' ? 'BLEScanResultFromIOS' : 'BLEScanResult';
    
    const subscription = eventEmitter.addListener(eventName, handleScanResult);
    return () => {
      Platform.OS === 'ios' ? subscription.remove() : DeviceEventEmitter.removeAllListeners();
    };
  }, []);

//   useEffect(() => {
//     const eventEmitter = new NativeEventEmitter(BluetoothManager);
//     const subscription = eventEmitter.addListener('StrongestPeripheralsReceived', (data) => {
//         console.log('Received strongest peripherals:');
//         console.log(data); // This will log the data received from native side
//     });

//     return () => {
//         subscription.remove();
//     };
// }, []);

  const handleScanResult = (scanResult) => {
    console.log('Scan Result:', scanResult);
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

  const modifiedDevices = (devices.sort((a, b) => b.rssi - a.rssi).slice(0, 20));
  const filteredDevices = searchQuery
  ? modifiedDevices.filter(modifiedDevices =>
      modifiedDevices.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modifiedDevices.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : modifiedDevices;

  const renderDeviceItem = ({ item }) => (
    screen === 'home' ? 
      <TouchableOpacity onPress={() => { connectAlert(item.name, item.address, t, setIsScanning) }}>
      <View style={[styles.box, { flexDirection: 'row', flex: 1 }]}>
        <View style={[styles.btIcon, {backgroundColor: '#224d52'}]} >
          <FeatherIcon name="bluetooth" style={styles.btIcon} />
        </View>
        <View >
          <Text style={styles.btName}> {item.name}  </Text>
          <Text style={styles.btUUID}> {item.address} </Text>
          <Text style={styles.btStrength}>
            <MaterialCommunityIcon name="wifi-strength-2" size={20} color="black" /> {" "}
            {item.rssi}{" dbm    "}  
            {/* <FontAwesome5Icon name="arrows-alt-h" size={20} color="black" /> {" "} */}
            {/* 430.0 ms  */}
          </Text>
        </View>
      </View>
    </TouchableOpacity> :

  screen === 'raw' ?
  <TouchableOpacity onPress={() => { connectAlert(item.name, item.address, t) }}>
  <View style={[styles.boxRaw, { flexDirection: 'row' }]}>
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{color: '#666', marginRight: 'auto'}}>{"<-> "}N/A</Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: '#666'}}>{item.rssi} dB</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{color: '#666', marginRight: 'auto'}}>{item.name}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: '#666'}}>{item.address}</Text>
        </View>
      </View>
      <Text style={styles.btRawData}> 
        {item.rawData} 
      </Text>
    </View>
  </View>
</TouchableOpacity> : null
  );

  return (
    <SafeAreaView style={{ flex: 1,  marginTop: 0 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Filter by name or address"
          placeholderTextColor={'gray'}
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        /> 
      <FlatList
        data={filteredDevices}
        renderItem={renderDeviceItem}
        keyExtractor={(item, index) => item.address + index}
        windowSize={1}
        refreshing={isRefreshing}
        onRefresh={() => handleRefresh()}
      />
    </SafeAreaView>
  );
};

export default DeviceList;

const connectAlert = (name, address, t, setIsScanning) => {
  Alert.alert(
    t("deviceList.connect") + " " + name + "?",
    t("deviceList.connectMessage") + "? \n" + address,
    [
      {
        text: t("deviceList.connect"), onPress: () => {
          Platform.OS === 'ios' ? BluetoothManager.connectToDevice(address) :
                                  PermissionsModule.connectToDevice(address) 
          console.log("Connect Pressed for " + name + " at " + address);
          setIsScanning(false);
        }
      },
      Platform.OS === 'ios' ? {
        text: t("deviceList.cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      } : null
    ],
    { cancelable: true }
  );
};

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
    // backgroundColor: '#224d52',
    color: 'white',
    height: 50,
    borderRadius: 25,
    margin: 5,
    paddingVertical: 7,
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
  }
});