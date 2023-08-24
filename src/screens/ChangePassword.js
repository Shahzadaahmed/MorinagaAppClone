import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Block, Header, InputField, Button } from '../components';
import { colors } from '../constants';
import { Eye, EyeOpen } from '../asset/svg';
import { FirebaseAuthErrors } from '../helper';
import { LoadingContext } from '../context';
import auth from '@react-native-firebase/auth';

export default function ChangePassword({ navigation }) {
  // context
  const { setLoading } = LoadingContext.useLoading();

  // state
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    oldPasswordVisible: true,
    newPasswordVisible: true,
    confirmPasswordVisible: true,
  });

  const togglePasswordVisibility = (name, value) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [name]: value,
    });
  };

  const handleChange = (name, value) => {
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handlePasswordChange = async () => {
    if (
      !password.newPassword ||
      !password.confirmPassword ||
      !password.oldPassword
    )
      return Alert.alert('Error', "Password fields can't be empty.");

    if (password.newPassword !== password.confirmPassword) {
      return Alert.alert(
        'Error',
        "Your password and confirm password doesn't match.",
      );
    }

    setLoading(true);
    try {
      const user = auth().currentUser;
      const credentials = auth.EmailAuthProvider.credential(
        user?.email,
        password?.oldPassword,
      );
      await user.reauthenticateWithCredential(credentials);
      await user.updatePassword(password.newPassword);
      Alert.alert('Success', 'Your password has been changed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', FirebaseAuthErrors[error.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Block withoutScroll={false}>
      <Header showArrow={true} onPress={() => navigation.goBack()} />
      <View style={styles.textContainer}>
        <Text style={{ ...fonts.tittle, color: colors.darkBlue }}>
          Change Password
        </Text>
        <Text style={{ ...fonts.subTitle, color: colors.description }}>
          Set your new password
        </Text>
      </View>
      <InputField
        secureTextEntry={isPasswordVisible.oldPasswordVisible}
        value={'Current Password'}
        style={styles.inputField}
        icon={isPasswordVisible.oldPasswordVisible ? <Eye /> : <EyeOpen />}
        togglePasswordVisibility={() =>
          togglePasswordVisibility(
            'oldPasswordVisible',
            !isPasswordVisible.oldPasswordVisible,
          )
        }
        inputValue={password?.oldPassword}
        setInputValue={e => handleChange('oldPassword', e)}
      />
      <InputField
        secureTextEntry={isPasswordVisible.newPasswordVisible}
        value={'Password'}
        style={styles.inputField}
        icon={isPasswordVisible.newPasswordVisible ? <Eye /> : <EyeOpen />}
        togglePasswordVisibility={() =>
          togglePasswordVisibility(
            'newPasswordVisible',
            !isPasswordVisible.newPasswordVisible,
          )
        }
        inputValue={password?.newPassword}
        setInputValue={e => handleChange('newPassword', e)}
      />
      <InputField
        secureTextEntry={isPasswordVisible.confirmPasswordVisible}
        value={'Confirm Password'}
        icon={isPasswordVisible.confirmPasswordVisible ? <Eye /> : <EyeOpen />}
        togglePasswordVisibility={() =>
          togglePasswordVisibility(
            'confirmPasswordVisible',
            !isPasswordVisible.confirmPasswordVisible,
          )
        }
        inputValue={password?.confirmPassword}
        setInputValue={e => handleChange('confirmPassword', e)}
      />
      <View style={styles.button}>
        <Button text={'Update Password'} onPress={handlePasswordChange} />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 60,
  },
  inputField: {
    marginBottom: 15,
  },
  button: {
    marginTop: 29,
  },
});
