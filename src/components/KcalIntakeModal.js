import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors, fonts } from '../constants';
import { Cross } from '../asset/svg';

const { width, height } = Dimensions.get('window');

const KcalIntakeModal = ({ isVisible, onRequestClose, items }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.transparent} />

        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={onRequestClose}>
            <View style={styles.transparent} />
          </TouchableWithoutFeedback>

          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.modalHeading}>Kcal Intake Items</Text>
              <TouchableOpacity onPress={onRequestClose} style={styles.cross}>
                <Cross />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {items?.map((item, index) => (
                <View style={styles.itemCard} key={index}>
                  <View style={{ flexShrink: 1, marginRight: 10 }}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item?.name}
                    </Text>
                    <Text style={styles.details} numberOfLines={2}>
                      {`${item?.quantity} ${item?.quantity_unit} ${item?.name} has ${item?.calories} Kcal`}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.qty}>{item?.count || 0}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default KcalIntakeModal;

const styles = StyleSheet.create({
  transparent: {
    width,
    height,
    backgroundColor: colors.black,
    opacity: 0.5,
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 20,
    width: width - 40,
    maxHeight: height * 0.8,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    backgroundColor: colors.danger,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  modalHeading: {
    ...fonts.modalHeading,
    color: colors.white,
    textAlign: 'center',
  },
  itemCard: {
    marginBottom: 15,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: colors.grey2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  name: {
    ...fonts.modalItemName,
    color: colors.black2,
  },
  details: {
    ...fonts.modalItemDesc,
    color: colors.black2,
  },
  qty: {
    ...fonts.modalItemQty,
    color: colors.black2,
  },
  cross: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
