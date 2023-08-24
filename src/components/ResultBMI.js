import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';
import { moderateScale } from 'react-native-size-matters';
import { screenWidth } from '../constants/screenResolution';

const ResultBMI = ({
  actualHeight,
  actualWeight,
  actualBMI,
  idealHeight,
  idealWeight,
  idealBMI,
  marginHorizontal,
  marginLeft,
}) => {
  const renderIndication = bmi => {
    if (!bmi) {
      return '';
    }
    if (bmi <= 18.5) {
      return 'Underweight';
    } else if (bmi > 18.6 && bmi <= 24.9) {
      return 'Normal Weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Overweight';
    } else if (bmi >= 30 && bmi <= 34.9) {
      return 'Obesity (Class 1)';
    } else if (bmi >= 36 && bmi <= 39.9) {
      return 'Obesity (Class 2)';
    } else if (bmi > 50) {
      return 'Extreme Obesity (Class 3)';
    }
  };

  return (
    <>
      <Text
        style={{
          ...fonts.subHeadUser2,
          color: colors.primary,
          marginVertical: moderateScale(20),
          marginLeft: marginLeft || moderateScale(36),
        }}>
        BMI Result
      </Text>
      <View
        style={[
          styles.container,
          { marginHorizontal: marginHorizontal || moderateScale(36) },
        ]}>
        <View>
          <Text
            style={{
              ...fonts.ResultHead,
              color: colors.white,
              backgroundColor: colors.danger3,
              paddingHorizontal: moderateScale(15),
              textAlign: 'center',
            }}>
            ACTUAL
          </Text>
          <Text style={{ ...fonts.ResultHead, color: colors.black }}>
            Height:{' '}
            <Text style={{ color: colors.result }}>
              {actualHeight ? actualHeight + ' cm' : ''}
            </Text>
          </Text>
          <Text style={{ ...fonts.ResultHead, color: colors.black }}>
            Weight:{' '}
            <Text style={{ color: colors.result }}>
              {actualWeight ? actualWeight + ' Kg' : ''}
            </Text>
          </Text>
          <Text style={{ ...fonts.ResultHead, color: colors.black }}>
            BMI: <Text style={{ color: colors.result }}>{actualBMI}</Text>
          </Text>
        </View>
        <View>
          <Text
            style={{
              ...fonts.ResultHead,
              color: colors.white,
              backgroundColor: colors.danger3,
              paddingHorizontal: moderateScale(15),
              textAlign: 'center',
            }}>
            *IDEAL/STANDARD
          </Text>
          <Text style={{ ...fonts.ResultHead, color: colors.black }}>
            Height:{' '}
            <Text style={{ color: colors.result }}>
              {idealHeight ? idealHeight + ' cm' : ''}
            </Text>
          </Text>
          <Text style={{ ...fonts.ResultHead, color: colors.black }}>
            Weight:{' '}
            <Text style={{ color: colors.result }}>
              {idealWeight ? idealWeight + ' Kg' : ''}
            </Text>
          </Text>
          <Text style={{ ...fonts.ResultHead, color: colors.black }}>
            BMI: <Text style={{ color: colors.result }}>{idealBMI}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.symptoms}>
        <Text
          style={{
            ...fonts.subHeadUser2,
            color: colors.primary,
            marginVertical: moderateScale(20),
          }}>
          BMI
        </Text>
        <Text
          style={{
            ...fonts.subHeadUser2,
            color: colors.danger4,
            marginVertical: moderateScale(20),
          }}>
          {renderIndication(actualBMI)}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  symptoms: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenWidth - 80,
    alignSelf: 'center',
  },
});
export default ResultBMI;
