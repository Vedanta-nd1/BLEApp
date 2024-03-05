import { changeLanguage } from 'i18next';
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import i18n from '../localization/i18n.js';

// const changeLanguage = (locale) => {
//   i18n.locale = locale;
// };

function SettingsScreen() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {changeLanguage('en');} }>
            <Text style={{color: 'black', padding: 5}}> {t("changeLangToEnglish")} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {changeLanguage('hi');} }>
            <Text style={{color: 'black', padding: 5}}> {t("changeLangToHindi")} </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:20, color: '#224d52'}}> not yet functional </Text>
      </View>
        );
  }

  export default SettingsScreen;