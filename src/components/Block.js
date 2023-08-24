import React from 'react';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { colors } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Block = ({ children, withoutScroll }) => {
  return (
    <SafeAreaView style={styles.container}>
      {withoutScroll ? (
        <View style={styles.container}>{children}</View>
      ) : (
        <KeyboardAwareScrollView
          nestedScrollEnabled
          enableOnAndroid
          extraHeight={20}
          extraScrollHeight={0}
          style={styles.scrollStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default Block;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollStyle: {
    flex: 1,
  },
});
