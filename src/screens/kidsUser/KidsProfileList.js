import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Block, HeaderDashboard, InputField } from '../../components';
import { screenWidth } from '../../constants/screenResolution';
import { colors, fonts } from '../../constants';
import { moderateScale } from 'react-native-size-matters';
import { AvatarSvg1, AvatarSvg3 } from '../../asset/svg';
import { AuthContext, LoadingContext } from '../../context';
import { KidsService } from '../../services';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';

const KidsProfileList = ({ navigation, route }) => {
  const { gotoProfileList } = route?.params || {};
  // context
  const { user } = AuthContext.useAuth();
  const { setLoading } = LoadingContext.useLoading();

  // states
  const [data, setData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [search, setSearch] = useState();

  const getKidsList = () => {
    setLoading(true);
    KidsService.getKidsById({ uid: user?.uid })
      .then(res => setSearchData(res))
      .catch(err => {
        console.log(err, 'Did not get data');
      })
      .finally(() => setLoading(false));
  };

  const deleteKids = kidId => {
    Alert.alert('Info', 'Do you want to delete?', [
      {
        text: 'Yes',
        onPress: () => {
          setLoading(true);
          KidsService.deleteKidsProfile({ kidId })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => setLoading(false));
          getKidsList();
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      getKidsList();
      return () => setData();
    }, []),
  );

  useEffect(() => {
    onSearch();
  }, [search, searchData]);

  const onSearch = () => {
    if (!search) return setData(searchData);
    else {
      const filtered = searchData?.filter(
        item =>
          item?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) !== -1,
      );

      setData(filtered);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BMIKCalLog', { item })}
            style={{
              ...styles.flexContainer,
              width: screenWidth - 200,
              justifyContent: 'flex-start',
            }}>
            {item?.user_img ? (
              <Image source={{ uri: item?.user_img }} style={styles.avatar} />
            ) : item?.gender === 'male' ? (
              <AvatarSvg3 />
            ) : (
              <AvatarSvg1 />
            )}
            <Text
              style={{
                ...fonts.ResultHead2,
                color: colors.primary,
                marginLeft: moderateScale(10),
              }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditKidsProfile', { item })}>
              <Text
                style={{
                  ...fonts.ResultHead2,
                  color: colors.black,
                  marginRight: moderateScale(10),
                }}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteKids(item?.id)}>
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
      </View>
    );
  };

  return (
    <>
      <HeaderDashboard
        text={'Your Profile'}
        style={{ marginRight: 120 }}
        style1={{ marginTop: 0 }}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        styleIcon={{ top: 3 }}
        text3={'Hello 👋'}
        settingPress={() => navigation.navigate('Settings')}
        onBackPress={() => {
          console.log(gotoProfileList);
          gotoProfileList
            ? (console.log('if', gotoProfileList),
              navigation.navigate('DashboardUserTabs'))
            : (console.log('else', gotoProfileList), navigation.goBack());
        }}
      />
      <Block withoutScroll={true}>
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
            setInputValue={e => setSearch(e)}
          />

          <FlatList data={data} renderItem={renderItem} />
        </View>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    flex: 1,
  },
  listContainer: {
    marginTop: moderateScale(20),
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
  avatar: {
    height: 56,
    width: 56,
    resizeMode: 'contain',
    borderRadius: 100,
  },
});
export default KidsProfileList;
