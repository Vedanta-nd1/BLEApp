// import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

function DecodedScreen() {
  const { t } = useTranslation();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: 'gray'}}>{t("screens.decodedScreen.title")}</Text>
      </View>
    );
  }

  export default DecodedScreen;