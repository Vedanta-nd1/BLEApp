import * as React from 'react';
import { Text, View, Switch } from 'react-native';

function SettingsScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', padding: 5}}> English </Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
          <Text style={{color: 'black', padding: 5}}> Hindi </Text>
        </View>
        <Text style={{fontSize:20, color: '#224d52'}}>not yet functional </Text>
      </View>
        );
  }

  export default SettingsScreen;