import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Block from '../components/Block';
import Header from '../components/Header';
import { colors, fonts } from '../constants';
import SendBox from '../components/SendBox';
import FooterText from '../components/FooterText';
import { Auth } from '../services';
import { LoadingContext } from '../context';
import { FirebaseAuthErrors } from '../helper';

export default function ForgetPassword({ navigation, route }) {
  const email = route?.params?.email;
  const { setLoading } = LoadingContext.useLoading();

  const onForget = () => {
    setLoading(true);

    Auth.forgetPassword(email)
      .then(res => Alert.alert('Success', 'Email sent successfully'))
      .catch(err => Alert.alert('Error', FirebaseAuthErrors[err.code]))
      .finally(() => setLoading(false));
  };
  return (
    <Block>
      <Header showArrow={true} onPress={() => navigation.goBack()} />
      <View style={styles.textContainer}>
        <Text style={{ ...fonts.tittle, color: colors.forgetText }}>
          Forgot password
        </Text>
        <Text
          style={{
            ...fonts.forgetPasswordSubTitle,
            color: colors.forgetDescription,
            textAlign: 'center',
          }}>
          Please select option to send link reset
        </Text>
        <Text
          style={{
            ...fonts.forgetPasswordSubTitle,
            color: colors.forgetDescription,
            textAlign: 'center',
          }}>
          password
        </Text>
      </View>
      <SendBox onPress={onForget} />
      <View style={styles.row}>
        <FooterText
          text={"Did'n't receive link?"}
          text1={'Resend Link'}
          textStyle={{ ...fonts.resendText, color: colors.forgetDescription }}
          textStyle1={{ ...fonts.resendText, color: colors.danger }}
          onPress={() => onForget()}
        />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 40,
    marginTop: 22,
  },
});
