import React from 'react';
import {
  EditProfile,
  FeedBack,
  Settings,
  EditKidsProfile,
  AddKidsProfile,
  FinalKidsCalculation,
  KidsBMICalculate,
  KIdsKCalCalculate,
  KidsProfileList,
  BMIKCalLog,
  Announcements,
  AnnouncementDetails,
  ChangePassword,
} from '../screens';

import FAQ from '../screens/FAQ';
import FAQDetails from '../screens/FAQDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Dashboard'} component={BottomTabsNavigator} />
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen name={'FeedBack'} component={FeedBack} />
      <Stack.Screen name={'Settings'} component={Settings} />
      <Stack.Screen name={'AddKidsProfile'} component={AddKidsProfile} />
      <Stack.Screen name={'EditKidsProfile'} component={EditKidsProfile} />
      <Stack.Screen name={'KidsBMICalculate'} component={KidsBMICalculate} />
      <Stack.Screen name={'KIdsKCalCalculate'} component={KIdsKCalCalculate} />
      <Stack.Screen name={'BMIKCalLog'} component={BMIKCalLog} />
      <Stack.Screen name={'Announcements'} component={Announcements} />

      <Stack.Screen name="KidsProfileList" component={KidsProfileList} />

      <Stack.Screen
        name={'AnnouncementDetails'}
        component={AnnouncementDetails}
      />
      <Stack.Screen
        name={'FinalKidsCalculation'}
        component={FinalKidsCalculation}
      />
      <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
      <Stack.Screen name={'FAQ'} component={FAQ} />
      <Stack.Screen name={'FAQDetails'} component={FAQDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
