import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import React, {useState} from 'react';
import {colors, fonts} from '../constants';
import {BananaSvg, Minus, Plus} from '../asset/svg';
import {moderateScale} from 'react-native-size-matters';
import {screenWidth} from '../constants/screenResolution';

const data = [
  {id: 2, name: 'Banana'},
  {id: 1, name: 'Apple'},
  //   {id: 3, name: 'Orange'},
  //   {id: 4, name: 'Mango'},
  // Add more data here
];

const TopTabView = () => {
  const [index, setIndex] = useState(0); // Add state for the index

  const handleIndexChange = newIndex => {
    setIndex(newIndex);
  };

  const FruitListScreen = () => {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={styles.flexContainer}>
                <View>
                  <BananaSvg />
                </View>
                <View>
                  <Text style={{...fonts.items, color: colors.black2}}>
                    {item?.name}
                  </Text>
                  <Text style={{...fonts.subItems, color: colors.black2}}>
                    1 {item?.name} has 4 Kcal
                  </Text>
                </View>
                <View style={styles.rightFlex}>
                  <TouchableOpacity>
                    <Plus />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...fonts.items,
                      color: colors.black2,
                      marginHorizontal: moderateScale(5),
                    }}>
                    0.25
                  </Text>
                  <TouchableOpacity>
                    <Minus />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FruitListScreen,
    second: FruitListScreen,
    third: FruitListScreen,
    fourth: FruitListScreen,
    fifth: FruitListScreen,
    sixth: FruitListScreen,
  });
  const [routes] = useState([
    {key: 'first', title: 'Fruits'},
    {key: 'second', title: 'Dairy'},
    {key: 'third', title: 'Chocolate'},
    {key: 'fourth', title: 'Rice'},
    {key: 'fifth', title: 'Bakery'},
    {key: 'sixth', title: 'Breakfast'},
  ]);
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              // style={{...styles.btnV, width: 110}}
              onPress={() => {
                setIndex(i);

              }}>
              <Animated.Text
                style={{
                  ...fonts.items,
                  color: colors.black,
                }}>
                {route.title}
              </Animated.Text>
              {/* <Animated.View style={[styles.underline, { width: underlineWidth }]} /> */}
              {i === index ? (
                <View
                  style={{
                    borderBottomWidth: 2,
                    height: 2,
                    borderColor: '#FF0000',
                  }}></View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  btnV: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#292F33',
  },
  btntext: {
    fontWeight: 'bold',
    color: '#D9DBDC',
    fontSize: 16,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 26,
  },
  container: {
    width: screenWidth - 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: colors.black,
    backgroundColor: colors.grey2,
    padding: moderateScale(15),
    borderRadius: 20,
    marginTop: moderateScale(20),
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  underline: {
    borderBottomWidth: 2,
    height: 2,
    borderColor: '#FF0000',
  },
});
export default TopTabView;
