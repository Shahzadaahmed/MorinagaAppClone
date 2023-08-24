import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { screenWidth } from '../../constants/screenResolution';
import { Block, HeaderDashboard } from '../../components';
import {
  FireSvgOrange,
  FireSvgRed,
  UserAvatarGreen,
  BMISvg,
  AvatarSvg1,
} from '../../asset/svg';
import { colors, fonts } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import ToggleBMIKcal from '../../components/ToggleBMIKcal';
import moment from 'moment';

const PromotorBMIKCalLog = ({ navigation, route }) => {
  const { kid } = route.params || {};

  const [activeTab, setActiveTab] = useState('BMI');

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  const renderItem = ({ item }) => {
    if (activeTab === 'Kcal') {
      return (
        <View style={{ marginTop: moderateScale(20) }}>
          <Text
            style={{
              ...fonts.ResultHead2,
              color: colors.primary,
              marginLeft: moderateScale(10),
            }}>
            {moment(item?.created_at).format('MMM DD, YYYY')}
          </Text>
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
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ ...fonts.ResultHead2, color: colors.primary }}>
                {item?.kcal_intake} kcal
              </Text>
              <Text
                style={{
                  ...fonts.subHeadUser,
                  color: colors.grey5,
                }}>
                <FireSvgOrange /> {item?.kcal_required} kcal
              </Text>
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
            {moment(item?.created_at).format('MMM DD, YYYY')}
          </Text>
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
                  {item?.bmi_indication}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  ...fonts.ResultHead2,
                  color: colors.primary,
                }}>
                {item?.actual_bmi}
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
        text3={'Hello, Sander👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('SettingsPromotor')}
      />
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          {kid?.gender === 'male' ? <UserAvatarGreen /> : <AvatarSvg1 />}
          <Text
            style={{
              ...fonts.log,
              color: colors.primary,
              marginLeft: moderateScale(20),
            }}>
            {kid?.name}
          </Text>
        </View>
        <ToggleBMIKcal onSelectTab={handleTabPress} activeTab={activeTab} />
        <FlatList
          data={[kid]}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
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
    padding: moderateScale(12),
    paddingRight: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 36,
    marginTop: moderateScale(10),
  },
});
export default PromotorBMIKCalLog;
