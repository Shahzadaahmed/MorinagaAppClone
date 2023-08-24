import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { screenWidth } from '../constants/screenResolution';
import { moderateScale } from 'react-native-size-matters';
import { DateTimeHelper } from '../helper';
import InputField from './InputField';
import Button from './Button';
import { usePromotor } from '../context/PromotorContext';

const PromotorBmiForm = ({
  setActiveStep,
  kidData,
  setKidData,
  handleChange,
}) => {
  const { bmi } = usePromotor();

  const calculateBMI = () => {
    const { weight, height } = kidData;

    if (!height || isNaN(height))
      return Alert.alert('Error', 'Please enter a valid height.');

    if (!weight || isNaN(weight))
      return Alert.alert('Error', 'Please enter a valid weight.');

    const heightInInches = (height * 0.393701).toFixed(2);
    const heightInMeters = (height * 0.3048).toFixed(2);
    const weightInPound = weight * 2.2;

    const calculatedBmi = (
      703 *
      (weightInPound / (heightInInches * heightInInches))
    ).toFixed(2);

    setKidData(prev => ({
      ...prev,
      actual_bmi: calculatedBmi,
      actual_height: height,
      actual_weight: weight,
      bmi_indication: renderIndication(calculatedBmi),
    }));

    const kidDob = DateTimeHelper.calculateAge(kidData?.dob);

    const idealBMI = bmi?.find(
      item => item.years === kidDob.years && item.months === kidDob.months,
    );

    if (idealBMI && kidData.gender === 'male')
      setKidData(prev => ({
        ...prev,
        ideal_bmi: idealBMI?.boys_bmi,
        ideal_height: idealBMI?.boys_height,
        ideal_weight: idealBMI?.boys_weight,
      }));
    else if (idealBMI && kidData.gender === 'female')
      setKidData(prev => ({
        ...prev,
        ideal_bmi: idealBMI?.girls_bmi,
        ideal_height: idealBMI?.girls_height,
        ideal_weight: idealBMI?.girls_weight,
      }));

    if (!idealBMI)
      Alert.alert(
        'Hold on!',
        'Ideal BMI data is missing for this specification. Please go back and choose different date of birth.',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
        ],
      );
    else setActiveStep(2);
  };

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
    <View style={styles.container}>
      <InputField
        placeholder={'3.9'}
        value={'Height (Cm)'}
        setInputValue={e => handleChange('height', e)}
        style={styles.inputField}
        inputValue={kidData?.height}
        maxLength={4}
        keyboardType={'decimal-pad'}
      />

      <InputField
        placeholder={'40'}
        value={'Weight (Kilogram)'}
        style={styles.inputField}
        inputValue={kidData?.weight}
        setInputValue={e => handleChange('weight', e)}
        maxLength={4}
        keyboardType={'decimal-pad'}
      />

      <View style={styles.btn}>
        <Button
          text={'Calculate'}
          btnWidth={screenWidth - 80}
          onPress={calculateBMI}
        />
      </View>
    </View>
  );
};

export default PromotorBmiForm;

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    alignSelf: 'center',
    justifyContent: 'center',

    marginTop: 20,
  },
  inputField: {
    width: screenWidth - 80,
    marginBottom: moderateScale(15),
  },
  btn: {
    alignItems: 'center',
    marginBottom: 50,
  },
});
