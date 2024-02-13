import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Box from '../components/Box.js';

function HomeScreen() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Filter")}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}> Y </Text>
          <Text style={{fontSize:17, color: 'white'}}> Filter </Text>
        </View>
      </TouchableOpacity>
        <View style={styles.box} ><Box /></View>
        <View style={styles.box}><Box /></View>
        <View style={styles.box}><Box /></View>
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    box: {
      height: 110,
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