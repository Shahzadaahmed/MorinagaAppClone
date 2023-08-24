import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import HeaderDashboard from '../../components/HeaderDashboard';
import { screenWidth } from '../../constants/screenResolution';
import { CheckedRedSvg, UncheckedBlackSvg, FemaleCheck } from '../../asset/svg';
import { colors, fonts } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import { Block, Button, InputField, Edit, DatePicker } from '../../components';
import { LoadingContext } from '../../context';
import { ProfileService } from '../../services';

const PromotorEditProfile = ({ navigation, route }) => {
  const { setLoading } = LoadingContext.useLoading();
  const { item } = route?.params || {};
  const [kidData, setKidData] = useState({
    kidId: item?._id,
    user_img: '',
    name: '' || item?.name,
    father_name: '',
    area: '' || item?.area,
    dob: new Date() || item?.dob,
    city: '' || item?.city,
    mobile_no: '' || item?.mobile_no,
    gender: '' || item?.gender,
  });

  const onUpdate = () => {
    setLoading(true);
    ProfileService.updateProfileKid(kidData)
      .then(() => navigation.navigate('PromotorsUsersKidsProfileList'))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleChange = (name, value) => {
    setKidData({
      ...kidData,
      [name]: value,
    });
  };

  return (
    <Block>
      <HeaderDashboard
        text={'Edit Kids Profile'}
        style={{ marginRight: 50 }}
        style1={{ marginTop: 30 }}
        showIcon={true}
        text1={'Fill the Nutrition gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello, Sander👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <Edit text={'Add Profile'} />
        <View style={styles.borderLine}></View>
        <InputField
          placeholder={'John'}
          value={'Full Name'}
          style={styles.inputField}
          inputValue={kidData?.name}
          setInputValue={text => handleChange('name', text)}
        />

        <InputField
          placeholder={'Gulshan e Iqbal'}
          value={'Area'}
          style={styles.inputField}
          inputValue={kidData?.area}
          setInputValue={text => handleChange('area', text)}
        />

        <DatePicker
          dob={kidData?.dob}
          onSetDate={e => handleChange('dob', e)}
          style={styles.inputField}
        />

        <InputField
          placeholder={'Karachi'}
          value={'City'}
          style={styles.inputField}
          inputValue={kidData?.city}
          setInputValue={text => handleChange('city', text)}
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
                kidData.gender === 'male' ? styles.boxSelected : null,
              ]}>
              {kidData.gender === 'male' ? (
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
                kidData.gender === 'female' ? styles.boxSelected : null,
              ]}>
              {kidData.gender === 'female' ? (
                <FemaleCheck />
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
            onPress={onUpdate}
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
export default PromotorEditProfile;
