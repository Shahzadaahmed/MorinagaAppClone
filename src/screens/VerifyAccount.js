import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Block from '../components/Block';
import Header from '../components/Header';
import {colors, fonts} from '../constants';
import {VerifcationText} from '../components';
import FooterText from '../components/FooterText';
import Button from '../components/Button';

export default function VerifyAccount({navigation}) {
  const refs = useRef([]);

  const handleTextChange = index => {
    if (index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    } else {
      navigation.navigate('AccountCreated');
    }
  };

  const handlePrevTextChange = index => {
    if (index > 0) {
      refs.current[index - 1].focus();
    }
  };

  return (
    <Block>
      <Header showArrow={true} onPress={() => navigation.goBack()} />
      <View style={styles.textContainer}>
        <Text style={{...fonts.tittle, color: colors.darkBlue}}>
          Verification
        </Text>
        <Text
          style={{...fonts.forgetPasswordSubTitle, color: colors.description}}>
          We have sent code to your email
        </Text>
        <View style={styles.row}>
          <Text
            style={{
              ...fonts.forgetPasswordSubTitle,
              color: colors.description,
            }}>
            address{' '}
          </Text>
          <Text style={{...fonts.forgetPasswordSubTitle, color: colors.danger}}>
            email@abc.com
          </Text>
        </View>
      </View>
      <View style={styles.verificationText}>
        {[0, 1, 2, 3].map(index => (
          <VerifcationText
            key={index}
            ref={ref => (refs.current[index] = ref)}
            onNext={() => handleTextChange(index)}
            onPrev={() => handlePrevTextChange(index)}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <FooterText
          text={"Didn't receive code?"}
          text1={'Resend'}
          textStyle={{...fonts.resendText, color: colors.forgetDescription}}
          textStyle1={{...fonts.resendText, color: colors.danger}}
        />
      </View>
      <Button
        text={'Verify'}
        onPress={() => navigation.navigate('AccountCreated')}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 34,
  },
  row: {
    flexDirection: 'row',
  },
  verificationText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 45,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
