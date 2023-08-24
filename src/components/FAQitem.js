import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image, Vector } from '../asset/svg';
import { colors, fonts } from '../constants';
import { DateTimeHelper } from '../helper';

export default function FAQitem({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}>
      <View flex={1}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{item?.heading}</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: colors.darkGrey,
            marginVertical: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    // marginLeft: 20,
  },
  heading: {
    ...fonts.annoucementText,
    color: colors.danger,
    alignItems: 'center',
    fontWeight: '500',
  },
});
