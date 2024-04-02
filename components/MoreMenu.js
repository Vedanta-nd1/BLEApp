import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import * as RootNavigation from '../RootNavigation.js';
import { useTranslation } from 'react-i18next';
import { testProps } from './testProps.js';


const MoreMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container} accesssible={false}>
      <TouchableOpacity onPress={toggleModal} >
        {/* <View > */}
          <EntypoIcons {...testProps('moreMenu')} name="dots-three-vertical" size={20} style={styles.moreText} />
        {/* </View> */}
      </TouchableOpacity>
      <Modal
        accessible={false}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={toggleModal}>
          <View style={styles.modalContent} {...testProps('modalBackground')}>
            <TouchableOpacity onPress={() => {
              toggleModal();
              RootNavigation.navigate('Settings');
              }} 
              accessible={false}>
              <Text {...testProps('modalSettingsButton')} style={styles.modalText}>{t("screens.moreMenu.settings")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999, // Ensure it's above other components
    flex: 1,
  },
  moreText: {
    color: 'black',
    fontSize: 16,
    padding: 5,
  },

  modalText: {
    fontSize: 16,
    padding: 10,
    color: '#555',
  },

  modalContainer: {
    position: 'relative',
    flex: 1, 
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

  modalContent: {
    marginTop: Platform.OS === 'ios' ? 70 : 30,
    marginRight: 15,
    backgroundColor: 'white',
    padding: 10,
    paddingRight: 20,
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    zIndex: 999, // Ensure it's above other components
  },
});

export default MoreMenu;