import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { colors, fonts } from '../constants';
import { Calendar } from '../asset/svg';
import moment from 'moment';

const { width } = Dimensions.get('window');

const DatePicker = ({ dob, onSetDate, style }) => {
  const [showDatePicker, setShowDatePicker] = useState();

  var today = new Date();
  const handleConfirm = date => {
    onSetDate(date);
    setShowDatePicker(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.calender, style]}
        onPress={() => setShowDatePicker(true)}>
        <View>
          <Text style={styles.label}>Date of birth</Text>
          {dob ? (
            <Text style={styles.text}>{moment(dob).format('DD/MM/yy')}</Text>
          ) : (
            <Text style={styles.emptyText}>DD/MM/YYYY</Text>
          )}
        </View>
        <View style={styles.icon}>
          <Calendar />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={dob || new Date()}
        onConfirm={handleConfirm}
        maximumDate={
          new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        }
        minimumDate={
          new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        }
        onCancel={() => setShowDatePicker(false)}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  calender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 100,
    alignSelf: 'center',
    height: 53,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    paddingHorizontal: 12,
  },
  label: {
    ...fonts.inputHead,
    color: colors.grey3,
    letterSpacing: 0,
    top: 0,
    // paddingTop: 6,
    lineHeight: 20,
  },
  text: {
    ...fonts.inputHead,
    fontSize: 14,
    color: colors.black,
    letterSpacing: 0,
    paddingLeft: 5,
    lineHeight: 16,
  },
  emptyText: {
    ...fonts.inputHead,
    fontSize: 14,
    color: colors.attendance,
    letterSpacing: 0,
    paddingLeft: 5,
    lineHeight: 16,
  },
});
