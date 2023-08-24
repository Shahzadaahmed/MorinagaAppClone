import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Block from '../components/Block';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { colors, fonts } from '../constants';
import { ActiveStar, InActiveStar } from '../asset/svg';

export default function FeedBack({ navigation }) {
  const [starCount, setStarCount] = useState(0);
  const Data = [1, 2, 3, 4, 5];
  const handleStarPress = count => {
    setStarCount(count);
  };

  return (
    <Block withoutScroll={false}>
      <Header showArrow={true} onPress={() => navigation.goBack()} />
      <View style={styles.textContainer}>
        <Text style={{ ...fonts.tittle, color: colors.darkBlue }}>
          Help us Improve!!
        </Text>
        <Text style={{ ...fonts.subTitle, color: colors.description }}>
          How is your experience with Renie
        </Text>
        <Text style={{ ...fonts.subTitle, color: colors.description }}>
          App
        </Text>
        <Text style={{ ...fonts.feedBack, marginTop: 27, color: colors.black }}>
          What's your feedback about
        </Text>
        <Text style={{ ...fonts.feedBack, color: colors.black }}>
          our customer support?
        </Text>
      </View>
      <View style={styles.rowIcon}>
        {Data.map(index => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
            {index <= starCount ? (
              <ActiveStar width={46} height={46} />
            ) : (
              <InActiveStar width={46} height={46} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.rowText}>
        <Text style={{ ...fonts.subTitle, color: colors.description }}>
          Hated it!
        </Text>
        <Text style={{ ...fonts.subTitle, color: colors.description }}>
          Loved it!
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField placeholder="Website Issue" value={'Subject'} />
        <InputField
          placeholder="Website Issue"
          value={'Other'}
          style={styles.inputField}
          placeHolderStyle={styles.placeHolder}
          titleStyle={styles.titleStyle}
        />
      </View>
      <View style={styles.button}>
        <Button text={'Send'} />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
    marginBottom: 27,
  },
  rowIcon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 70,
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 18,
  },
  inputField: {
    marginTop: 18,
    height: 192,
  },
  placeHolder: {
    marginBottom: 90,
  },
  titleStyle: {
    top: 10,
  },
  button: {
    marginVertical: 15,
  },
  container: {
    flex: 1,
  },
});
