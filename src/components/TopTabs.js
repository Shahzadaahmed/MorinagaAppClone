import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { colors, fonts } from '../constants';
import { Pressable } from 'react-native';

const TopTabs = ({ data, selectedIndex, setSelectedIndex }) => (
  <View style={styles.tabBar}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.map((route, i) => {
        return (
          <Pressable
            key={i}
            style={[
              selectedIndex === route?.id
                ? styles.selected
                : styles.notSelected,
              {},
            ]}
            onPress={() =>
              typeof setSelectedIndex === 'function' &&
              setSelectedIndex(route?.id)
            }>
            <Animated.Text
              style={[
                styles.name,
                {
                  color: selectedIndex === route?.id ? '#FF0000' : colors.black,
                },
              ]}>
              {route.name}
            </Animated.Text>
          </Pressable>
        );
      })}
    </ScrollView>
  </View>
);

export default TopTabs;

const styles = StyleSheet.create({
  tabBar: {
    marginLeft: 20,
    marginTop: 15,
    paddingBottom: 5,
  },
  name: {
    ...fonts.items,
    padding: 5,
    paddingBottom: 2,
    marginHorizontal: 0,
    fontWeight: '300',
  },
  notSelected: {
    paddingRight: 5,
  },
  selected: {
    paddingRight: 5,
    marginHorizontal: 4,
    paddingHorizontal: 0,
    borderBottomWidth: 4,
    borderBottomColor: '#FF0000',
  },
});
