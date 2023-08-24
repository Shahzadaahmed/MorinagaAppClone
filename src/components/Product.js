import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image, Vector } from '../asset/svg';
import { colors, fonts } from '../constants';
import { DateTimeHelper } from '../helper';

export default function Product({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}>
      <Image />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>{item?.heading}</Text>

        <Text style={styles.text} numberOfLines={2}>
          {item?.description}
        </Text>

        <View style={styles.timer}>
          <Vector />

          <Text style={styles.time}>
            {DateTimeHelper.getTimeDifference(item?.created_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    flexDirection: 'row',
    marginBottom: 19,
    flex: 1,
  },
  textContainer: {
    marginLeft: 20,
  },
  heading: {
    ...fonts.annoucementText,
    color: colors.danger,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
  },
  text: {
    ...fonts.annoucementText,
    color: colors.black,
    maxWidth: '80%',
  },
  time: {
    ...fonts.annoucementText,
    color: colors.annoucementText,
    marginLeft: 9,
  },
});
