import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DashboardPromotor,
  PromotorsUsersKidsProfileList,
  Promotors,
  Announcements,
  SettingsPromotor,
} from '../screens';
import { Activity, Home, User } from 'svg';
import { colors } from '../constants';
import { Add, ProfilesList } from '../asset/svg';

const Tab = createBottomTabNavigator();

export default function PromtorsBottomTabsNavigator() {
  return (
    <Tab.Navigator
      backBehavior="history"
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
          // setFocus(focused);
          if (route.name === 'DashboardPromotorTabs') {
            icon = <Home fill={focused ? colors.danger : colors.darkGrey} />;
          } else if (route.name === 'PromotorsUsersKidsProfileList') {
            icon = <User stroke={focused ? colors.danger : colors.darkGrey} />;
          } else if (route.name === 'Promotors') {
            icon = <Add fill={focused ? colors.danger : colors.darkGrey} />;
          } else if (route.name === 'Announcements') {
            icon = <Activity fill={colors.white} stroke={colors.darkGrey} />;
          } else if (route.name === 'SettingsPromotor') {
            icon = <User stroke={focused ? colors.danger : colors.darkGrey} />;
          }

          return icon;
        },
      })}>
      <Tab.Screen name="DashboardPromotorTabs" component={DashboardPromotor} />
      <Tab.Screen name="Promotors" component={Promotors} />
      <Tab.Screen
        name="PromotorsUsersKidsProfileList"
        component={PromotorsUsersKidsProfileList}
      />

      {/* <Tab.Screen name="Announcements" component={Announcements} /> */}
      {/* <Tab.Screen name="SettingsPromotor" component={SettingsPromotor} /> */}
    </Tab.Navigator>
  );
}
