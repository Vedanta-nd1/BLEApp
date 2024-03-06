// import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

function RawScreen() {
  const { t } = useTranslation();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> {t('screens.rawScreen.title')} </Text>
      </View>
    );
  }

  export default RawScreen;