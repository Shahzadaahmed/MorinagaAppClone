import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';

export default function AccountSetting({ icon, text, iconRight, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
      <Text
        style={{
          ...fonts.ResultHead2,
          flex: 1,
          marginLeft: 16,
          color: colors.forgetText,
        }}>
        {text}
      </Text>
      <TouchableOpacity style={styles.iconRightContainer} onPress={onPress}>
        {iconRight}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconRightContainer: {
    marginLeft: 'auto',
  },
});
