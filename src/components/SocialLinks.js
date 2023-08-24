import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constants';

const {width} = Dimensions.get('window');

export default function SocialLinks({text, icon, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.btnContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 100,
    alignSelf: 'center',
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightWhite,
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 160,
    alignSelf: 'center',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  btnText: {
    ...fonts.socialText,
    color: colors.black,
    marginHorizontal: 10,
  },
});
