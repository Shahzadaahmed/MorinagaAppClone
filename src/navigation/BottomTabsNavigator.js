import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DashboardUser,
  AddKidsProfile,
  BMIKCalLog,
  KidsProfileList,
  Settings,
  Announcements,
} from '../screens';
import { Activity, Home, User } from 'svg';
import { colors } from '../constants';
import { Add, Heart, ProfilesList } from '../asset/svg';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: '#fff',
          height: 60,
          paddingBottom: 25,
        },
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'DashboardUserTabs') {
            icon = <Home fill={focused ? colors.danger : colors.darkGrey} />;
          } else if (route.name === 'KidsProfileList') {
            icon = <User stroke={focused ? colors.danger : colors.darkGrey} />;
          } else if (route.name === 'AddKidsProfile') {
            icon = <Add fill={focused ? colors.danger : colors.darkGrey} />;
          } else if (route.name === 'Announcements') {
            icon = <Activity fill={colors.white} stroke={colors.darkGrey} />;
          } else if (route.name === 'Setting') {
            icon = <User stroke={focused ? colors.danger : colors.darkGrey} />;
          }

          return icon;
        },
      })}>
      <Tab.Screen name="DashboardUserTabs" component={DashboardUser} />
      <Tab.Screen name="AddKidsProfile" component={AddKidsProfile} />
      {/* <Tab.Screen
        name="Announcements"
        component={Announcements}
        listeners={() => ({
          tabPress: event => {
            event.preventDefault();
          },
        })}
      /> */}
      <Tab.Screen name="KidsProfileList" component={KidsProfileList} />

      {/* <Tab.Screen name="Setting" component={Settings} /> */}
    </Tab.Navigator>
  );
}
