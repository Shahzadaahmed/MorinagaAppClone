import React, { useState, useEffect } from 'react';
import {
  Block,
  PromotorAddKidProfile,
  PromotorBmiForm,
  PromotorFeedbackForm,
  PromotorKcalForm,
  HeaderDashboard,
} from '../../components';
import Steps from '../../components/Steps';
import { BackHandler, View } from 'react-native';
import { colors } from '../../constants';

export default function Promotors({ navigation, route }) {
  //params
  // const { gotoDashbaord } = false;
  //route?.params || {};
  // states
  const [activeStep, setActiveStep] = useState(0);
  const [kidData, setKidData] = useState({});

  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (key, value) =>
    setKidData(prev => ({ ...prev, [key]: value }));

  const resetKidData = () => {
    setSelectedItems([]);
    setKidData({});
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [activeStep, backAction]);

  const backAction = () => {
    if (activeStep) setActiveStep(prev => prev - 1);
    else navigation.goBack();
    return true;
  };

  const stepsContent = [
    <PromotorAddKidProfile
      setActiveStep={setActiveStep}
      kidData={kidData}
      handleChange={handleChange}
    />,
    <PromotorBmiForm
      setActiveStep={setActiveStep}
      kidData={kidData}
      setKidData={setKidData}
      handleChange={handleChange}
    />,
    <PromotorKcalForm
      setActiveStep={setActiveStep}
      kidData={kidData}
      setKidData={setKidData}
      handleChange={handleChange}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
    />,

    <PromotorFeedbackForm
      kidData={kidData}
      handleChange={handleChange}
      resetKidData={resetKidData}
      onNext={() => {
        setActiveStep(0);
        navigation.navigate('PromotorsUsersKidsProfileList', {
          gotoDashbaord: true,
        });
      }}
    />,
  ];

  return (
    <View
      flex={1}
      style={{
        backgroundColor: colors.white,
      }}>
      <HeaderDashboard
        text={'Kids Profiles'}
        text2={'Heathly'}
        showIcon={true}
        showText={true}
        styleIcon={{ marginTop: 3 }}
        text1={'Fill the Nutrition Gap'}
        text3={'Hello 👋'}
        onBackPress={backAction}
        settingPress={() => navigation.navigate('SettingsPromotor')}
      />

      <Steps activeStep={activeStep} />
      <View style={{ height: 10, backgroundColor: colors.border }} />

      <Block withoutScroll={stepsContent === 0}>
        {stepsContent[activeStep]}

        <View style={{ height: 50 }} />
      </Block>
    </View>
  );
}
