import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { screenWidth } from '../constants/screenResolution';
import { colors, fonts } from '../constants';
import {
  AvatarSvg1,
  NotificationSvg,
  Notifications,
  SettingSvg,
  UserAvatarSvg,
  AvatarSvg3,
} from '../asset/svg';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/core';
import { AuthContext } from '../context';

const IntroHeader = ({
  text1,
  text2,
  settingPress,
  color = colors.primary,
  showIcon,
  personGender,
  showText,
  styleIcon,
}) => {
  const navigatation = useNavigation();
  const { user } = AuthContext.useAuth();

  return (
    <View style={style.container}>
      <View style={style.left_header}>
        {user?.user_profile ? (
          <Image source={{ uri: user?.user_profile }} style={style.avatar} />
        ) : personGender ? (
          <AvatarSvg3 />
        ) : (
          <AvatarSvg1 />
        )}
        {showIcon && (
          <View style={[style.notifications, styleIcon]}>
            <Notifications />
          </View>
        )}
        <View style={style.center_Header}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              ...fonts.subHeadUser,
              color: color,
              maxWidth: 180,
              fontSize: 18,
            }}>
            Hello, {user?.full_name}👋
          </Text>
          {/* <Text style={{ ...fonts.subHeadUser3, color: color }}>{text1}</Text> */}
          {/* {showText && (
            <Text style={{ ...fonts.subHeadUser3, color: color }}>{text2}</Text>
          )} */}
        </View>
      </View>

      <View style={style.right_header}>
        <TouchableOpacity
          onPress={() => navigatation.navigate('Announcements')}>
          <NotificationSvg />
        </TouchableOpacity>
        <TouchableOpacity onPress={settingPress}>
          <SettingSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: screenWidth - 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center_Header: {
    marginLeft: 10,
  },
  left_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right_header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: moderateScale(90),
  },
  notifications: {
    position: 'absolute',
    top: 10,
    left: 38,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 100,
  },
});
export default IntroHeader;
