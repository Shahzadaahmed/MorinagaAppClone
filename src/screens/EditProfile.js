import { StyleSheet, View, Text, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  Block,
  Header,
  Edit,
  InputField,
  Button,
  DatePicker,
} from '../components';
import { colors, fonts } from '../constants';
import { IllustrationCross } from '../asset/svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Illustration } from '../asset/svg';
import { screenHeight } from '../constants/screenResolution';
import { AuthContext, LoadingContext } from '../context';
import { Auth } from '../services';

export default function EditProfile({ navigation }) {
  const bottomSheetRef = useRef();
  const secondBottomSheetRef = useRef();

  // context
  const { user, setUser } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  const [userData, setUserData] = useState({
    email: user?.email || '',
    full_name: user?.full_name || '',
    phone_no: user?.phone_no || '',
    dob: user?.dob?.toDate() || new Date(),
  });
  const [userImg, setUserImg] = useState(user?.user_profile);
  const [isError, setIsError] = useState(false);

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onUpdateProfile = () => {
    const isValidPhoneNumber = /^\d{11}$/.test(userData?.phone_no);
    if (!isValidPhoneNumber) {
      return Alert.alert('Error', 'Please input the correct phone no');
    }

    setLoading(true);
    Auth.updateProfile({ id: user?.uid, user: userData })
      .then(() => {
        getUserDetails(user?.uid);
        bottomSheetRef?.current?.open();
      })
      .catch(() => secondBottomSheetRef?.current?.open())
      .finally(() => setLoading(false));
  };

  const getUserDetails = uid => {
    Auth.getUserById(uid)
      .then(userDetails => setUser(userDetails))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  // Change User Image
  const uploadImage = img => {
    setUserImg(img);
    Auth.updateProfilePicture({
      prevImageUri: user?.user_profile,
      uid: user?.uid,
      url: img,
    })
      .then(res => getUserDetails(user?.uid))
      .catch(err => console.log(err));
  };

  return (
    <Block>
      <View style={styles.header}>
        <Header showArrow={true} onPress={() => navigation.goBack()} />
      </View>

      <Edit
        text={user?.full_name}
        selectedImage={userImg}
        kidgender={true}
        setSelectedImage={e => uploadImage(e)}
      />

      <View style={styles.inputField}>
        <InputField
          placeholder="email@domain.com"
          value={'Email'}
          keyboardType={'email-address'}
          inputValue={userData?.email}
          editable={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputField}>
        <InputField
          placeholder="John Kelly"
          value={'Full Name'}
          inputValue={userData?.full_name}
          setInputValue={e => handleChange('full_name', e)}
        />
      </View>

      <View style={styles.inputField}>
        <InputField
          placeholder="03001234567"
          value={'Phone'}
          inputValue={userData?.phone_no}
          setInputValue={e => handleChange('phone_no', e)}
        />
      </View>
      <DatePicker dob={userData?.dob} onSetDate={e => handleChange('dob', e)} />

      <View style={styles.button}>
        <Button text={'Update Profile'} onPress={onUpdateProfile} />
      </View>

      {/* success update profile bottom sheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={screenHeight * 0.56}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: styles.bottomSheetContainer,
          draggableIcon: { display: 'none' },
          wrapper: {
            backgroundColor: 'non-transparent',
          },
        }}>
        <View style={styles.container}>
          <Illustration />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...fonts.accCreatedTitle,
              color: colors.rhinoDark,
              marginBottom: 12,
            }}>
            Profile Updated!
          </Text>
          <Text
            style={{
              ...fonts.accCreatedSubTitle,
              color: colors.rhinoDark2,
              textAlign: 'center',
              marginBottom: 6,
            }}>
            Your profile has been successfully updated,
          </Text>
          <Text
            style={{
              ...fonts.accCreatedSubTitle,
              color: colors.rhinoDark2,
              textAlign: 'center',
              marginBottom: 6,
            }}>
            changes are reflected real time.
          </Text>
        </View>
        <View style={styles.button1}>
          <Button
            text={'Confirm'}
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
      </RBSheet>

      {/* failed bottom sheet */}
      <RBSheet
        ref={secondBottomSheetRef}
        height={screenHeight * 0.62}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: styles.bottomSheetContainer,
          draggableIcon: { display: 'none' },
          wrapper: { backgroundColor: 'transparent' },
        }}>
        <View style={styles.container2}>
          <IllustrationCross />
        </View>
        <View style={[styles.textContainer, { marginBottom: 6 }]}>
          <Text
            style={{
              ...fonts.accCreatedTitle,
              color: colors.rhinoDark,
              marginBottom: 24,
            }}>
            Profile Update Failed!
          </Text>
          <Text
            style={{
              ...fonts.accCreatedSubTitle,
              color: colors.rhinoDark2,
              textAlign: 'center',
            }}>
            Oops, there are something wrong with updating
          </Text>
          <Text
            style={{
              ...fonts.accCreatedSubTitle,
              color: colors.rhinoDark2,
              textAlign: 'center',
            }}>
            details, please try again in a moment.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button text={'Try Again'} />
        </View>
        <Button
          text={'Cancel'}
          style={styles.cancel}
          textStyle={styles.textCancel}
          color={colors.white}
          textColor={colors.danger}
        />
      </RBSheet>
    </Block>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 26,
  },
  line1: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
  },
  inputField: {
    marginBottom: 17,
  },
  button: {
    marginTop: 15,
    marginBottom: 50,
  },
  container: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    marginTop: 18,
    marginBottom: 50,
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.white,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 8,
  },

  container2: {
    alignItems: 'center',
    marginTop: 43,
    marginBottom: 24,
  },
  buttons: {
    marginTop: 18,
    marginVertical: 24,
  },
  cancel: {
    borderColor: colors.danger,
    borderWidth: 1,
  },
});
