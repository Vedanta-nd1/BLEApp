import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, NativeModules, Button } from 'react-native';
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
const myRef = React.createRef();
const {PermissionsModule} = NativeModules;

export default function App() {

  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    //    <Button onPress={() => PermissionsModule.callMethodInMainActivity()} title='Scan BLE' />
    //    <Text>App is able to ask for permissions now.</Text>
    // </View>
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
                  onPress={() => { Alert.alert('Scanning....')}}
                  style={styles.headerTheme}
                >
                  <Text style={{color:'black' }} >Scan</Text>
                </ TouchableOpacity>
              </View>
              
              <View style={{padding:10, justifyContent: 'center'}} >
                <MoreMenu />
              </View>
            </View>
          )
        }}
      >

        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarItemStyle: styles.barItem,
          tabBarIcon: ({color}) => <EntypoIcon name="home" size={24} color={color} />, 
        }} />
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