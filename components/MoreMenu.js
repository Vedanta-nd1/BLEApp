import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import * as RootNavigation from '../RootNavigation.js';
import { useTranslation } from 'react-i18next';
import i18n from '../localization/i18n.js';

const { t } = useTranslation();

const MoreMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} >
        <EntypoIcons name="dots-three-vertical" size={20} style={styles.moreText} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={toggleModal}>
          <View style={styles.modalContent}>
            {/* <TouchableOpacity
              onPress={() => {i18n.changeLanguage('en'); toggleModal();} }
              >
              <Text style={styles.modalText} >{t("changeLanguage")}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => {
              toggleModal();
              RootNavigation.navigate('Settings');
            }}>
              <Text style={styles.modalText} >{t("settings")}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Text style={styles.modalText} >Option 3</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9999, // Ensure it's above other components
  },
  moreText: {
    color: 'black',
    fontSize: 16,
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
    marginTop: 30,
    marginRight: 15,
    backgroundColor: 'white',
    alignContent: 'left',
    justifyContent: 'top',
    padding: 10,
    paddingRight: 20,
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    zIndex: 99999, // Ensure it's above other components
  },
});

export default MoreMenu;