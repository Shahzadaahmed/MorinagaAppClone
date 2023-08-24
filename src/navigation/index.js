import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppNavigator from './AppNavigator';
import PromotorNavigator from './PromotorNavigator';
import AuthNavigator from './AuthNavigator';
import {
  AuthContext,
  LoadingContext,
  PromotorContext,
  TokenContext,
} from '../context';
import { Auth, KcalService, NotificationService } from '../services';
import { Platform } from 'react-native';
import { Loading } from '../components';
import BmiService from '../services/BmiServices';

export default function AppContainer() {
  // Set an initializing state whilst Firebase connects
  const { user, setUser } = AuthContext.useAuth();
  const { loading, setLoading } = LoadingContext.useLoading();
  const {
    setBmi,
    setKcalMale,
    setKcalFemale,
    setFoodItems,
    setFoodCategories,
  } = PromotorContext.usePromotor();

  // Token Contex
  const { setToken } = TokenContext.useToken();

  const setInitToken = token => setToken(token);

  // Handle user state changes
  const onAuthStateChanged = cred => {
    if (cred?.uid) getUserDetails(cred.uid);
    else {
      setUser();
      setLoading(false);
    }
  };

  const getUserDetails = uid => {
    Auth.getUserById(uid)
      .then(userData => {
        setUser(userData);
        initializeNotification(userData?.role);

        if (userData?.role === 'promotor')
          getPromotorData().catch(err => console.log(err));
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const getPromotorData = async () => {
    try {
      const [bmi, foodCategories, foodItems, kcalMale, kcalFemale] =
        await Promise.all([
          BmiService.getAllBmi(),
          KcalService.getCategories(),
          KcalService.getAllFoodItems(),
          KcalService.getKcalMale(),
          KcalService.getKcalFemale(),
        ]);

      setBmi(bmi);
      setFoodCategories(foodCategories);
      setFoodItems(foodItems);
      setKcalMale(kcalMale);
      setKcalFemale(kcalFemale);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);

    GoogleSignin.configure({
      webClientId:
        '343335555154-t0blusvm54b784qmqt6n8nnisr310f1q.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeNotification = role => {
    // Initialize Notifications
    NotificationService.pushNotification(setInitToken, role);

    if (Platform.OS === 'ios') {
      // Notification Setting
      messaging()
        .getToken()
        .then(async iOSToken => {
          NotificationService.handleFCMToken(
            auth().currentUser?.uid,
            iOSToken,
            role,
            setInitToken,
          );
        })
        .catch(err => console.log(err));
    }

    return () => {
      if (Platform.OS === 'ios') {
        messaging().onTokenRefresh(iOSToken => {
          NotificationService.handleFCMToken(
            auth().currentUser?.uid,
            iOSToken,
            setInitToken,
          );
        });
      }
    };
  };

  return (
    <SafeAreaProvider>
      {loading && <Loading />}

      <NavigationContainer>
        {!user ? (
          <AuthNavigator />
        ) : user?.role === 'user' ? (
          <AppNavigator />
        ) : (
          <PromotorNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
