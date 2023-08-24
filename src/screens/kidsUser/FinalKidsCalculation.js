import { View, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Block, Button, HeaderDashboard, InputField } from '../../components';
import { screenWidth } from '../../constants/screenResolution';
import { moderateScale } from 'react-native-size-matters';
import { AuthContext, LoadingContext } from '../../context';
import { KidsService } from '../../services';

const FinalKidsCalculation = ({ navigation, route }) => {
  // context
  const { user } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // params
  const { item, kcal_docId } = route?.params || {};

  // states
  const [feedback, setFeedback] = useState();
  const [gotoProfileList, setgotoProfileList] = useState(false);

  const onSaveFeedback = () => {
    if (!feedback) return Alert.alert('Error', "Feedback can't be empty.");

    setLoading(true);

    KidsService.addKidFeedback({
      uid: user?.uid,
      kid_id: item?.id,
      feedback,
      kcal_docId,
    })
      .then(() => {
        setgotoProfileList(true);
        navigation.navigate('KidsProfileList', { gotoProfileList: true });
      })
      .catch(err => {
        setgotoProfileList(false);
        Alert.alert('Error', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Block>
      <HeaderDashboard
        text={'Kids Profile'}
        style={{ marginRight: 120 }}
        style1={{ marginTop: 0 }}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello 👋'}
        onPress={
          () => {}
          // gotoProfileList
          //   ? navigation.navigate('KidsProfileList', { gotoProfileList })
          //   : navigation.goBack()
        }
        onBackPress={() => {
          gotoProfileList
            ? navigation.navigate('KidsProfileList', { gotoProfileList: true })
            : navigation.goBack();
        }}
        settingPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container3}>
        <InputField
          value={'Note to remember'}
          placeholder="Any note"
          style={styles.inputField3}
          placeHolderStyle={styles.placeHolder3}
          titleStyle={styles.titleStyle3}
          multiline={true}
          numberOfLines={10}
          inputValue={feedback}
          setInputValue={e => setFeedback(e)}
        />
        <View
          style={{ alignItems: 'center', marginVertical: moderateScale(20) }}>
          <Button
            btnWidth={screenWidth - 80}
            text={'Save &  Close'}
            onPress={onSaveFeedback}
          />
        </View>
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container3: {
    width: screenWidth - 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputField3: {
    marginTop: 18,
    height: 200,
    width: screenWidth - 80,
    marginHorizontal: 0,
  },
  placeHolder3: {
    paddingVertical: 40,
    textAlignVertical: 'top',
    flexShrink: 1,
  },
  titleStyle3: {
    top: 10,
  },
});
export default FinalKidsCalculation;
