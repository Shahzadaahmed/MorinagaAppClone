import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { screenWidth } from '../../constants/screenResolution';
import { Block, HeaderDashboard, ToggleBMIKcal } from '../../components';
import {
  FireSvgOrange,
  FireSvgRed,
  UserAvatarGreen,
  AvatarSvg1,
  AvatarSvg3,
  BMISvg,
} from '../../asset/svg';
import { colors, fonts } from '../../constants';
import { BmiServices, KcalService } from '../../services';
import { DateTimeHelper } from '../../helper';
import { LoadingContext } from '../../context';

const BMIKCalLog = ({ navigation, route }) => {
  // context
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [dataBmi, setDataBmi] = useState([]);
  const [dataKcal, setDataKcal] = useState([]);
  const [activeTab, setActiveTab] = useState('BMI');
  const { item } = route?.params || {};

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  const getBmiData = () => {
    setLoading(true);

    BmiServices.getBmiData({ kid_id: item?.id })
      .then(res => setDataBmi(res))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };

  const getKcalData = () => {
    setLoading(true);

    KcalService.getKcalData({ kid_id: item?.id })
      .then(res => setDataKcal(res))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (activeTab === 'BMI') {
      getBmiData();
    } else {
      getKcalData();
    }
  }, [activeTab, item]);

  const renderItem = ({ item }) => {
    let created_at = DateTimeHelper.getTimeDifference(item?.created_at);
    if (activeTab === 'Kcal') {
      return (
        <View style={{ marginTop: moderateScale(20) }}>
          <Text
            style={{
              ...fonts.ResultHead2,
              color: colors.primary,
              marginLeft: moderateScale(10),
            }}>
            {created_at}
          </Text>
          <View style={styles.dateList}>
            <View style={styles.flexDate}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{ marginRight: moderateScale(10) }}>
                  <FireSvgRed />
                </View>
                <View>
                  <Text style={{ ...fonts.ResultHead2, color: colors.primary }}>
                    Kcal Intake
                  </Text>
                  <Text style={{ ...fonts.subHeadUser, color: colors.grey5 }}>
                    {item?.kcal_indication}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ ...fonts.ResultHead2, color: colors.primary }}>
                  {`${item?.kcal_intake} kcal`}
                </Text>
                <Text
                  style={{
                    ...fonts.subHeadUser,
                    color: colors.grey5,
                  }}>
                  <FireSvgOrange /> {`${item?.kcal_required} kcal`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (activeTab === 'BMI') {
      return (
        <View style={{ marginTop: moderateScale(20) }}>
          <Text
            style={{
              ...fonts.ResultHead2,
              color: colors.primary,
              marginLeft: moderateScale(10),
            }}>
            {created_at}
          </Text>
          <View style={styles.dateList}>
            <View style={styles.flexDate}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{ marginRight: moderateScale(10) }}>
                  <BMISvg />
                </View>
                <View>
                  <Text style={{ ...fonts.ResultHead2, color: colors.primary }}>
                    BMI
                  </Text>
                  <Text style={{ ...fonts.subHeadUser, color: colors.grey5 }}>
                    BMI is {item?.bmi_indication}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ ...fonts.ResultHead2, color: colors.primary }}>
                  {item?.calculated_bmi}
                </Text>
                <Text
                  style={{
                    ...fonts.subHeadUser,
                    color: colors.grey5,
                  }}>
                  {item?.ideal_bmi}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <Block withoutScroll={true}>
      <HeaderDashboard
        text={'Kids Profile'}
        style={{ marginRight: 120 }}
        style1={{ marginTop: 0 }}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello 👋'}
        onBackPress={() =>
          navigation.navigate('KidsProfileList', { gotoProfileList: true })
        }
        settingPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          {item?.user_img ? (
            <Image source={{ uri: item?.user_img }} style={styles.avatar} />
          ) : item?.gender !== 'male' ? (
            <AvatarSvg1 />
          ) : (
            <AvatarSvg3 />
          )}
          <Text
            style={{
              ...fonts.log,
              color: colors.primary,
              marginLeft: moderateScale(20),
            }}>
            {item?.name}
          </Text>
        </View>
        <ToggleBMIKcal onSelectTab={handleTabPress} activeTab={activeTab} />
        <FlatList
          data={activeTab === 'BMI' ? dataBmi : dataKcal}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    alignSelf: 'center',
    flex: 1,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(30),
  },
  flexDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateList: {
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 36,
    marginTop: moderateScale(10),
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
});
export default BMIKCalLog;
