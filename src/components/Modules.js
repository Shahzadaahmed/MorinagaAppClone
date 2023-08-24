import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { PatternSvg } from '../asset/svg';

const Modules = ({
  width,
  ModuleImg,
  text1,
  text2,
  onPress,
  patternLeft,
  maxWidth,
  paddingRight,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ position: 'relative' }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.danger2, colors.danger, colors.danger2]}
        style={{
          ...styles.linearGradient,
          width: width,
          maxWidth: maxWidth,
          paddingRight: paddingRight,
          alignItems: 'center',
        }}>
        <View style={styles.left}>
          <View style={styles.left_round}>
            <ModuleImg />
          </View>
        </View>
        <View style={styles.buttonText}>
          <Text
            style={{
              ...fonts.dashboardMain,
              color: colors.white,
              // marginTop: moderateScale(-5),
            }}>
            {text1}
          </Text>
          {/* <Text
            style={{
              ...fonts.dashboardSubHead,
              color: colors.white,
              marginTop: moderateScale(-15),
            }}>
            {text2}
          </Text> */}
        </View>
      </LinearGradient>
      <View style={{ position: 'absolute', left: patternLeft }}>
        <PatternSvg />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: moderateScale(10),
    borderRadius: 20,
    height: moderateScale(80),
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    // justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  left: {
    borderRadius: 36,
    width: moderateScale(50),
    height: moderateScale(50),
    // borderWidth: 1,
    // borderColor: colors.danger,
    backgroundColor: colors.white,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left_round: {
    borderRadius: 40,
    width: moderateScale(56),
    height: moderateScale(56),
    borderWidth: 2,
    borderColor: colors.white,
    // backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Modules;
