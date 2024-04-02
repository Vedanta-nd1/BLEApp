import * as React from 'react';
import { StyleSheet, Text, View, Platform , TouchableOpacity, NativeModules } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import RawScreen from './screens/RawScreen';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MoreMenu from './components/MoreMenu';
import SettingsScreen from './screens/SettingsScreen';
import {navigationRef} from './RootNavigation';
import { testProps } from './components/testProps';
const Tab = createBottomTabNavigator();

import './localization/i18n';
import { useTranslation } from 'react-i18next';

const {PermissionsModule} = NativeModules;
const { BluetoothManager } = NativeModules;


export default function App() {
  const [isScanning, setIsScanning] = React.useState(false);
    const { t } = useTranslation();

  return (

    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#224d52',
          headerTitleAlign: 'left',
          headerTintColor: '#224d52',
          headerRight: () => (
            <View style={{ flexDirection: 'row'}}>
              <View>
                <TouchableOpacity
                  {...testProps('scanButton')}
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
              
              <View accessible={false} style={{padding:10, justifyContent: 'center'}}>
                <MoreMenu />
              </View>
            </View>
          )
        }}
      >

      <Tab.Screen name="Home" 
        {...testProps('homeTab')}
        options={{
          title: t("screens.home.title"),
          tabBarTestID: 'homeTab',
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <EntypoIcon name="home" size={24} color={color} />}} 
        >
        {props => <HomeScreen {...props} setIsScanning={setIsScanning}/>} 
        </Tab.Screen>

        <Tab.Screen name="Raw" 
        {...testProps('rawTab')}
        options={{
          title: t("screens.raw.title"),
          tabBarTestID: 'rawTab',
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <EntypoIcon name="document-landscape" size={24} color={color} />, 
        }}>
          {props => <RawScreen {...props} setIsScanning={setIsScanning} />} 
        </Tab.Screen>

        <Tab.Screen name="Settings" 
        {...testProps('settingsTab')}
        options={{
          title: t("screens.settings.title"),
          tabBarTestID: 'settingsTab',
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <MaterialIcon name="settings" size={24} color={color} />,
        }} >
          {props => <SettingsScreen {...props} isScanning={isScanning} />}
        </Tab.Screen>

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
  },
  safeContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#224d52',
    padding: 10,
  }
});