import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './InputField';
import Button from './Button';
import { screenWidth } from '../constants/screenResolution';
import { moderateScale } from 'react-native-size-matters';
import { colors, fonts } from '../constants';
import {
  CheckedRedSvg,
  HeartFill,
  HeartStroke,
  UncheckedBlackSvg,
} from '../asset/svg';
import { realmContext } from '../services/realm';
import { Realm } from '@realm/react';
import auth from '@react-native-firebase/auth';
import ResultBMI from './ResultBMI';
import ResultKcal from './ResultKcal';

const { useRealm } = realmContext;

const PromotorFeedbackForm = ({ onNext, kidData, resetKidData }) => {
  const realm = useRealm();

  const [note, setNote] = useState('');
  const [assessment, setAssessment] = useState(false);
  const [assessment2, setAssessment2] = useState(false);

  const saveFeedback = () => {
    realm.write(() => {
      realm.create('KidsProfiles', {
        _id: new Realm.BSON.ObjectID(),
        uid: auth().currentUser.uid,
        created_at: new Date(),
        name: kidData?.kidName,
        parent_name: kidData?.parentName,
        area: kidData?.area,
        dob: kidData?.dob,
        city: kidData?.city,
        gender: kidData?.gender,
        mobile_no: kidData?.mobileNo,
        actual_bmi: kidData?.actual_bmi,
        actual_height: kidData?.actual_height,
        actual_weight: kidData?.actual_weight,
        ideal_bmi: kidData?.ideal_bmi,
        ideal_height: kidData?.ideal_height,
        ideal_weight: kidData?.ideal_weight,
        bmi_indication: kidData?.bmi_indication,
        kcal_intake: kidData?.kcal_intake,
        kcal_required: kidData?.kcal_required,
        kcal_indication: kidData?.kcal_indication,
        note,
        assessment_1: assessment,
        assessment_2: assessment2,
      });
    });

    Alert.alert('Success', 'Kid data has been saved successfully.');

    resetKidData();
    setNote('');
    setAssessment();
    setAssessment2();
    onNext();
  };

  return (
    <>
      <ResultBMI
        actualHeight={kidData?.actual_height}
        actualWeight={kidData?.actual_weight}
        actualBMI={kidData?.actual_bmi}
        idealHeight={kidData?.ideal_height}
        idealWeight={kidData?.ideal_weight}
        idealBMI={kidData?.ideal_bmi}
      />

      <View style={styles.line} />

      <ResultKcal
        totalKcal={kidData?.kcal_intake}
        requiredKcal={kidData?.kcal_required}
      />

      <View style={styles.line} />

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.checkBoxTitle}>Sample Against Assessment:</Text>

          <View style={styles.checkBoxes}>
            <TouchableOpacity
              onPress={() => setAssessment(prev => !prev)}
              style={{ marginRight: 20 }}>
              {assessment ? <CheckedRedSvg /> : <UncheckedBlackSvg />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAssessment2(prev => !prev)}>
              {assessment2 ? <CheckedRedSvg /> : <UncheckedBlackSvg />}
            </TouchableOpacity>
          </View>
        </View>

        <InputField
          placeholder="Any Note"
          value="Note to remember:"
          setInputValue={setNote}
          style={styles.inputField}
          titleStyle={styles.titleStyle}
          placeHolderStyle={styles.placeHolderStyle}
          multiline={true}
          numberOfLines={10}
          inputValue={note}
        />
        <View style={styles.btn}>
          <Button
            btnWidth={screenWidth - 80}
            text={'Save &  Close'}
            onPress={saveFeedback}
          />
        </View>
      </View>
    </>
  );
};

export default PromotorFeedbackForm;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
  },
  btn: {
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  inputField: {
    height: 192,
    width: screenWidth - 80,
    marginHorizontal: 0,
  },

  titleStyle: {
    top: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  checkBoxTitle: {
    ...fonts.inputHead,
    color: colors.black,
    fontSize: 14,
    marginRight: 'auto',
  },
  checkBoxes: { flexDirection: 'row', alignItems: 'center' },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 44,
  },
  placeHolderStyle: {
    paddingVertical: 40,
    textAlignVertical: 'top',
  },
});
