import { changeLanguage } from 'i18next';
import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import KeepAwake from 'react-native-keep-awake';


function SettingsScreen({isScanning}) {
  const { t } = useTranslation();
  const [keepAwake, setKeepAwake] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(t("language"));

  const toggleSwitch = () => {
    setKeepAwake(previousState => !previousState);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if(language === 'English') 
      changeLanguage('en');
    else if (language === 'हिन्दी')
      changeLanguage('hi');
  }

    return (
      <View style={{ flex: 1 }}>
      {isScanning && keepAwake? <KeepAwake /> : null} 
        <View style={{padding: 10}}>
          <Text style={styles.settingHeader}> {t("screens.settings.chooseLanguage")}:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'left'}}>
          <TouchableOpacity onPress={() => {handleLanguageChange('English')} }>
            <Text style={[styles.button, selectedLanguage === 'English' && styles.selectedButton]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {handleLanguageChange('हिन्दी');} }>
            <Text style={[styles.button, selectedLanguage === 'हिन्दी' && styles.selectedButton]}>हिन्दी</Text>
          </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.settingContainer}>
        <View>
          <Text style={styles.settingHeader}>{t("screens.settings.keepScreenOnHeader")}</Text>
          <Text style={styles.settingDesc}>{t("screens.settings.keepScreenOnDesc")}</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#94c3c8" }}
          thumbColor={keepAwake ? "#335e63" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={keepAwake}
        />
      </View>
      </View>

      
        );
  }

  export default SettingsScreen;
 
  const styles = StyleSheet.create({ 
    button: {
      fontSize: 18,
      padding: 13,
      margin: 5,
      borderBottomWidth: 0,
      color: '#224d52',
      borderRadius: 15,
      backgroundColor: 'lightgray',
      textAlign: 'center',
      marginHorizontal: 10,
    },
    selectedButton: {
      backgroundColor: '#224d52',
      color: 'lightgray',
    },
    settingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 10,
    },
    settingHeader: {
      fontSize: 20,
      color: 'black'
    },
    settingDesc: {
      fontSize: 18,
      color: 'gray'
    } 
  });  