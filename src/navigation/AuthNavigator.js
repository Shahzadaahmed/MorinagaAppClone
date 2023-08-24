import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import {
  AccountCreated,
  ForgetPassword,
  SignIn,
  SignUp,
  VerifyAccount,
} from '../screens';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash">

      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'AccountCreated'} component={AccountCreated} />
      <Stack.Screen name={'ForgetPassword'} component={ForgetPassword} />
      <Stack.Screen name={'VerifyAccount'} component={VerifyAccount} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
