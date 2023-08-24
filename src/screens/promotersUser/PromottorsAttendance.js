import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Block, Button } from '../../components';
import { HeaderDashboard } from '../../components';
import { colors, fonts } from '../../constants';
import { screenWidth } from '../../constants/screenResolution';
import { DateTimeHelper } from '../../helper';
import { Attendance, realmContext } from '../../services/realm';
import auth from '@react-native-firebase/auth';

const { useRealm, useQuery } = realmContext;

export default function PromotorsAttendance({ navigation }) {
  const realm = useRealm();
  const attendanceDocs = useQuery(Attendance);

  const [checkInTime, setCheckInTime] = useState('00:00:00');
  const [attendance, setAttendance] = useState();

  // Filter the user's data with checkout value is null
  useEffect(() => {
    const checkIns = attendanceDocs.filtered(
      'user_id == $0 && check_out == $1',
      auth().currentUser.uid,
      null,
    );

    setAttendance(checkIns?.[0]);
  }, [attendanceDocs]);

  // Handle check in time interval to display on screen
  useEffect(() => {
    let timeInterval;

    if (attendance?.check_in) {
      timeInterval = setInterval(
        () => {
          setCheckInTime(
            DateTimeHelper.getTimeDifferenceFromNow(attendance.check_in),
          );
        },

        1000,
      );
    } else {
      clearInterval(timeInterval);
      setCheckInTime('00:00:00');
    }

    return () => clearInterval(timeInterval);
  }, [attendance]);

  // Save check in time to realm db
  const checkIn = useCallback(() => {
    if (attendance?.check_in)
      return Alert.alert('Error', "You've already checked in.");

    realm.write(() => {
      realm.create('Attendance', {
        _id: new Realm.BSON.ObjectID(),
        user_id: auth().currentUser.uid,
        check_in: new Date(),
        created_at: new Date(),
      });
    });

    Alert.alert('Success', "You've checked in successfully!");
  }, [attendance]);

  // Save check out time to realm db
  const checkOut = useCallback(() => {
    if (!attendance?.check_in)
      return Alert.alert('Error', 'Please check in first!');

    realm.write(() => {
      attendance.check_out = new Date();
    });

    Alert.alert('Success', "You've checked out successfully!");
  }, [attendance]);

  return (
    <Block>
      <HeaderDashboard
        text={'Attendance'}
        style={{ marginRight: 110 }}
        style1={{ marginTop: 0 }}
        styleIcon={{ top: 2 }}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        text3={'Hello, Promotors👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('SettingsPromotor')}
      />

      {/* <Text
        style={[
          {
            color: colors.black,
            marginTop: 33,
            marginHorizontal: 43,
            ...fonts.subHeadUser2,
          },
        ]}>
        Attendance
      </Text> */}

      <View style={styles.container}>
        <Text style={{ ...fonts.attendance, color: colors.black }}>
          {checkInTime}
        </Text>
        <Text style={{ ...fonts.attendanceSub, color: colors.attendance }}>
          Calculating Hours
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text={'Check in'}
          textStyle={{ ...fonts.attendanceSub }}
          style={{ ...styles.button }}
          color="#FF0000"
          height={63}
          btnWidth={screenWidth - 70}
          marginHorizontal={40}
          borderRadius={0}
          onPress={checkIn}
        />
        <Button
          text={'Checkout'}
          textStyle={{ ...fonts.attendanceSub }}
          color="#FF0000"
          height={63}
          btnWidth={screenWidth - 70}
          marginHorizontal={40}
          borderRadius={0}
          onPress={checkOut}
        />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: { marginTop: 23 },
  button: {
    marginBottom: 13,
  },
});
