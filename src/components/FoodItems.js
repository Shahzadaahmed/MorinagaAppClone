import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenWidth} from '../constants/screenResolution';
import {BMISvg, BananaSvg, Minus, Plus} from '../asset/svg';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../constants';

const FoodItems = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View>
          <BananaSvg />
        </View>
        <View>
          <Text style={{...fonts.items, color: colors.black2}}>Banana</Text>
          <Text style={{...fonts.subItems, color: colors.black2}}>
            1 Banana has 4 Kcal
          </Text>
        </View>
        <View style={styles.rightFlex}>
          <TouchableOpacity>
            <Plus />
          </TouchableOpacity>
          <Text
            style={{
              ...fonts.items,
              color: colors.black2,
              marginHorizontal: moderateScale(5),
            }}>
            0.25
          </Text>
          <TouchableOpacity>
            <Minus />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: colors.black,
    backgroundColor: colors.grey2,
    padding: moderateScale(15),
    borderRadius: 20,
    marginTop: moderateScale(20),
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default FoodItems;
