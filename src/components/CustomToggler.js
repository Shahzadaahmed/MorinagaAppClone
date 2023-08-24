import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants';

export default function CustomToggler() {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.outter,
          active ? {...styles.active} : {...styles.unActive},
        ]}
        onPress={toggle}>
        <View style={[styles.inner]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outter: {
    width: 37,
    height: 20,
    backgroundColor: colors.darkGrey,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  inner: {
    width: 17,
    height: 17,
    backgroundColor: colors.white,
    borderRadius: 20,
    // elevation: 8,
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.15,
    // shadowRadius: 2,
  },
  active: {
    justifyContent: 'flex-end',
    backgroundColor: colors.danger,
  },
  unactive: {
    justifyContent: 'flex-start',
    backgroundColor: colors.darkGrey,
  },
});
