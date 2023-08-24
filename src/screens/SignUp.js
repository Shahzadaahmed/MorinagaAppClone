import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Block, Header, InputField, Button, FooterText } from '../components';
import { colors, fonts } from '../constants';
import { Eye, EyeOpen, Facebook, Google } from '../asset/svg';
import { Auth } from '../services';
import { AuthContext, LoadingContext } from '../context';
import { FirebaseAuthErrors } from '../helper';
import auth from '@react-native-firebase/auth';

export default function SignUp({ navigation }) {
  // context
  const { setUser } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [email, setemail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prev => !prev);
  };

  const onSignup = () => {
    setLoading(true);

    Auth.signUp({ email, password, full_name: fullName, confirmPassword })
      .then(_ => getUserDetails(auth()?.currentUser?.uid))
      .then(_ =>
        Alert.alert('Success', 'Your account has been created successfully.'),
      )
      .catch(err =>
        Alert.alert('Error', FirebaseAuthErrors[err.code] || err.message),
      )
      .finally(() => setLoading(false));
  };

  const onGoogleSignup = () => {
    setLoading(true);

    Auth.googleSignIn()
      .then(_ => getUserDetails(auth()?.currentUser?.uid))
      .catch(err =>
        Alert.alert('Error', FirebaseAuthErrors[err.code] || err.message),
      )
      .finally(() => setLoading(false));
  };

  const getUserDetails = uid =>
    Auth.getUserById(uid).then(userData => {
      setUser(userData);
    });

  return (
    <Block withoutScroll={false}>
      <Header showArrow={true} />
      <View style={styles.textContainer}>
        <Text style={{ ...fonts.tittle, color: colors.darkBlue }}>
          Create Account
        </Text>
        <Text style={{ ...fonts.subTitle, color: colors.description }}>
          Create your Account & Get Vouchers
        </Text>
      </View>
      <View style={styles.inputField}>
        <InputField
          placeholder="email@domain.com"
          value={'Email'}
          keyboardType={'email-address'}
          inputValue={email}
          setInputValue={e => setemail(e)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputField}>
        <InputField
          placeholder="John Kelly"
          value={'Full Name'}
          inputValue={fullName}
          setInputValue={e => setFullName(e)}
        />
      </View>
      <View style={styles.inputField}>
        <InputField
          inputValue={password}
          setInputValue={e => setPassword(e)}
          placeholder="password"
          value={'Password'}
          isPasswordVisible={isPasswordVisible}
          secureTextEntry={isPasswordVisible}
          icon={isPasswordVisible ? <Eye /> : <EyeOpen />}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </View>
      <InputField
        placeholder="password"
        secureTextEntry={isConfirmPasswordVisible}
        value={'Confirm Password'}
        isPasswordVisible={isConfirmPasswordVisible}
        icon={isConfirmPasswordVisible ? <Eye /> : <EyeOpen />}
        togglePasswordVisibility={toggleConfirmPasswordVisibility}
        inputValue={confirmPassword}
        setInputValue={e => setConfirmPassword(e)}
      />
      <View style={styles.button}>
        <Button text={'Sign up'} onPress={onSignup} />
      </View>
      <View style={styles.lineTextContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Sign in with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icons} onPress={onGoogleSignup}>
          <Google />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.icons}>
          <Facebook width={34} height={34} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.row}>
        <FooterText
          text={'Already have an account?'}
          text1={' Go Back'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 35,
  },

  inputField: {
    marginBottom: 15,
  },
  button: {
    marginTop: 25,
    marginBottom: 28,
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
  orText: {
    ...fonts.signInWith,
    paddingHorizontal: 20,
    color: colors.darkGrey,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 55,
    height: 55,
    borderRadius: 100,
    borderColor: colors.lightWhite,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    marginBottom: 10,
  },
});
