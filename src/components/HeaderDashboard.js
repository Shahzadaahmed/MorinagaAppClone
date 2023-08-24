import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';
import { screenWidth } from '../constants/screenResolution';
import { ArrowLeft, MorinagaSvg } from '../asset/svg';
import { moderateScale } from 'react-native-size-matters';
import IntroHeader from './IntroHeader';
import { useNavigation } from '@react-navigation/core';

const HeaderDashboard = ({
  text,
  style,
  style1,
  text3,
  text1,
  text2,
  showIcon,
  personGender,
  showText,
  styleIcon,
  settingPress,
  onBackPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.flexContainer}>
        <TouchableOpacity
          style={styles.left_round}
          onPress={() =>
            typeof onBackPress === 'function'
              ? onBackPress()
              : navigation.goBack()
          }>
          <ArrowLeft />
        </TouchableOpacity>
        <View
          style={[
            {
              marginRight: moderateScale(35),
              width: screenWidth / 2 - 20,
            },
            // style,
          ]}>
          <Text
            style={{
              ...fonts.subHeadUser3,
              marginLeft: moderateScale(20),
              color: colors.white,
            }}>
            {text}
          </Text>
        </View>
        <View style={[{ marginTop: 30 }, style1]}>
          <MorinagaSvg width={92} height={55} />
        </View>
      </View>
      <IntroHeader
        text={text3}
        text1={text1}
        // text2={text2}
        showIcon={showIcon}
        personGender={personGender}
        showText={showText}
        color={colors.white}
        styleIcon={styleIcon}
        settingPress={settingPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    height: 180,
    backgroundColor: colors.danger,
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'column',
  },
  left_round: {
    borderRadius: 25,
    width: moderateScale(45),
    height: moderateScale(45),
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(0),
    marginBottom: moderateScale(0),
    width: screenWidth - 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default HeaderDashboard;
