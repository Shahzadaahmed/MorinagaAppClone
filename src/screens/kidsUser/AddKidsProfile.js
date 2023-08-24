import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { CheckedRedSvg, UncheckedBlackSvg } from '../../asset/svg';
import {
  Block,
  Button,
  DatePicker,
  Edit,
  InputField,
  HeaderDashboard,
} from '../../components';
import { screenWidth } from '../../constants/screenResolution';
import { colors, fonts } from '../../constants';
import { AuthContext, LoadingContext } from '../../context';
import { KidsService } from '../../services';

const AddKidsProfile = ({ navigation }) => {
  // context
  const { user } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [kidData, setKidData] = useState({
    user_img: '',
    uid: user?.uid,
    name: '',
    father_name: '',
    area: '',
    dob: null,
    city: '',
    mobile_no: '',
    gender: '',
  });

  const handleChange = (name, value) => {
    setKidData({
      ...kidData,
      [name]: value,
    });
  };

  const addKidsProfile = () => {
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

    KidsService.addKidProfile(kidData)
      .then(() => {
        setKidData({
          user_img: '',
          uid: user?.uid,
          name: '',
          father_name: '',
          area: '',
          dob: new Date(),
          city: '',
          mobile_no: '',
          gender: '',
        });
        navigation.navigate('KidsProfileList');
      })
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <HeaderDashboard
        text={'Add Kids Profile'}
        style={{ marginRight: 50 }}
        style1={{ marginTop: 30 }}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello, Sander👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('Settings')}
      />
      <Block>
        <View style={styles.container}>
          <Edit
            text={'Add Profile'}
            selectedImage={kidData?.user_img}
            setSelectedImage={e => handleChange('user_img', e)}
          />
          <View style={styles.borderLine}></View>

          <InputField
            inputValue={kidData?.name}
            setInputValue={e => handleChange('name', e)}
            placeholder={'John Kelly'}
            value={'Full Name'}
            style={styles.inputField}
          />

          <InputField
            inputValue={kidData?.area}
            setInputValue={e => handleChange('area', e)}
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
            inputValue={kidData?.city}
            setInputValue={e => handleChange('city', e)}
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
            <Text style={{ ...fonts.inputHead, color: colors.black }}>
              Male
            </Text>
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
              text={'Add Kid’s Profile'}
              btnWidth={screenWidth - 80}
              onPress={addKidsProfile}
            />
          </View>
        </View>
      </Block>
    </>
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
export default AddKidsProfile;
