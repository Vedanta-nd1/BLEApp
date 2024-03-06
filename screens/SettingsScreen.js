import { changeLanguage } from 'i18next';
import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// const changeLanguage = (locale) => {
//   i18n.locale = locale;
// };

function SettingsScreen() {
  const { t } = useTranslation();
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text style={{padding: 10, fontSize: 20, color: '#224d52'}}> {t("screens.settings.currentLanguage")}:      {t("language")} </Text>
          <TouchableOpacity onPress={() => {changeLanguage('en');} }>
            <Text style={styles.settingItem}> Change Language to English </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {changeLanguage('hi');} }>
            <Text style={styles.settingItem}> भाषा को हिन्दी में बदलें </Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={{fontSize:20, color: '#224d52'}}> {t("screens.settings.notYetFunctional")} </Text> */}
      </View>
        );
  }

  export default SettingsScreen;

  const styles = StyleSheet.create({ 
    settingItem: {
      fontSize: 18,
      padding: 13,
      margin: 5,
      borderBottomWidth: 0,
      borderBottomColor: 'lightgray',
      color: '#eee',
      borderRadius: 15,
      backgroundColor: '#335e63',
      width: '75%',
    }
  });