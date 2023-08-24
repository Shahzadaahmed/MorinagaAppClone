import { View, Text } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { colors, fonts } from '../constants';

const ErrorText = ({ text }) => {
  return (
    <Text
      style={{
        ...fonts.inputHead,
        color: colors.danger,
        alignSelf: 'flex-start',
        marginTop: moderateScale(5),
      }}>
      Please input the correct {text}
    </Text>
  );
};

export default ErrorText;
