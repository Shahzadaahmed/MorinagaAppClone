import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants';
import { moderateScale } from 'react-native-size-matters';
import { screenWidth } from '../constants/screenResolution';

export default function ResultKcal({ totalKcal, requiredKcal }) {
  const renderIndication = (finalKcal, requiredKcal) => {
    if (!finalKcal && !requiredKcal) {
      return '';
    }
    if (finalKcal < requiredKcal) {
      return 'Deficit';
    } else if (finalKcal === requiredKcal) {
      return 'At par';
    } else if (finalKcal > requiredKcal) {
      return 'Surplus';
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...fonts.subHeadUser2,
          color: colors.primary,
          marginTop: moderateScale(20),
          marginBottom: moderateScale(10),
        }}>
        Calories Result
      </Text>
      <View style={styles.row}>
        <Text style={{ ...fonts.ResultHead, color: colors.black }}>
          {`Appox. Caloric Intake : `}
        </Text>
        <Text style={{ ...fonts.ResultHead, color: colors.black }}>
          {totalKcal}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ ...fonts.ResultHead, color: colors.black }}>
          {`Required Caloric :`}
        </Text>
        <Text style={{ ...fonts.ResultHead, color: colors.black }}>
          {requiredKcal > totalKcal ? requiredKcal : requiredKcal}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ ...fonts.ResultHead, color: colors.black }}>
          {`Calories Deficit/Surplus :`}
        </Text>
        <Text style={{ ...fonts.ResultHead, color: colors.black }}>
          {requiredKcal - totalKcal}
        </Text>
      </View>

      <View style={styles.symptoms}>
        <Text
          style={{
            ...fonts.subHeadUser2,
            color: colors.primary,
            marginVertical: moderateScale(20),
          }}>
          Calories Intake
        </Text>
        <Text
          style={{
            ...fonts.subHeadUser2,
            color: colors.danger4,
          }}>
          {renderIndication(totalKcal, requiredKcal)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  symptoms: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 80,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
