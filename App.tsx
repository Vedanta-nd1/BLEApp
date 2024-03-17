import * as React from 'react';
import { StyleSheet, Text, View, Platform , TouchableOpacity, NativeModules } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import RawScreen from './screens/RawScreen';
import DecodedScreen from './screens/DecodedScreen';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MoreMenu from './components/MoreMenu';
import SettingsScreen from './screens/SettingsScreen';
import {navigationRef} from './RootNavigation';

const Tab = createBottomTabNavigator();

import './localization/i18n';
import { useTranslation } from 'react-i18next';

const {PermissionsModule} = NativeModules;
const { BluetoothManager } = NativeModules;

// DeviceEventEmitter.addListener('BLEScanResult', (scanResult) => {
//   console.log('Received scan result:', scanResult);
//   // Access parameters: scanResult.name, scanResult.address, scanResult.rssi
// });
// DeviceEventEmitter.addListener('TestEvent', (data) => {
//   console.log('Received:');
//   console.log(data); // This will log the data received from native side
// });

export default function App() {
  const [isScanning, setIsScanning] = React.useState(false);
    const { t } = useTranslation();

//   React.useEffect(() => {
//     const eventEmitter = new NativeEventEmitter(BluetoothManager);
//     const subscription = eventEmitter.addListener('StrongestPeripheralsReceived', (data) => {
//         console.log('Received strongest peripherals:');
//         console.log(data); // This will log the data received from native side
//     });

//     return () => {
//         subscription.remove();
//     };
// }, []);


  return (
    
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee'}}>
    // {/* <Button title='Get data' onPress={() => sendMessageToNative()} /> */}
    // <TouchableOpacity
    //   onPress={
    //     isScanning? ()  => {BluetoothManager.stopScanning(); setIsScanning(false)} : 
    //                 () =>  {BluetoothManager.startScanning(); setIsScanning(true)}
    //   }
    //   style={[styles.headerTheme, {backgroundColor: isScanning? 'pink': 'lightgreen'}]}
    // > 
    // <Text style={{color: '#224d52'}}>{isScanning? "Stop": "Scan"}</Text>
    // </ TouchableOpacity>
    //   <Text>iOS App</Text>
    // </View>
    
    <View style={styles.safeContainer}>
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#224d52',
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ flexDirection: 'row'}}>
              <View style={{}} >
                <TouchableOpacity
                  onPress={
                    Platform.OS === 'ios'? 
                    isScanning? ()  => {BluetoothManager.stopScanning(); setIsScanning(false)} : 
                                () =>  {BluetoothManager.startScanning(); setIsScanning(true)} :
                    isScanning? ()  => {PermissionsModule.stopScanning(); setIsScanning(false)} : 
                                () =>  {PermissionsModule.startScanning(); setIsScanning(true)}
                  }
                  style={styles.headerTheme}
                > 
                  {isScanning? <MaterialIcon name='square' size={16} color={'black'} style={{marginRight:8}}/> :
                              <Text style={{color: '#224d52'}}>{t("screens.home.scan")}</Text>}
                </ TouchableOpacity>
              </View>
              
              <View style={{padding:10, justifyContent: 'center'}} >
                <MoreMenu />
              </View>
            </View>
          )
        }}
      >

        <Tab.Screen name="Home" 
          options={{
            title: t("screens.home.title"),
            tabBarItemStyle: styles.barItem,
            tabBarIcon: ({color}) => <EntypoIcon name="home" size={24} color={color} />}} 
          >
          {props => <HomeScreen {...props} isScanning={isScanning} />} 
          </Tab.Screen>

        <Tab.Screen name="Raw" 
        options={{
          title: t("screens.rawScreen.title"),
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <EntypoIcon name="document-landscape" size={24} color={color} />, 
        }}>
          {props => <RawScreen {...props} isScanning={isScanning} />} 
        </Tab.Screen>

        <Tab.Screen name="Decoded" 
        options={{
          title: t("screens.decodedScreen.title"),
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <MaterialIcon name="qr-code-scanner" size={24} color={color} />, 
        }} >
          {props => <DecodedScreen {...props} isScanning={isScanning} />}
        </Tab.Screen>

        <Tab.Screen name="Settings" 
        options={{
          title: t("screens.settings.title"),
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <MaterialIcon name="settings" size={24} color={color} />,
        }} >
          {props => <SettingsScreen {...props} isScanning={isScanning} />}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
  headerTheme: {
    color: '#05f',
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 10, 
    margin: 5, 
    borderRadius: 15, 
  },
  barItem: {
    padding: 4,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});