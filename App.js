import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContainer from './src/navigation';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { colors } from './src/constants';
import { realmContext } from './src/services/realm';
const { RealmProvider } = realmContext;
import {
  AuthContext,
  LoadingContext,
  PromotorContext,
  TokenContext,
} from './src/context';

const IosStatusBar = ({ backgroundColor, ...props }) => (
  <SafeAreaView
    style={{
      backgroundColor,
      height: StatusBar.currentHeight,
    }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </SafeAreaView>
);

export default function App() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('I did it!');
  //   }, 3000);
  // }, []);

  return (
    <SafeAreaProvider>
      {/* custom status bar */}
      {Platform.OS === 'ios' ? (
        <IosStatusBar backgroundColor={colors.danger} barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor={colors.danger} barStyle="dark-content" />
      )}

      <LoadingContext.LoadingProvider>
        <AuthContext.AuthProvider>
          <PromotorContext.PromotorProvider>
            <TokenContext.TokenProvider>
              <RealmProvider>
                <AppContainer />
              </RealmProvider>
            </TokenContext.TokenProvider>
          </PromotorContext.PromotorProvider>
        </AuthContext.AuthProvider>
      </LoadingContext.LoadingProvider>
    </SafeAreaProvider>
  );
}
