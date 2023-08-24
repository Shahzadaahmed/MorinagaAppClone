import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { colors } from '../constants';
import { CheckMark } from '../asset/svg';

const { width } = Dimensions.get('window');

const InputField = ({
  value,
  placeHolderStyle,
  titleStyle,
  style,
  icon,
  inputValue,
  setInputValue,
  isPasswordVisible,
  togglePasswordVisibility,
  ...props
}) => {
  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputValue);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.placeholder, titleStyle]}>{value}</Text>

      <TextInput
        style={[styles.input, placeHolderStyle]}
        placeholderTextColor={colors.attendance}
        value={inputValue}
        onChangeText={setInputValue}
        autoCapitalize="none"
        {...props}
      />

      {value === 'Email' && isEmailValid() && (
        <CheckMark style={styles.iconContainer} />
      )}

      {icon && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 100,
    alignSelf: 'center',
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginBottom: -15,
    color: colors.blue,
  },
  placeholder: {
    position: 'absolute',
    top: 5,
    left: 12,
    color: colors.darkGrey,
    fontSize: 12,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
});

export default InputField;
