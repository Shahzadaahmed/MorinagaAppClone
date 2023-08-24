import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Header,
  InputField,
  Button,
  SocialLinks,
  FooterText,
  Block,
} from '../components';
import { colors, fonts } from '../constants';
import { Eye, EyeOpen, Google } from '../asset/svg';

import { Auth } from '../services';
import { Alert } from 'react-native';
import { AuthContext, LoadingContext } from '../context';
import { FirebaseAuthErrors } from '../helper';
import auth from '@react-native-firebase/auth';

export default function SignIn({ navigation }) {
  // context
  const { user, setUser } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [email, setemail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSignin = () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Email and password is required.');
    }

    setLoading(true);

    Auth.signIn({ email, password })
      .then(_ => getUserDetails(auth()?.currentUser?.uid))
      .catch(err =>
        Alert.alert('Error', FirebaseAuthErrors[err.code] || err.message),
      )
      .finally(() => setLoading(false));
  };

  const onGoogleSignin = () => {
    setLoading(true);

    Auth.googleSignIn()
      .then(_ => getUserDetails(auth()?.currentUser?.uid))
      .catch(err =>
        Alert.alert('Error', FirebaseAuthErrors[err.code] || err.message),
      )
      .finally(() => setLoading(false));
  };

  const getUserDetails = uid =>
    Auth.getUserById(uid).then(userData => setUser(userData));

  const resetPassword = () => {
    if (!email || !isEmailValid()) {
      Alert.alert('Please fill correct email');
    } else {
      navigation.navigate('ForgetPassword', { email });
    }
  };

  return (
    <Block>
      <Header />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Login Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="email@domain.com"
          value={'Email'}
          keyboardType={'email-address'}
          inputValue={email}
          setInputValue={e => setemail(e)}
          autoCapitalize="none"
        />
        <InputField
          placeholder="password"
          value={'Password'}
          inputValue={password}
          setInputValue={e => setPassword(e)}
          style={styles.inputField}
          secureTextEntry={isPasswordVisible}
          icon={isPasswordVisible ? <Eye /> : <EyeOpen />}
          togglePasswordVisibility={() => setIsPasswordVisible(prev => !prev)}
        />
        <TouchableOpacity onPress={resetPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <Button text={'Login'} onPress={onSignin} />
      </View>
      <View style={styles.lineTextContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Sign in with</Text>
        <View style={styles.line} />
      </View>
      <SocialLinks
        text={'Connect With Google'}
        icon={<Google />}
        onPress={onGoogleSignin}
      />
      {/* <SocialLinks text={'Connect With  Facebook'} icon={<Facebook />} /> */}
      <View style={styles.row}>
        <FooterText
          text={'Don’t have an account ?'}
          text1={'Sign up'}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  heading: {
    ...fonts.tittle,
    color: colors.darkBlue,
  },
  subheading: {
    ...fonts.subTitle,
    color: colors.description,
  },
  inputContainer: {
    paddingBottom: 20,
  },
  inputField: {
    marginTop: 22,
  },
  forgotPassword: {
    ...fonts.password,
    color: colors.black,
    marginLeft: 'auto',
    marginRight: 50,
  },
  button: {
    marginBottom: 20,
  },
  orText: {
    ...fonts.signInWith,
    paddingHorizontal: 20,
    color: colors.darkGrey,
  },
  lineTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.whiteSmoke,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
});
