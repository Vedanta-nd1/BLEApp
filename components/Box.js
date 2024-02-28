import { Text, View, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default Box = () => {
  return (
    <View style={[styles.box, {flexDirection:'row', flex:1}]}> 
        <View style={styles.btIcon} >
          {/* <Text style={{color:'white', fontSize:25}}> B</Text> */}
          <FeatherIcon name="bluetooth" style={styles.btIcon} />
        </View>

      <View > 
        <Text style={styles.btName}> Realme 7 </Text>
        <Text style={styles.btUUID}> 12:4D:D5:1A:5E:6E </Text>
        <Text style={styles.btStrength}> 
          <MaterialCommunityIcon name="wifi-strength-2" size={20} color="black" /> {" "}
          -65 dbm    {" "}
         <FontAwesome5Icon name="arrows-alt-h" size={20} color="black" /> {" "}
         430.0 ms </Text>
      </View>
    </View>
  ) 
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width:2, height:4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: 10,
    elevation: 10, // for shadow in Android
    margin: 8,
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