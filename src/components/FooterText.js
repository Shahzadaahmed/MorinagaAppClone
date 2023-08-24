import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constants';

export default function FooterText({
  text,
  text1,
  textStyle,
  textStyle1,
  onPress,
}) {
  return (
    <>
      <Text style={[{...fonts.signUp, color: colors.darkBlue}, textStyle]}>
        {text}
      </Text>
      <TouchableOpacity>
        <Text
          style={[
            {
              ...fonts.signUp,
              color: colors.danger,
              marginLeft: 3,
            },
            textStyle1,
          ]}
          onPress={onPress}>
          {text1}
        </Text>
      </TouchableOpacity>
    </>
  );
}
