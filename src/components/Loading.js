import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {colors} from '../constants';
import {LoadingContext} from '../context';

const {width, height} = Dimensions.get('window');

const Loading = () => {
  const {setLoading} = LoadingContext.useLoading();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={_ => setLoading(false)}>
      <View style={styles.centeredView}>
        <View style={styles.transparent} />
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={colors.danger} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  transparent: {
    width,
    height,
    backgroundColor: colors.black,
    opacity: 0.2,
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Loading;
