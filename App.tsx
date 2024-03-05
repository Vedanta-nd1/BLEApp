import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, NativeModules, Button, DeviceEventEmitter, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
// const myRef = React.createRef();

import './localization/i18n';
import { useTranslation } from 'react-i18next';

const {PermissionsModule} = NativeModules;
// import DeviceList from './components/DeviceList';   

DeviceEventEmitter.addListener('BLEScanResult', (scanResult) => {
  console.log('Received scan result:', scanResult);
  // Access parameters: scanResult.name, scanResult.address, scanResult.rssi
});

export default function App() {
  const [isScanning, setIsScanning] = React.useState(false);
  const { t } = useTranslation();
  
  return (
    // <SafeAreaView style={{flex: 1, alignItems: 'center' }}>
    //   <Button onPress={
    //       isScanning? ()  => {PermissionsModule.stopScanning(); setIsScanning(false)} : 
    //                   () =>  {PermissionsModule.startScanning(); setIsScanning(true)}
    //   } 
    //     title={isScanning? 'stop' : 'scan'}  />
    //   <Text>App is able to ask for permissions now.</Text>
    //   <View>{isScanning? <DeviceList /> : null}</View>
    // </SafeAreaView>
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
                    isScanning? ()  => {PermissionsModule.stopScanning(); setIsScanning(false)} : 
                                () =>  {PermissionsModule.startScanning(); setIsScanning(true)}
                  }
                  style={styles.headerTheme}
                >
                  {isScanning? <MaterialIcon name='square' size={16} color={'black'} style={{marginRight:8}}/> :
                              <Text style={{color: 'black'}}>{t("screens.home.scan")}</Text>}
                </ TouchableOpacity>
                {/* <Button onPress={
                      isScanning? ()  => {PermissionsModule.stopScanning(); setIsScanning(false)} : 
                                  () =>  {PermissionsModule.startScanning(); setIsScanning(true)}
                      } 
                    title={isScanning? 'stop' : 'scan'}
                    color ={'#fff'}  /> */}
              </View>
              
              <View style={{padding:10, justifyContent: 'center'}} >
                <MoreMenu />
              </View>
            </View>
          )
        }}
      >

        <Tab.Screen name="Home" 
          // component={HomeScreen} 
          options={{
            tabBarItemStyle: styles.barItem,
            tabBarIcon: ({color}) => <EntypoIcon name="home" size={24} color={color} />}} 
          >
          {props => <HomeScreen {...props} data={isScanning} setData={setIsScanning} />} 
          </Tab.Screen>
        <Tab.Screen name="Raw" component={RawScreen}  
        options={{
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <EntypoIcon name="document-landscape" size={24} color={color} />, 
        }}/>
        <Tab.Screen name="Decoded" component={DecodedScreen} 
        options={{
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <MaterialIcon name="qr-code-scanner" size={24} color={color} />, 
        }} />
        <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <MaterialIcon name="settings" size={24} color={color} />,
        }} />
      </Tab.Navigator>
    </NavigationContainer>
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
  }
});