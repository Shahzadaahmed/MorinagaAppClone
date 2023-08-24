import { Alert, StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Block, Header, AccountSetting, CustomToggler } from '../components';
import { colors, fonts } from '../constants';
import {
  AddUser,
  ArrowRight,
  EditUser,
  Lock,
  Logout,
  Notification,
  FireSvg,
} from '../asset/svg';
import { Auth } from '../services';
import { AuthContext, LoadingContext, TokenContext } from '../context';

export default function Settings({ navigation }) {
  // context
  const { setUser } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();
  const { token } = TokenContext.useToken();

  const onLogout = () => {
    setLoading(true);

    Auth.signOut(token)
      .then(() => setUser())
      .catch(err => Alert.alert('Error', err.message))
      .finally(() => setLoading(false));
  };

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);

  const backAction = () => {
    navigation.goBack();
    // navigation.navigate('DashboardUserTabs');
    return true;
  };

  return (
    <Block withoutScroll={false}>
      <Header showArrow={true} onPress={backAction} />
      <Text style={styles.heading}>Account</Text>
      <AccountSetting
        icon={<EditUser width={24} height={24} />}
        iconRight={<ArrowRight width={24} height={24} />}
        text={'Edit Profile'}
        onPress={() => navigation.navigate('EditProfile')}
      />
      <View style={styles.container}>
        <Text style={styles.heading2}>General</Text>
        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<Notification width={24} height={24} />}
            iconRight={<CustomToggler />}
            text={'Notification'}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<AddUser width={24} height={24} />}
            iconRight={<ArrowRight width={24} height={24} />}
            text={'Change Password'}
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<AddUser width={24} height={24} />}
            iconRight={<ArrowRight width={24} height={24} />}
            text={'Terms & Conditions'}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<Lock width={24} height={24} />}
            iconRight={<ArrowRight width={24} height={24} />}
            text={'Privacy'}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.accountSetting}>
          <AccountSetting
            icon={<FireSvg width={24} height={24} />}
            iconRight={<ArrowRight width={24} height={24} />}
            text={'FAQs'}
            onPress={() => navigation.navigate('FAQ')}
          />
        </View>
      </View>

      <View style={styles.separator} />

      <View style={{ marginBottom: 50 }}>
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
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.silver,
    marginHorizontal: 44,
    marginBottom: 24,
  },
  accountSetting: {
    marginBottom: 24,
  },
  separator: {
    flex: 1,
    height: 6,
    backgroundColor: colors.darkWhite,
    marginHorizontal: 25,
    marginBottom: 40,
  },
  heading: {
    ...fonts.account,
    color: colors.forgetDescription,
    marginHorizontal: 44,
    marginTop: 17,
    marginBottom: 24,
  },
  heading2: {
    ...fonts.account,
    color: colors.forgetDescription,
    marginHorizontal: 44,
    marginBottom: 24,
  },
});
