import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StepsBMI, StepsKCAL, StepsProfile } from '../asset/svg';
import { colors, fonts } from '../constants';

const steps = [
  { name: 'Profile', icon: <StepsProfile width={11} height={14} /> },
  { name: 'BMI', icon: <StepsBMI width={26} height={26} /> },
  { name: 'Kcal', icon: <StepsKCAL width={24} height={24} /> },
  { name: 'Results', icon: <StepsProfile width={11} height={14} /> },
];

export default function Steps({ activeStep }) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.icon,
            activeStep === index && styles.activeIcon,
            index !== steps.length - 1 && styles.iconWithLine,
          ]}>
          {step.icon}
          <Text style={styles.stepName}>{step.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 30,
  },
  line: {
    width: '70%',
    height: 2,
    backgroundColor: colors.darkGrey,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -1 }],
    zIndex: -1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGrey,
    zIndex: 1,
  },
  activeIcon: {
    backgroundColor: colors.danger,
  },
  iconWithLine: {
    position: 'relative',
  },
  stepName: {
    position: 'absolute',
    bottom: -22,
    flex: 1,
    width: '180%',
    textAlign: 'center',
    ...fonts.topNav,
    color: colors.black,
  },
});
