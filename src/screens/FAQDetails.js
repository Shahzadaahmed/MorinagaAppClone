import { ScrollView, StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Block, HeaderDashboard } from '../components';
import { colors, fonts } from '../constants';
import { DateTimeHelper } from '../helper';
import { AuthContext } from '../context';

export default function FAQDetails({ navigation, route }) {
  const { user } = AuthContext.useAuth();
  const { item } = route?.params || {};

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const backAction = () => {
    navigation.navigate('FAQ');
    return true;
  };

  const handleSettingPress = () => {
    {
      user?.role == 'promotor'
        ? navigation.navigate('SettingsPromotor')
        : navigation.navigate('Settings');
    }
    return true;
  };

  return (
    <Block>
      <HeaderDashboard
        text={'FAQs'}
        style={{ marginRight: 40 }}
        style1={{ marginTop: 0 }}
        styleIcon={{ marginTop: 3 }}
        showIcon={true}
        showText={true}
        text1={'Fill the Nutrition Gap'}
        text2={'Heathly'}
        text3={'Hello 👋'}
        onBackPress={backAction}
        settingPress={handleSettingPress}
      />
      <View style={styles.container}>
        <Text
          style={{
            ...fonts.annoucementText1,
            color: colors.black,
            textAlign: 'center',
            fontWeight: 600,
          }}>
          {item?.heading}
        </Text>
      </View>
      <Text
        style={{
          ...styles.description,
          textAlign: item?.description?.length < 30 ? 'center' : 'justify',
        }}>
        {item?.description}
      </Text>

      {item?.typeTable && (
        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              flex: 1,
            }}>
            <View style={styles.tableContainer}>
              {item?.tableDataHeader?.length > 0 &&
                item?.tableDataHeader.map((r, i) => (
                  <View key={i} style={styles.row}>
                    <Text
                      style={{
                        textAlign: 'center',
                        flex: 1,
                        fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? colors.danger : colors.black,
                        lineHeight: 22,
                      }}>
                      {r.d1}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        flex: 1,
                        fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? colors.danger : colors.black,
                      }}>
                      {' '}
                      {r.d2}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        flex: 1,
                        fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? colors.danger : colors.black,
                      }}>
                      {' '}
                      {r.d3}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? colors.danger : colors.black,
                        width: 80,
                      }}>
                      {' '}
                      {r.d4}
                    </Text>
                    {r?.d5 && (
                      <Text
                        style={{
                          textAlign: 'center',
                          flex: 1,
                          fontWeight: i === 0 ? 700 : 500,
                          color: i === 0 ? colors.danger : colors.black,
                        }}>
                        {' '}
                        {r.d5}
                      </Text>
                    )}
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
    padding: 25,
    width: '100%',
  },
  description: {
    color: colors.black,
    marginHorizontal: 30,
    ...fonts.annoucementDescription,
  },
  tableContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    width: '100%',
    marginTop: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flex: 1,
    paddingVertical: 10,
    gap: 5,
  },
  rowcell: {
    textAlign: 'center',
    flex: 1,
    fontWeight: 700,
  },
  rowcell_2: {
    color: colors.black,
    textAlign: 'center',
    flex: 1,
  },
});
