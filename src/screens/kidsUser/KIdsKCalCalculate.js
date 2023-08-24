import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Block,
  Button,
  InputField,
  KcalItemCard,
  TopTab,
  ElementDropDown,
  HeaderDashboard,
  KcalIntakeModal,
  ResultKcal,
} from '../../components';
import { screenWidth } from '../../constants/screenResolution';
import { moderateScale } from 'react-native-size-matters';
import { colors, fonts } from '../../constants';
import { KcalService, KidsService } from '../../services';
import { AuthContext, LoadingContext } from '../../context';
import { physicalData, stressData } from '../../constants/data';
import { BmiHelper } from '../../helper';

const KIdsKCalCalculate = ({ navigation }) => {
  // context
  const { setLoading } = LoadingContext.useLoading();
  const { user } = AuthContext.useAuth();

  // states
  const [dropDownValuePhysical, setDropDownValuePhysical] = useState(null);
  const [dropDownValueStress, setDropDownValueStress] = useState(null);
  const [categoiresData, setCategoriesData] = useState([]);
  const [foodItemsData, setFoodItemsData] = useState([]);
  const [searchFoodItemsData, setSearchFoodItemsData] = useState([]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [kids, setKids] = useState([]);
  const [selectedKid, setSelectedKid] = useState();
  const [totalKcal, setTotalKcal] = useState(0);
  const [requiredKcal, setRequiredKcal] = useState(0);
  const [kcalItemsModel, setKcalItemsModel] = useState(false);
  const [allFood, setAllFood] = useState([]);

  const [nextbtnenable, setnextbtnenable] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchData()
      .then(res => {
        setKids(res?.kids);
        setIndex(res?.categoires?.[0]?.id);
        setCategoriesData(res?.categoires);
        setSearchFoodItemsData(res?.foodItems);
        // setSearchFoodItemsData(res?.allFoodItems);
        setAllFood(res?.allFoodItems);
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, [setLoading]);

  useEffect(() => {
    setLoading(true);

    KcalService.getFoodItems(index)
      .then(res => setSearchFoodItemsData(res))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, [index, setLoading]);

  const fetchData = async () => {
    try {
      const kids = await KidsService.getKidsById({ uid: user?.uid });
      const categoires = await KcalService.getCategories();
      const foodItems = await KcalService.getFoodItems(categoires?.[0]?.id);
      const allFoodItems = await KcalService.getAllFoodItems();
      return { kids, categoires, foodItems, allFoodItems };
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    // onSearch();
    if (search && allFood?.length)
      setFoodItemsData(() =>
        allFood.filter(item =>
          item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
        ),
      );
    else setFoodItemsData(searchFoodItemsData);
  }, [search, searchFoodItemsData]);

  const onSearch = () => {
    if (!search) return setFoodItemsData(searchFoodItemsData);
    else {
      const filtered = searchFoodItemsData?.filter(item =>
        item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      );

      setFoodItemsData(filtered);
    }

    // if (search && searchFoodItemsData?.length)
    //   setFoodItemsData(() =>
    //     foodItems.filter(item =>
    //       item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
    //     ),
    //   );
    // else setFoodItemsData(selectedFoods);
  };
  // useEffect(() => {
  //   onSearch();
  // }, [search, searchFoodItemsData]);

  // const onSearch = () => {
  //   if (!search) return setFoodItemsData(searchFoodItemsData);
  //   else {
  //     const filtered = searchFoodItemsData?.filter(
  //       item => item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  //       //item?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) !== -1,
  //     );

  //     setFoodItemsData(filtered);
  //   }
  // };

  // Function to add an item to selected items
  const handleIncrement = item => {
    const existingItem = selectedItems.find(
      selectedItem => selectedItem.id === item.id,
    );
    if (existingItem) {
      // If the item already exists in selectedItems, update its count
      const updatedItems = selectedItems.map(selectedItem =>
        selectedItem.id === item.id
          ? {
              ...selectedItem,
              calories: parseInt(item?.calories),
              count: selectedItem.count + 0.25,
            }
          : selectedItem,
      );

      const totalCount = BmiHelper.getTotalCount(updatedItems);

      setTotalKcal(totalCount);
      setSelectedItems(updatedItems);
      setnextbtnenable(false);
    } else {
      // If the item is not in selectedItems, add it with count 0.25
      const updatedItem = { ...item, count: 0.25 };
      setSelectedItems([...selectedItems, updatedItem]);
      const totalCount = BmiHelper.getTotalCount([
        ...selectedItems,
        updatedItem,
      ]);
      setTotalKcal(totalCount);
      setnextbtnenable(false);
    }
  };

  // Function to remove an item from selected items or decrement its count
  const handleDecrement = item => {
    const existingItem = selectedItems.find(
      selectedItem => selectedItem.id === item.id,
    );

    if (existingItem) {
      const updatedItems = selectedItems.map(selectedItem =>
        selectedItem.id === item.id
          ? {
              ...selectedItem,
              calories: parseInt(item?.calories),
              count: selectedItem.count - 0.25,
            } // Decrement count
          : selectedItem,
      );

      setSelectedItems(updatedItems.filter(item => item.count > 0)); // Remove item if count becomes zero
      const totalCount = BmiHelper.getTotalCount(updatedItems);
      setTotalKcal(totalCount);
      setnextbtnenable(false);
    }
  };

  const calculateKcal = () => {
    if (!selectedKid) {
      setnextbtnenable(false);
      Alert.alert('Error', 'Please select kid');
    } else if (!selectedItems?.length) {
      setnextbtnenable(false);
      Alert.alert('Error', 'Please select items');
    } else if (!dropDownValuePhysical) {
      setnextbtnenable(false);
      Alert.alert('Error', 'Please select Physical activity');
    } else if (!dropDownValueStress) {
      setnextbtnenable(false);
      Alert.alert('Error', 'Please select Stress Factor');
    } else {
      setLoading(true);

      const totalCalories = BmiHelper.getTotalCount(selectedItems);
      setTotalKcal(totalCalories);
      findRequiredKcal(totalCalories);
      setnextbtnenable(true);
    }
  };

  const findRequiredKcal = intakeCalories => {
    if (selectedKid?.gender === 'male') {
      KcalService.getMaleRequiredKcal(
        dropDownValuePhysical?.value,
        selectedKid?.dob,
      )
        .then(res => {
          const userRequiredKcal =
            Number(res) * Number(dropDownValueStress?.value);
          setRequiredKcal(Number(userRequiredKcal) - Number(intakeCalories));
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      KcalService.getFemaleRequiredKcal(
        dropDownValuePhysical?.value,
        selectedKid?.dob,
      )
        .then(res => {
          const userRequiredKcal =
            Number(res) * Number(dropDownValueStress?.value);
          setRequiredKcal(Number(userRequiredKcal) - Number(intakeCalories));
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const onSaveKcal = () => {
    if (!selectedKid?.id || !totalKcal || !requiredKcal)
      return Alert.alert('Error', 'Please calculate Kcal to go next.');

    setLoading(true);

    KcalService.saveKcalData({
      kid_id: selectedKid?.id,
      kcal_intake: totalKcal,
      kcal_required: requiredKcal,
      kcal_indication: renderIndication(totalKcal, requiredKcal),
    })
      .then(docs =>
        navigation.navigate('FinalKidsCalculation', {
          item: selectedKid,
          kcal_docId: docs._documentPath._parts[1],
        }),
      )
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };

  const renderIndication = (finalKcal, requiredKcal) => {
    if (!finalKcal) {
      return '';
    }
    if (finalKcal < requiredKcal) {
      return 'Deficit';
    } else if (finalKcal === requiredKcal) {
      return 'At par';
    } else if (finalKcal > requiredKcal) {
      return 'Surplus';
    }
  };

  return (
    <Block withoutScroll={false}>
      <HeaderDashboard
        text={'Kcal Calculate'}
        style={styles.headerStyle1}
        style1={styles.headerStyle2}
        showIcon={true}
        text1={'Fill the Nutrition Gap'}
        styleIcon={styles.styleIcon}
        text3={'Hello, Sander👋'}
        onPress={() => navigation.goBack()}
        settingPress={() => navigation.navigate('Settings')}
      />
      <ElementDropDown
        data={kids}
        height={50}
        showDropDownSearch={true}
        value={selectedKid}
        labelField={'name'}
        valueField={'name'}
        placeholder={'Select Kids'}
        setValue={e => setSelectedKid(e)}
      />

      <TopTab
        data={categoiresData}
        selectedIndex={index}
        setSelectedIndex={e => setIndex(e)}
      />

      <InputField
        value="Search"
        placeholder="Banana"
        style={styles.search}
        inputValue={search}
        setInputValue={e => setSearch(e)}
      />

      <ScrollView style={{ height: 180 }} nestedScrollEnabled>
        {foodItemsData?.map((item, index) => {
          return (
            <KcalItemCard
              key={index}
              item={item}
              selectedItems={selectedItems}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          );
        })}
      </ScrollView>

      <ElementDropDown
        data={physicalData}
        label={'label'}
        height={50}
        placeholder={'Physical Activity'}
        value={dropDownValuePhysical}
        valueField={'value'}
        setValue={e => setDropDownValuePhysical(e)}
      />

      <ElementDropDown
        data={stressData}
        height={50}
        label={'label'}
        placeholder={'Stress Conversation Factor'}
        value={dropDownValueStress}
        valueField={'value'}
        setValue={e => setDropDownValueStress(e)}
      />

      <TouchableOpacity
        style={styles.result}
        activeOpacity={0.5}
        onPress={() => selectedItems?.length && setKcalItemsModel(true)}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{selectedItems?.length}</Text>
        </View>
        <Text style={{ ...fonts.items, color: colors.white }}>
          View Kcal Intake
        </Text>
        <Text style={{ ...fonts.totalKcalCount, color: colors.white }}>
          {totalKcal}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonAlign}>
        <Button
          text={'Calculate KCal'}
          btnWidth={screenWidth - 80}
          onPress={calculateKcal}
        />
      </View>

      <ResultKcal totalKcal={totalKcal} requiredKcal={requiredKcal} />

      <View style={styles.buttonAlign}>
        <Button
          text={'Next'}
          btnWidth={screenWidth - 80}
          onPress={onSaveKcal}
          style={{ marginBottom: 50 }}
          nextbtnenable={nextbtnenable}
          textConditionForUserKcalNextBtn={'XXX'}
        />
      </View>

      <KcalIntakeModal
        items={selectedItems}
        isVisible={kcalItemsModel}
        onRequestClose={() => setKcalItemsModel(false)}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  headerStyle1: {
    marginRight: 90,
  },
  headerStyle2: {
    marginTop: 30,
  },
  styleIcon: {
    top: 3,
  },
  container: {
    width: screenWidth - 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  inputField: {
    width: screenWidth - 80,
    marginTop: moderateScale(20),
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 80,
    height: 51,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: colors.black3,
    marginTop: 20,
  },
  buttonAlign: {
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  symptoms: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 200,
    flexDirection: 'row',
  },
  nextBtn: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  search: {
    marginTop: 10,
    marginBottom: 15,
    height: 50,
    width: screenWidth - 80,
  },
  counter: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 100,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: colors.white,
    ...fonts.counter,
  },
});
export default KIdsKCalCalculate;
