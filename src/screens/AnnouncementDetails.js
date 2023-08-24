import { StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Block, HeaderDashboard } from '../components';
import { colors, fonts } from '../constants';
import { DateTimeHelper } from '../helper';
import { AuthContext } from '../context';

export default function AnnouncementDetails({ navigation, route }) {
  const { user } = AuthContext.useAuth();
  const { item } = route?.params || {};

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const backAction = () => {
    navigation.navigate('Announcements');
    return true;
  };

  const handleSettingPress = () => {
    {
      user?.role == 'promotor'
        ? navigation.navigate('SettingsPromotor')
        : navigation.navigate('Settings');
    }
    return true;
  };

  return (
    <Block>
      <HeaderDashboard
        text={'Announcement Details'}
        style={{ marginRight: 40 }}
        style1={{ marginTop: 0 }}
        styleIcon={{ marginTop: 3 }}
        showIcon={true}
        showText={true}
        text1={'Fill the nutrition gap'}
        text2={'Heathly'}
        text3={'Hello 👋'}
        onBackPress={backAction}
        settingPress={handleSettingPress}
      />
      <View style={styles.container}>
        <Text style={{ ...fonts.annoucementText1, color: colors.danger }}>
          {item?.heading}
        </Text>
        <Text style={{ ...fonts.annoucementText, color: colors.darkGrey }}>
          {`Date: ${DateTimeHelper.announcementDateFormater(item?.created_at)}`}
        </Text>
      </View>
      <Text style={styles.description}>{item?.description}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
    marginBottom: 20,
  },
  description: {
    color: colors.black,
    marginHorizontal: 50,
    ...fonts.annoucementDescription,
  },
});
