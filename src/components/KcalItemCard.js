import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../constants';
import { screenWidth } from '../constants/screenResolution';
import { moderateScale } from 'react-native-size-matters';
import { BananaSvg, Minus, Plus } from '../asset/svg';

const KcalItemCard = ({ item, selectedItems, onIncrement, onDecrement }) => {
  const foundObject = selectedItems?.find(obj => obj.id === item?.id);

  return (
    <View style={styles.container}>
      <BananaSvg />

      <View style={styles.flexContainer}>
        <View style={styles.leftFlex}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item?.name?.charAt(0).toUpperCase() + item?.name?.slice(1)}
          </Text>
          <Text style={styles.calories} numberOfLines={2} ellipsizeMode="tail">
            {`${item?.quantity} ${item?.quantity_unit} ${item?.name} has ${item?.calories} Kcal`}
          </Text>
        </View>
        <View style={styles.rightFlex}>
          <TouchableOpacity
            disabled={foundObject?.count <= 0}
            onPress={() => {
              foundObject?.count > 0 && onDecrement(item);
            }}>
            <Minus />
          </TouchableOpacity>

          <Text style={styles.quantity} numberOfLines={1} ellipsizeMode="tail">
            {foundObject?.count || 0}
          </Text>

          <TouchableOpacity onPress={() => onIncrement(item)}>
            <Plus />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default KcalItemCard;

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 30,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey2,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: moderateScale(3),
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftFlex: {
    marginLeft: 10,
    flexShrink: 1,
  },
  rightFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...fonts.items,
    color: colors.black2,
  },
  calories: {
    ...fonts.subItems,
    color: colors.black2,
  },
  quantity: {
    ...fonts.itemCount,
    color: colors.black2,
    marginHorizontal: moderateScale(2),
    width: moderateScale(30),
    textAlign: 'center',
  },
});
