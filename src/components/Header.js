import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Morinaga, CapitalM, ArrowLeft } from '../asset/svg';
import { colors } from '../constants';

const { width, height } = Dimensions.get('window');

export default function Header({ showArrow, onPress }) {
  const arrowSize = width * 0.12;
  const arrowMargin = width * 0.04;
  const capitalMMargin = width * 0.04;

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        {showArrow && (
          <TouchableOpacity
            style={[
              styles.arrow,
              {
                width: arrowSize,
                height: arrowSize,
                borderRadius: arrowSize / 2,
                marginLeft: arrowMargin,
                marginBottom: arrowSize * 0.6,
              },
            ]}
            onPress={onPress}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
        <View
          style={[
            showArrow && styles.capitalM,
            // !showArrow && styles.centeredCapitalM,
            { marginRight: -capitalMMargin },
          ]}>
          <CapitalM />
        </View>
      </View>
      <Morinaga />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.3 * 0.7,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 40,
  },
  capitalM: {
    flex: 1,
    marginHorizontal: -65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredCapitalM: {
    alignItems: 'center',
  },
});
