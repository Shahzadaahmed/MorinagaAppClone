import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import HeaderDashboard from '../../components/HeaderDashboard';
import { screenWidth } from '../../constants/screenResolution';
import { CheckedRedSvg, UncheckedBlackSvg } from '../../asset/svg';
import { colors, fonts } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import { Block, Button, InputField, Edit, DatePicker } from '../../components';
import { KidsService } from '../../services';
import { LoadingContext } from '../../context';

const EditKidsProfile = ({ navigation, route }) => {
  // context
  const { setLoading } = LoadingContext.useLoading();

  // params
  const { item } = route?.params || {};

  // states
  const [kidData, setKidData] = useState({
    kidId: item?.id,
    user_img: item?.user_img || '',
    name: item?.name || '',
    father_name: '',
    area: item?.area || '',
    dob: item?.dob?.toDate() || new Date(),
    city: item?.city || '',
    mobile_no: item?.mobile_no || '',
    gender: item?.gender || '',
  });

  const handleChange = (name, value) => {
    setKidData({
      ...kidData,
      [name]: value,
    });
  };

  const updateKidProfile = () => {
    if (
      !kidData?.name ||
      !kidData?.dob ||
      !kidData?.city ||
      !kidData?.area ||
      !kidData?.gender
    ) {
      return Alert.alert('Error', 'Please enter all fields');
    }

    setLoading(true);
    KidsService.updateKidProfile(kidData)
      .then(() => navigation.navigate('KidsProfileList'))
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  };

  // Change User Image
  const uploadImage = img => {
    setKidData({ ...kidData, user_img: img });

    KidsService.updateProfilePicture({
      prevImageUri: kidData?.user_img,
      uid: kidData?.kidId,
      url: img,
    })
      .then(res => console.log(res))
      .catch(err => console.log('upload error', err));
  };

  return (
    <Block>
      <HeaderDashboard
        text={'Edit Kids Profile'}
        style={{ marginRight: 50 }}
        style1={{ marginTop: 30 }}
        showIcon={true}
        personGender={item?.personGender}
        text1={'Fill the Nutrition Gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello 👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <Edit
          text={'Edit Profile'}
          selectedImage={kidData?.user_img}
          kidgender={kidData?.gender !== 'male'}
          setSelectedImage={e => uploadImage(e)}
        />
        <View style={styles.borderLine}></View>
        <InputField
          setInputValue={e => handleChange('name', e)}
          inputValue={kidData?.name}
          placeholder={'John Kelly'}
          value={'Full Name'}
          style={styles.inputField}
        />

        <InputField
          setInputValue={e => handleChange('area', e)}
          inputValue={kidData?.area}
          placeholder={'Gulshan e Iqbal'}
          value={'Area'}
          style={styles.inputField}
        />

        <DatePicker
          dob={kidData?.dob}
          onSetDate={e => handleChange('dob', e)}
          style={styles.inputField}
        />
        <InputField
          setInputValue={e => handleChange('city', e)}
          inputValue={kidData?.city}
          placeholder={'Karachi'}
          value={'City'}
          style={styles.inputField}
        />
        <View style={styles.gender}>
          <Text style={{ ...fonts.inputHead, color: colors.black }}>
            Gender
          </Text>
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
          <Text style={{ ...fonts.inputHead, color: colors.black }}>Male</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleChange('gender', 'female')}>
            <View
              style={[
                styles.box,
                kidData?.gender === 'female' ? styles.boxSelected : null,
              ]}>
              {kidData?.gender === 'female' ? (
                <CheckedRedSvg />
              ) : (
                <UncheckedBlackSvg />
              )}
            </View>
          </TouchableOpacity>
          <Text style={{ ...fonts.inputHead, color: colors.black }}>
            Female
          </Text>
        </View>
        <View style={{ marginVertical: moderateScale(50) }}>
          <Button
            text={'Edit  Kid’s Profile'}
            btnWidth={screenWidth - 80}
            onPress={() => updateKidProfile()}
          />
        </View>
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: colors.black,
  },
  borderLine: {
    borderWidth: 0.5,
    color: colors.border,
    width: screenWidth - 40,
    marginVertical: moderateScale(5),
    opacity: 0.2,
  },
  inputField: {
    width: screenWidth - 80,
    marginTop: moderateScale(10),
  },
  calender: {
    position: 'relative',

    width: screenWidth - 90,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gender: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenWidth - 90,
    marginTop: moderateScale(27),
    marginBottom: 18,
  },
  icon: {
    marginLeft: moderateScale(50),
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#49454F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxSelected: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  inputField1: {
    width: screenWidth - 80,
    alignSelf: 'center',
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
});
export default EditKidsProfile;
