import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../../components/HeaderDashboard';
import { colors, fonts } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import { screenWidth } from '../../constants/screenResolution';
import { Block, Button, InputField } from '../../components';
import ResultBMI from '../../components/ResultBMI';
import ElementDropDown from '../../components/ElementDropDown';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext, LoadingContext } from '../../context';
import { KidsService } from '../../services';
import { DateTimeHelper } from '../../helper';
import BmiService from '../../services/BmiServices';

const KidsBMICalculate = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { user } = AuthContext.useAuth();
  const { setLoading, loading } = LoadingContext.useLoading();
  const [dropDownValue, setDropDownValue] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [idealWeight, setIdealWeight] = useState('');
  const [idealHeight, setIdealHeight] = useState('');
  const [idealBmi, setIdealBmi] = useState(null);
  const [gender, setGender] = useState('');
  const [kidAge, setKidAge] = useState(null);
  const [heightInInch, setHeightInInch] = useState();
  const [weightKg, setWeightKg] = useState();

  const uid = user?.uid;
  const [data, setData] = useState([]);

  const getKidsList = () => {
    setLoading(true);
    KidsService.getKidsById({ uid })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.log(err, 'Did not get data');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getKidsList();
  }, [isFocused]);

  const calculateBMI = () => {
    const isValidHeight = isNaN(height);
    const isValidWeight = isNaN(weight);

    if (!height || !weight || !dropDownValue?.id) {
      return Alert.alert('Error', 'Please enter all fields');
    }
    if (isValidHeight) {
      return Alert.alert('Error', 'Please input the valid height.');
    }
    if (isValidWeight) {
      return Alert.alert('Error', 'Please input the valid weight.');
    }

    setLoading(true);

    // const heightParts = height.split('.');
    // const feet = parseInt(heightParts[0]) || 0;
    // const inches = parseInt(heightParts[1]) || 0;
    // const heightInMeters = ((feet * 12 + inches) * 0.0254).toFixed(2);
    // const weightInKg = parseInt(weight);
    // const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);

    const heightInInches = (height * 0.393701).toFixed(2);
    const heightInMeters = (height * 0.3048).toFixed(2);
    const weightInPound = (weight * 2.2).toFixed(2);

    setHeightInInch(height);
    setWeightKg(weight);

    const calculatedBmi = (
      703 *
      (weightInPound / (heightInInches * heightInInches))
    ).toFixed(2);

    setBmiResult(calculatedBmi);

    BmiService.getIdealBmi(kidAge)
      .then(res => {
        res?.map(item => {
          if (gender === 'male') {
            setIdealBmi(item?.boys_bmi);
            setIdealHeight(item?.boys_height);
            setIdealWeight(item?.boys_weight);
          } else if (gender === 'female') {
            setIdealBmi(item?.girls_bmi);
            setIdealHeight(item?.girls_height);
            setIdealWeight(item?.girls_weight);
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const onSaveBmi = () => {
    if (
      !idealBmi ||
      !bmiResult ||
      !dropDownValue?.id ||
      !renderIndication(bmiResult)
    )
      return Alert.alert('Error', 'Please calculate the BMI to save it.');

    setLoading(true);

    BmiService.saveBmiData({
      ideal_bmi: idealBmi,
      bmi_indication: renderIndication(bmiResult),
      calculated_bmi: bmiResult,
      kid_id: dropDownValue?.id,
    })
      .then(() =>
        navigation.navigate('KidsProfileList', { gotoProfileList: true }),
      )
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  };

  const onSaveBmiAndNext = () => {
    if (
      !idealBmi ||
      !bmiResult ||
      !dropDownValue?.id ||
      !renderIndication(bmiResult)
    )
      return Alert.alert('Error', 'Please calculate the BMI to go next.');

    setLoading(true);

    BmiService.saveBmiData({
      ideal_bmi: idealBmi,
      bmi_indication: renderIndication(bmiResult),
      calculated_bmi: bmiResult,
      kid_id: dropDownValue?.id,
    })
      .then(() => navigation.navigate('KIdsKCalCalculate'))
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
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

  const handleChangeWeight = text => {
    setWeight(text);
  };
  const handleChangeHeight = text => {
    setHeight(text);
  };

  return (
    <Block>
      <HeaderDashboard
        text={'BMI Calculate'}
        style={{ marginRight: 90 }}
        style1={{ marginTop: 30 }}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello 👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <Text
          style={{
            ...fonts.subHeadUser2,
            color: colors.primary,
            marginTop: moderateScale(20),
          }}>
          BMI Calculator
        </Text>
        <View style={{ alignItems: 'center' }}>
          <ElementDropDown
            data={data}
            showDropDownSearch={true}
            height={55}
            value={dropDownValue}
            placeholder={'Select Kids'}
            labelField={'name'}
            valueField={'name'}
            setValue={e => {
              setDropDownValue(e);
              setKidAge(DateTimeHelper.firebaseDateCalculateAge(e?.dob));
              setGender(e.gender);
            }}
          />

          <InputField
            keyboardType={'decimal-pad'}
            maxLength={4}
            inputValue={height}
            setInputValue={handleChangeHeight}
            placeholder={'3.9'}
            value={'Height (cm)'}
            style={styles.inputField}
          />

          <InputField
            keyboardType={'decimal-pad'}
            maxLength={4}
            inputValue={weight}
            setInputValue={handleChangeWeight}
            placeholder={'40'}
            value={'Weight (Kilogram)'}
            style={styles.inputField}
          />

          <Button
            text={'Calculate BMI'}
            btnWidth={screenWidth - 80}
            onPress={calculateBMI}
            style={{ marginTop: moderateScale(20) }}
          />
        </View>

        <ResultBMI
          actualHeight={heightInInch}
          actualWeight={weightKg}
          actualBMI={bmiResult}
          idealBMI={idealBmi}
          idealHeight={idealHeight}
          idealWeight={idealWeight}
          marginHorizontal={1}
          marginLeft={1}
        />
        <View style={{ alignItems: 'center' }}>
          <Button
            text={'Save'}
            btnWidth={screenWidth - 80}
            onPress={onSaveBmi}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: moderateScale(20),
            marginBottom: moderateScale(40),
          }}>
          <Button
            text={'Next for Kcal Check'}
            btnWidth={screenWidth - 80}
            color={colors.lightBlack}
            onPress={onSaveBmiAndNext}
          />
        </View>
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputField: {
    width: screenWidth - 80,
    marginTop: moderateScale(20),
  },
});
export default KidsBMICalculate;
