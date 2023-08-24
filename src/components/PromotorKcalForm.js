import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import InputField from './InputField';
import TopTab from './TopTabs';
import KcalItemCard from './KcalItemCard';
import Button from './Button';
import { moderateScale } from 'react-native-size-matters';
import { screenWidth } from '../constants/screenResolution';
import { colors, fonts } from '../constants';
import ElementDropDown from './ElementDropDown';
import { physicalData, stressData } from '../constants/data';
import { usePromotor } from '../context/PromotorContext';
import { BmiHelper, DateTimeHelper } from '../helper';
import KcalIntakeModal from './KcalIntakeModal';

const PromotorKcalForm = ({
  setActiveStep,
  kidData,
  handleChange,
  selectedItems,
  setSelectedItems,
  setKidData,
}) => {
  const { foodCategories, foodItems, kcalMale, kcalFemale } = usePromotor();

  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState();
  const [foodItemsData, setFoodItemsData] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState();
  const [kcalItemsModel, setKcalItemsModel] = useState(false);

  useEffect(() => {
    if (!index && foodCategories?.length) setIndex(foodCategories[0].id);
    else if (index && foodItems?.length) {
      setSelectedFoods(foodItems.filter(item => item.category_id === index));
    }
  }, [foodCategories, foodItems, index]);

  // Search fruits
  useEffect(() => {
    if (search && foodItems?.length)
      setFoodItemsData(() =>
        foodItems.filter(item =>
          item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
        ),
      );
    else setFoodItemsData(selectedFoods);
  }, [search, selectedFoods]);

  // Function to add an item to selected items
  const handleIncrement = useCallback(
    item => {
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

        setKidData(prev => ({
          ...prev,
          totalKcal: totalCount,
        }));
        setSelectedItems(updatedItems);
      } else {
        // If the item is not in selectedItems, add it with count 0.25
        const updatedItem = { ...item, count: 0.25 };
        setSelectedItems([...selectedItems, updatedItem]);
        const totalCount = BmiHelper.getTotalCount([
          ...selectedItems,
          updatedItem,
        ]);
        setKidData(prev => ({
          ...prev,
          totalKcal: totalCount,
        }));
      }
    },
    [selectedItems],
  );

  // Function to remove an item from selected items or decrement its count
  const handleDecrement = useCallback(
    item => {
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
        setKidData(prev => ({
          ...prev,
          totalKcal: totalCount,
        }));
      }
    },
    [selectedItems],
  );

  const calculateKcal = () => {
    const { physicalActivity, stressFactor } = kidData;

    if (!selectedItems?.length) {
      Alert.alert('Error', 'Please select items.');
    } else if (!physicalActivity) {
      Alert.alert('Error', 'Please select physical activity.');
    } else if (!stressFactor) {
      Alert.alert('Error', 'Please select stress factor.');
    } else {
      const totalCalories = selectedItems?.reduce(
        (accumulator, item) => accumulator + parseInt(item?.calories),
        0,
      );

      handleChange('totalKcal', totalCalories);

      const requiredKcal = findRequiredKcal(totalCalories);

      setKidData(prev => ({
        ...prev,
        totalKcal: totalCalories,
        kcal_intake: totalCalories,
        kcal_required: Number(requiredKcal?.toFixed(2)),
        kcal_indication: renderIndication(totalCalories, requiredKcal),
      }));

      setActiveStep(3);
    }
  };

  const findRequiredKcal = intakeCalories => {
    const { physicalActivity, stressFactor } = kidData;

    const { years, months } = DateTimeHelper.calculateAge(kidData.dob);

    const kcalData = kidData.gender === 'male' ? kcalMale : kcalFemale;

    const res = kcalData.find(
      item => item.years === years && item.months === months,
    )?.[physicalActivity];

    let userRequiredKcal = Number(res) * Number(stressFactor?.value);
    userRequiredKcal = Number(userRequiredKcal) - Number(intakeCalories);

    handleChange('requiredKcal', userRequiredKcal);

    return userRequiredKcal;
  };

  const renderIndication = (finalKcal, requiredKcal) => {
    if (!finalKcal && !requiredKcal) {
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
    <View>
      <TopTab
        data={foodCategories}
        selectedIndex={index}
        setSelectedIndex={e => setIndex(e)}
      />

      <InputField
        value="Search"
        placeholder="Banana"
        style={styles.search}
        inputValue={search}
        setInputValue={setSearch}
      />

      <ScrollView style={{ height: 180 }} nestedScrollEnabled>
        {foodItemsData?.map((item, index) => (
          <KcalItemCard
            key={index}
            item={item}
            selectedItems={selectedItems}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        ))}
      </ScrollView>

      <ElementDropDown
        value={kidData?.physicalActivity}
        setValue={e => handleChange('physicalActivity', e.value)}
        placeholder="Physical Activity"
        data={physicalData}
      />
      <ElementDropDown
        value={kidData?.stressFactor}
        setValue={e => handleChange('stressFactor', e)}
        placeholder="Stress Conversation Factor"
        data={stressData}
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
          {kidData?.totalKcal || 0}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonAlign}>
        <Button
          text={'Next'}
          btnWidth={screenWidth - 80}
          onPress={calculateKcal}
        />
      </View>

      <KcalIntakeModal
        items={selectedItems}
        isVisible={kcalItemsModel}
        onRequestClose={() => setKcalItemsModel(false)}
      />
    </View>
  );
};

export default PromotorKcalForm;

const styles = StyleSheet.create({
  inputField: {
    width: screenWidth - 80,
    marginTop: moderateScale(20),
  },
  nextBtn: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
    marginTop: 20,
  },
  search: {
    marginVertical: 5,
    marginBottom: 10,
    width: screenWidth - 90,
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
    marginTop: 10,
  },
  buttonAlign: {
    marginTop: moderateScale(10),
    alignItems: 'center',
  },
  symptoms: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 200,
    flexDirection: 'row',
  },
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
