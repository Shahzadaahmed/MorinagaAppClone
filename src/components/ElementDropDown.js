import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { screenWidth } from '../constants/screenResolution';
import { colors } from '../constants';

const ElementDropDown = ({
  data,
  value,
  setValue,
  placeholder = 'Select Kids',
  style,
  labelField,
  valueField,
  showDropDownSearch = false,
  height,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          height: height || 45,
        },
      ]}>
      <Dropdown
        placeholderStyle={styles.placeholder}
        selectedTextStyle={{ color: colors.black }}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={showDropDownSearch}
        maxHeight={250}
        labelField={labelField || 'label'}
        valueField={valueField || 'value'}
        placeholder={placeholder}
        searchPlaceholder="Search"
        value={value}
        onChange={setValue}
        style={{ flex: 1 }}
        itemTextStyle={{ color: colors.black }}
      />
    </View>
  );
};

export default ElementDropDown;

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholder: {
    position: 'absolute',
    top: -5,
    color: colors.darkGrey,
    fontSize: 12,
  },
  iconStyle: {
    alignItems: 'center',
    marginLeft: 'auto',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
