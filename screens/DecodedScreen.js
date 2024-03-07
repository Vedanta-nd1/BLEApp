// import * as React from 'react';
import { Text, View } from 'react-native';
// import { useTranslation } from 'react-i18next';
import DeviceList from '../components/DeviceList.js';

function DecodedScreen({isScanning}) {
    return (
      <View style={{ flex: 1, flexDirection: 'column'}}>

      {isScanning? <DeviceList screen={'decoded'}/> : null}
        
      </View>
    );
  }

  export default DecodedScreen;