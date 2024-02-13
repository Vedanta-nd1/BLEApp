import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import RawScreen from './screens/RawScreen';
import DecodedScreen from './screens/DecodedScreen';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          
          tabBarActiveTintColor: '#224d52',
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => Alert.alert('Scanning..')}
                style={styles.headerTheme}
              >
                <Text style={{color:'black'}} >Scan</Text>
              </ TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert('More Options!')}
                style={[styles.headerTheme]}
              >
                <Text style={{color:'black'}}>...</Text>
              </ TouchableOpacity>
            </View>
          )
        }}
      >

        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarIcon: ({color}) => <EntypoIcon name="home" size={24} color={color} />, 
        }} />
        <Tab.Screen name="RawScreen" component={RawScreen}  
        options={{
          tabBarIcon: ({color}) => <EntypoIcon name="document-landscape" size={24} color={color} />, 
        }}/>
        <Tab.Screen name="DecodedScreen" component={DecodedScreen} 
        options={{
          tabBarIcon: ({color}) => <MaterialIcon name="qr-code-scanner" size={24} color={color} />, 
        
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
  }
});