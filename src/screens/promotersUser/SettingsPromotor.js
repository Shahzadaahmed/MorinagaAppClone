import { Alert, StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Block, Header, AccountSetting, CustomToggler } from '../../components';
import { colors, fonts } from '../../constants';
import {
  AddUser,
  ArrowRight,
  Logout,
  Notification,
  Sync,
} from '../../asset/svg';
import { AuthContext, LoadingContext, TokenContext } from '../../context';
import { Auth } from '../../services';
import { syncData } from '../../services/SyncService';

export default function SettingsPromotor({ navigation }) {
  // context
  const { setUser } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();
  const { token } = TokenContext.useToken();

  const onLogout = () => {
    setLoading(true);


    Auth.signOut(token)
      .then(() => setUser)
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const backAction = () => {
    navigation.goBack();
    // navigation.navigate('DashboardPromotorTabs');
    return true;
  };

  return (
    <Block withoutScroll={false}>
      <Header showArrow={true} onPress={backAction} />
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<Notification width={24} height={24} />}
            iconRight={<CustomToggler />}
            text={'Notification'}
          />
        </View>
        <View style={styles.lineTextContainer}>
          <View style={styles.line} />
        </View>
        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<AddUser width={24} height={24} />}
            iconRight={<ArrowRight width={24} height={24} />}
            text={'Announcements'}
            onPress={() => navigation.navigate('Announcements')}
          />
        </View>
        <View style={styles.lineTextContainer}>
          <View style={styles.line} />
        </View>
        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<AddUser width={24} height={24} />}
            iconRight={<ArrowRight width={24} height={24} />}
            text={'FAQs'}
            onPress={() => navigation.navigate('FAQ')}
          />
        </View>
        <View style={styles.lineTextContainer}>
          <View style={styles.line} />
        </View>
        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<Sync width={24} height={24} />}
            text={'Syncronise data'}
            onPress={() => {
              setLoading(true);
              syncData()
                .then(message => {
                  Alert.alert('Data Synced', message);
                })
                .catch(err => {
                  console.log(err);
                  Alert.alert('Error', err.message);
                })
                .finally(_ => setLoading(false));
            }}
          />
        </View>
      </View>

      <View style={styles.seperaterLine}>
        <View style={styles.line1} />
      </View>
      <View style={styles.accountSetting}>
        <AccountSetting
          icon={<Logout width={24} height={24} />}
          text={'Logout'}
          onPress={onLogout}
        />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 30,
  },
  lineTextContainer: {
    paddingHorizontal: 44,
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.silver,
  },
  accountSetting: {
    marginBottom: 24,
  },
  seperaterLine: {
    paddingHorizontal: 25,
    marginBottom: 40,
  },
  line1: {
    flex: 1,
    height: 6,
    backgroundColor: colors.darkWhite,
  },
  heading: {
    ...fonts.account,
    color: colors.forgetDescription,
    marginHorizontal: 44,
    marginBottom: 24,
  },
});
