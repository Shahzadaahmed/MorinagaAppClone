import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';
import { useLoading } from '../context/LoadingContext';

const { width } = Dimensions.get('window');

export default function Button({
  text,
  color = colors.danger,
  textColor = colors.white,
  btnWidth = width - 100,
  height = 60,
  onPress,
  style,
  textStyle,
  marginHorizontal = 50,
  borderRadius = 15,
  nextbtnenable = false,
  textConditionForUserKcalNextBtn,
}) {
  const { loading } = useLoading();

  return (
    <TouchableOpacity
      style={[
        {
          ...styles.container,
          backgroundColor:
            text === 'Next' && textConditionForUserKcalNextBtn === 'XXX'
              ? nextbtnenable
                ? color
                : colors.danger2
              : color,
          width: btnWidth,
          height,
          marginHorizontal,
          borderRadius,
        },
        style,
      ]}
      onPress={onPress}
      disabled={
        (text === 'Next' &&
          textConditionForUserKcalNextBtn === 'XXX' &&
          !nextbtnenable) ||
        loading
      }>
      <Text
        style={[
          textStyle,
          { ...fonts.signIn, textAlign: 'center', color: textColor },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
