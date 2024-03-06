import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert,  } from 'react-native';
// import Box from '../components/Box.js';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import DeviceList from '../components/DeviceList.js';
import { useTranslation } from 'react-i18next';

function HomeScreen({navigation, data, setData}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert(t("screens.home.filter"))}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',
            elevation: 5}}>
          {/* <Text style={{fontWeight: 'bold', color: 'white'}}> Y </Text> */}
          <IoniconsIcons name="funnel" size={17} color="white" />
          <Text style={{fontSize:17, color: 'white'}}> 
            {" "} {t("screens.home.filter")} 
          </Text>
        </View>
      </TouchableOpacity>

      {/* <View style={styles.box} ><Box /></View>
      <View style={styles.box}><Box /></View>
      <View style={styles.box}><Box /></View> */}
      {data? <DeviceList /> : null}

      {/* <Button onPress={() => navigation.navigate('Settings')} title="Go to Settings" /> */}
        
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
  });

  export default HomeScreen;