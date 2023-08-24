import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Block, HeaderDashboard, InputField } from '../../components';
import { screenWidth } from '../../constants/screenResolution';
import { colors, fonts } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import {
  AvatarSvg1,
  AvatarSvg3,
  HeartFill,
  HeartStroke,
} from '../../asset/svg';
import { realmContext, KidsProfiles } from '../../services/realm';
import auth from '@react-native-firebase/auth';

const { useRealm, useQuery } = realmContext;

const PromotorsUsersKidsProfileList = ({ navigation, route }) => {
  //params
  const { gotoDashbaord } = route?.params || {};
  console.log(gotoDashbaord);
  const kidsProfilesDocs = useQuery(KidsProfiles);
  const realm = useRealm();

  const [userData, setUserData] = useState();
  const [search, setSearch] = useState();

  // Search kids by name
  useEffect(() => {
    const kidsProfiles = kidsProfilesDocs.filtered(
      'uid == $0',
      auth().currentUser.uid,
    );

    if (search && kidsProfiles?.length)
      setUserData(() =>
        kidsProfiles.filter(kid =>
          kid.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    else setUserData(kidsProfiles);
  }, [search, kidsProfilesDocs]);

  // Delete a kid profile
  const deleteKid = useCallback(item => {
    if (!item) return Alert.alert('Error', 'Kid profile is not found.');

    const { name } = item;

    Alert.alert(
      `Delete ${name}`,
      `You are deleting ${name} profile. Are you sure?`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            realm.write(() => {
              realm.delete(item);
            });

            Alert.alert(
              'Success',
              `${name} profile has been deleted successfully!`,
            );
          },
        },
      ],
      { cancelable: true },
    );
  }, []);

  const onPrescription = kid => {
    realm.write(() => {
      kid.prescription = !kid.prescription;
    });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() =>
          navigation.navigate('PromotorBMIKCalLog', { kid: item })
        }>
        <View style={styles.flexContainer}>
          <View
            style={{
              ...styles.flexContainer,
              width: screenWidth - 200,
              justifyContent: 'flex-start',
            }}>
            {item.gender === 'male' ? <AvatarSvg3 /> : <AvatarSvg1 />}
            <Text
              style={{
                ...fonts.ResultHead2,
                color: colors.primary,
                marginLeft: moderateScale(10),
              }}>
              {item?.name}
            </Text>
          </View>

          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => onPrescription(item)}
              style={{ marginRight: 20 }}>
              {item?.prescription ? <HeartFill /> : <HeartStroke />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteKid(item)}>
              <Text
                style={{
                  ...fonts.ResultHead2,
                  color: colors.danger,
                }}>
                Deleted
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.borderLine}></View>
      </TouchableOpacity>
    );
  };

  return (
    <Block withoutScroll={false}>
      <HeaderDashboard
        text={'Kids Profiles'}
        style={{ marginRight: 110 }}
        style1={{ marginTop: 0 }}
        text2={''}
        showIcon={true}
        showText={true}
        styleIcon={{ marginTop: 3 }}
        text1={'Fill the Nutrition Gap'}
        text3={'Hello 👋'}
        onPress={() => navigation.goBack()}
        onBackPress={() =>
          // gotoDashbaord
          //   ? navigation.navigate('Dashboard')
          //   : navigation.goBack()
          navigation.goBack()
        }
        settingPress={() => navigation.navigate('SettingsPromotor')}
      />
      <View style={styles.container}>
        <Text
          style={{
            ...fonts.subHeadUser2,
            color: colors.primary,
            marginTop: moderateScale(20),
          }}>
          Kids Profiles
        </Text>

        <InputField
          value="Search"
          placeholder="John"
          style={styles.search}
          inputValue={search}
          setInputValue={setSearch}
        />

        <FlatList
          data={userData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  listContainer: {
    marginTop: moderateScale(30),
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borderLine: {
    borderWidth: 0.5,
    color: colors.border,
    marginTop: moderateScale(15),
    opacity: 0.2,
  },
  search: {
    marginTop: 10,
    marginBottom: 5,
    width: screenWidth - 90,
  },
});
export default PromotorsUsersKidsProfileList;
