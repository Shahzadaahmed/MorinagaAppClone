import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, BackHandler } from 'react-native';
import { Block, HeaderDashboard } from '../components';
import { colors, fonts } from '../constants';
import Product from '../components/Product';
import { AuthContext, LoadingContext } from '../context';
import { AnnouncementService } from '../services';

export default function Announcements({ navigation }) {
  // context
  const { user } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [annoucements, setAnnouncements] = useState([]);

  useEffect(() => {
    setLoading(true);
    AnnouncementService.getAnnouncements(user?.role)
      .then(res => {
        setAnnouncements(res), console.log(res);
      })
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  }, [user?.role, setLoading]);

  // useEffect(() => {
  //   const backAction = () => {
  //     {
  //       user?.role == 'promotor'
  //         ? navigation.navigate('SettingsPromotor')
  //         : navigation.navigate('Settings');
  //     }
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);

  const backAction = () => {
    {
      navigation.goBack();
      // user?.role == 'promotor'
      //   ? navigation.navigate('SettingsPromotor')
      //   : navigation.navigate('Settings');
    }
    return true;
  };

  const settingAction = () => {
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
        text={'Announcement'}
        style={{ marginRight: 80 }}
        style1={{ marginTop: 0 }}
        showIcon={true}
        showText={true}
        styleIcon={{ marginTop: 3 }}
        text1={'Fill the Nutrition Gap'}
        text2={'Heathly'}
        text3={'Hello, Promotors👋'}
        onBackPress={backAction}
        settingPress={settingAction}
      />
      <Text style={{ ...styles.text, ...fonts.annoucement }}>Newest</Text>

      {annoucements?.map((item, index) => (
        <Product
          key={index}
          item={item}
          onPress={() => navigation.navigate('AnnouncementDetails', { item })}
        />
      ))}
    </Block>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.annoucement,
    marginTop: 24,
    marginHorizontal: 41,
    marginBottom: 18,
  },
});
