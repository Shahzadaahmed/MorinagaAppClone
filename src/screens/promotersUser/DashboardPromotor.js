import React from 'react';
import { View, Dimensions } from 'react-native';
import { colors } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import { Block, Header, IntroHeader, ModulesButton } from '../../components';
import { AvatarUserBlackSvg, UserSvg, Watch } from '../../asset/svg';

const { width } = Dimensions.get('window');

const DashboardPromotor = ({ navigation }) => {
  return (
    <Block withoutScroll={false}>
      <Header onPress={() => navigation.goBack()} />
      <View style={{ marginTop: moderateScale(28) }}>
        <IntroHeader
          text={'Hello,'}
          text1={''}
          settingPress={() => navigation.navigate('SettingsPromotor')}
          UserImage={AvatarUserBlackSvg}
          color={colors.forgetText}
        />
      </View>
      <View style={{ marginTop: moderateScale(30) }}>
        <ModulesButton
          ModuleImg={Watch}
          text1={'Attendance'}
          text2={'Promotor Attendance'}
          width={width - 40}
          patternLeft={moderateScale(120)}
          onPress={() => navigation.navigate('PromottorsAttendance')}
        />
      </View>
      <View style={{ marginTop: moderateScale(25) }}>
        <ModulesButton
          ModuleImg={UserSvg}
          text1={'Profiles for Kids'}
          text2={'Manage Profiles'}
          width={width - 40}
          patternLeft={moderateScale(120)}
          onPress={() => navigation.navigate('PromotorsUsersKidsProfileList')}
        />
      </View>
    </Block>
  );
};

export default DashboardPromotor;
