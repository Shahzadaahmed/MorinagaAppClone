import firestore from '@react-native-firebase/firestore';
import { DateTimeHelper } from '../helper';

// get categories from database
const getCategories = () => {
  return firestore()
    .collection('food_categories')
    .get()
    .then(snap => {
      const categories = [];
      snap?.forEach(category =>
        categories?.push({ ...category?.data(), id: category?.id }),
      );

      return categories;
    });
};

// get food items from database
const getFoodItems = category_id => {
  return firestore()
    .collection('food_items')
    .where('category_id', '==', category_id)
    .get()
    .then(snap => {
      const foodItems = [];
      snap?.forEach(foodItem =>
        foodItems?.push({ ...foodItem?.data(), id: foodItem?.id }),
      );

      return foodItems;
    });
};

const searchFoodItemName = ({ category_id, search }) => {
  return firestore()
    .collection('food_items')
    .where('category_id', '==', category_id)
    .where('name', '>=', search?.toUpperCase())
    .where('name', '<=', search + '\uf8ff')
    .get()
    .then(snap => {
      const kids = [];
      snap?.forEach(kid => kids?.push({ ...kid?.data(), id: kid?.id }));

      return kids;
    });
};

const getKcalMale = () => {
  return firestore()
    .collection('kcal_male')
    .get()
    .then(snap => {
      const kcalMale = [];
      snap?.forEach(kcal => kcalMale?.push({ ...kcal?.data(), id: kcal?.id }));
      return kcalMale;
    });
};

const getKcalFemale = () => {
  return firestore()
    .collection('kcal_female')
    .get()
    .then(snap => {
      const kcalFemale = [];
      snap?.forEach(kcal =>
        kcalFemale?.push({ ...kcal?.data(), id: kcal?.id }),
      );
      return kcalFemale;
    });
};

// get food items from database
const getAllFoodItems = () => {
  return firestore()
    .collection('food_items')
    .get()
    .then(snap => {
      const foodItems = [];
      snap?.forEach(foodItem =>
        foodItems?.push({ ...foodItem?.data(), id: foodItem?.id }),
      );

      return foodItems;
    });
};

// get required male kcal database
const getMaleRequiredKcal = async (activity, age) => {
  const { months, years } = DateTimeHelper.firebaseDateCalculateAge(age);

  let kcalRef = await firestore()
    .collection('kcal_male')
    .where('years', '==', years)
    .where('months', '==', months);

  return kcalRef.get().then(snap => {
    const foodItems = [];
    snap?.forEach(foodItem => foodItems?.push(foodItem?.data()));

    if (activity === 'light_physical_activity') {
      return foodItems?.[0]?.light_physical_activity;
    } else if (activity === 'moderate_physical_activity') {
      return foodItems?.[0]?.moderate_physical_activity;
    } else {
      return foodItems?.[0]?.heavy_physical_activity;
    }
  });
};

// get required female kcal database
const getFemaleRequiredKcal = async (activity, age) => {
  const { months, years } = DateTimeHelper.firebaseDateCalculateAge(age);

  let kcalRef = await firestore()
    .collection('kcal_female')
    .where('years', '==', years)
    .where('months', '==', months);

  return kcalRef.get().then(snap => {
    const foodItems = [];
    snap?.forEach(foodItem => foodItems?.push(foodItem?.data()));

    if (activity === 'light_physical_activity') {
      return foodItems?.[0]?.light_physical_activity;
    } else if (activity === 'moderate_physical_activity') {
      return foodItems?.[0]?.moderate_physical_activity;
    } else {
      return foodItems?.[0]?.heavy_physical_activity;
    }
  });
};

const saveKcalData = async ({
  kid_id,
  kcal_intake,
  kcal_required,
  kcal_indication,
}) => {
  if (!kid_id || !kcal_intake || !kcal_required || !kcal_indication) return;

  return firestore().collection('kids_kcal').add({
    kid_id,
    kcal_intake,
    kcal_required,
    kcal_indication,
    created_at: firestore.FieldValue.serverTimestamp(),
  });
};

const getKcalData = async ({ kid_id }) => {
  return firestore()
    .collection('kids_kcal')
    .where('kid_id', '==', kid_id)
    .orderBy('created_at', 'desc')
    .get()
    .then(snap => {
      const kcalData = [];
      snap?.forEach(kcal => kcalData?.push({ ...kcal?.data(), id: kcal?.id }));
      return kcalData;
    });
};

const KcalService = {
  getCategories,
  getFoodItems,
  searchFoodItemName,
  getKcalMale,
  getKcalFemale,
  getAllFoodItems,
  getMaleRequiredKcal,
  getFemaleRequiredKcal,
  saveKcalData,
  getKcalData,
};

export default KcalService;
