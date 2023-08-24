import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Block from '../components/Block';
import Header from '../components/Header';
import Button from '../components/Button';
import {Illustration} from '../asset/svg';
import {colors, fonts} from '../constants';

export default function AccountCreated({navigation}) {
  return (
    <Block>
      <Header showArrow={true} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Illustration />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            ...fonts.accCreatedTitle,
            color: colors.rhinoDark,
            marginBottom: 12,
          }}>
          Account Created!
        </Text>
        <Text
          style={{
            ...fonts.accCreatedSubTitle,
            color: colors.rhinoDark2,
            textAlign: 'center',
            marginBottom: 6,
          }}>
          Your Account has been successfully created,
        </Text>
        <Text
          style={{
            ...fonts.accCreatedSubTitle,
            color: colors.rhinoDark2,
            textAlign: 'center',
            marginBottom: 6,
          }}>
          changes are reflected real time.
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          text={'Confirm'}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 18,
  },
});
