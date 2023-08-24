import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import InputField from './InputField';
import Button from './Button';
import { moderateScale } from 'react-native-size-matters';
import { screenWidth } from '../constants/screenResolution';
import { CheckedRedSvg, UncheckedBlackSvg } from '../asset/svg';
import DatePicker from './DatePicker';
import { colors, fonts } from '../constants';

const PromotorAddKidProfile = ({ setActiveStep, kidData, handleChange }) => {
  var pattern = new RegExp('^((0)(3))([0-9]{9})$');
  const saveProfile = () => {
    const { parentName, mobileNo, area, city, kidName, dob, gender } = kidData;
    if (
      !parentName ||
      !mobileNo ||
      !area ||
      !city ||
      !kidName ||
      !dob ||
      !gender
    ) {
      return Alert.alert('Fields Required', 'Please fill all the fields.');
    } else if (mobileNo.length != 11) {
      return Alert.alert('Mobile number needs to be of length 11.');
    } else if (!pattern.test(mobileNo)) {
      return Alert.alert('Mobile number needs to be of Pakistan format.');
    }
    // else
    // if (getAge(dob) < 2 || getAge(dob) > 18) {
    //   return Alert.alert('Age needs to be from 2 to 18.');
    // }
    setActiveStep(prev => prev + 1);
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <View style={[styles.container, {}]}>
      <InputField
        placeholder={'Andrew'}
        value={'Father/Mother Name'}
        style={styles.inputField}
        inputValue={kidData?.parentName}
        setInputValue={e => handleChange('parentName', e)}
      />

      <InputField
        placeholder={'03001234567'}
        value="Mobile Number"
        style={styles.inputField}
        inputValue={kidData?.mobileNo}
        setInputValue={e => handleChange('mobileNo', e)}
        keyboardType={'phone-pad'}
        maxLength={11}
      />

      <InputField
        placeholder={'Gulshan e Iqbal'}
        value={'Area'}
        style={styles.inputField}
        inputValue={kidData?.area}
        setInputValue={e => handleChange('area', e)}
      />

      <InputField
        placeholder={'Karachi'}
        value={'City'}
        style={styles.inputField}
        inputValue={kidData?.city}
        setInputValue={e => handleChange('city', e)}
      />

      <InputField
        placeholder={'John'}
        value={'Kid Name'}
        style={styles.inputField}
        inputValue={kidData?.kidName}
        setInputValue={e => handleChange('kidName', e)}
      />

      <DatePicker
        dob={kidData?.dob}
        onSetDate={e => handleChange('dob', e)}
        style={styles.inputField}
      />

      <View style={styles.gender}>
        <Text style={styles.genderHeading}>Gender</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleChange('gender', 'male')}>
          <View
            style={[
              styles.box,
              kidData?.gender === 'male' ? styles.boxSelected : null,
            ]}>
            {kidData?.gender === 'male' ? (
              <CheckedRedSvg />
            ) : (
              <UncheckedBlackSvg />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.genderLabel}>Male</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleChange('gender', 'female')}>
          <View
            style={[kidData?.gender === 'female' ? styles.boxSelected : null]}>
            {kidData?.gender === 'female' ? (
              <CheckedRedSvg />
            ) : (
              <UncheckedBlackSvg />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.genderLabel}>Female</Text>
      </View>

      <View style={styles.btn}>
        <Button
          text={'Next'}
          btnWidth={screenWidth - 80}
          onPress={saveProfile}
        />
      </View>
    </View>
  );
};

export default PromotorAddKidProfile;

const styles = StyleSheet.create({
  gender: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenWidth - 90,
    marginTop: moderateScale(15),
    marginBottom: 18,
    alignSelf: 'center',
  },
  genderHeading: {
    ...fonts.inputHead,
    color: colors.black,
    fontSize: 14,
    alignSelf: 'center',
  },
  genderLabel: {
    ...fonts.inputHead,
    color: colors.black,
  },
  inputField: {
    width: screenWidth - 80,
    marginTop: moderateScale(15),
  },
  btn: {
    // marginVertical: moderateScale(29),
    alignSelf: 'center',
  },
});
