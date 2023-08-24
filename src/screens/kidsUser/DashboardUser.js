import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import { Block, Header, IntroHeader, ModulesButton } from '../../components';
import { AvatarUserBlackSvg, BMISvg, FireSvg, UserSvg } from '../../asset/svg';
import { screenWidth } from '../../constants/screenResolution';

const DashboardUser = ({ navigation }) => {
  return (
    <Block>
      <Header />
      <View style={{ marginTop: moderateScale(20) }}>
        <IntroHeader
          text1={'Fill the Nutrition Gap'}
          settingPress={() => navigation.navigate('Settings')}
          UserImage={AvatarUserBlackSvg}
          color={colors.primary}
        />
      </View>
      <View style={{ marginTop: moderateScale(20) }}>
        <ModulesButton
          ModuleImg={UserSvg}
          text1={'Profiles'}
          text2={'Manage Profiles'}
          width={screenWidth - 50}
          patternLeft={moderateScale(120)}
          onPress={
            () => navigation.navigate('KidsProfileList')
            //navigation.navigate('KidsProfileList', { gotoProfileList: false })
          }
        />
      </View>
      <View style={styles.flexContainer}>
        <ModulesButton
          ModuleImg={BMISvg}
          text1={'BMI'}
          text2={'Check BMI'}
          paddingRight={moderateScale(20)}
          maxWidth={'100%'}
          patternLeft={moderateScale(60)}
          onPress={() => navigation.navigate('KidsBMICalculate')}
        />
        <ModulesButton
          ModuleImg={FireSvg}
          text1={'KCal'}
          text2={'Check KCal'}
          paddingRight={moderateScale(20)}
          maxWidth={'100%'}
          patternLeft={moderateScale(60)}
          onPress={() => navigation.navigate('KIdsKCalCalculate')}
        />
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: moderateScale(20),
    width: screenWidth - 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default DashboardUser;
