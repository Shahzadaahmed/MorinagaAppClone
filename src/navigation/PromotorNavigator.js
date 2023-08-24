import React from 'react';
import {
  EditProfile,
  Announcements,
  AnnouncementDetails,
  PromottorsAttendance,
  SettingsPromotor,
  PromotorEditProfile,
  PromotorBMIKCalLog,
  PromotorsUsersKidsProfileList,
} from '../screens';
import FAQ from '../screens/FAQ';
import FAQDetails from '../screens/FAQDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PromtorsBottomTabsNavigator from './PromtorsBottomTabsNavigator';

const Stack = createNativeStackNavigator();

const PromotorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={'Dashboard'}
        component={PromtorsBottomTabsNavigator}
      />
      <Stack.Screen name={'EditProfile'} component={EditProfile} />
      <Stack.Screen name={'Announcements'} component={Announcements} />
      <Stack.Screen
        name={'PromottorsAttendance'}
        component={PromottorsAttendance}
      />
      <Stack.Screen
        name={'AnnouncementDetails'}
        component={AnnouncementDetails}
      />
      <Stack.Screen
        name={'PromotorEditProfile'}
        component={PromotorEditProfile}
      />
      <Stack.Screen
        name={'PromotorBMIKCalLog'}
        component={PromotorBMIKCalLog}
      />
      <Stack.Screen
        name="PromotorsUsersKidsProfileList"
        component={PromotorsUsersKidsProfileList}
      />
      <Stack.Screen name={'FAQ'} component={FAQ} />
      <Stack.Screen name={'FAQDetails'} component={FAQDetails} />
      <Stack.Screen name="SettingsPromotor" component={SettingsPromotor} />
    </Stack.Navigator>
  );
};
export default PromotorNavigator;
