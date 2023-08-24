import firestore from '@react-native-firebase/firestore';
import Realm from 'realm';

// get announcements from database
const getIdealBmi = ({ years, months }) => {
  return firestore()
    .collection('bmi')
    .where('years', '==', years)
    .where('months', '==', months)
    .get()
    .then(snap => {
      const idealBmi = [];
      snap?.forEach(bmi => idealBmi?.push({ ...bmi?.data(), id: bmi?.id }));
      return idealBmi;
    });
};

const BMISchema = {
  name: 'bmi',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    calculatedBMI: 'float',
    idealBMI: 'float',
    bmiIndication: 'string',
    date: 'date',
    kid_id: 'string',
  },
};

const realmConfig = {
  schema: [BMISchema],
  schemaVersion: 1,
};

const openRealm = async () => {
  try {
    return await Realm.open(realmConfig);
  } catch (error) {
    console.error('Error initializing Realm:', error);
    throw error;
  }
};

// Function to save BMI data to Realm database
export const saveBMI = async bmiData => {
  const realm = await openRealm();
  try {
    realm.write(() => {
      realm.create('bmi', {
        ...bmiData,
        date: new Date(),
      });
    });

    realm.close();
  } catch (error) {
    console.error('Error saving BMI data to Realm:', error);
  }
};

// Function to get all saved BMI entries from Realm database
export const getAllBMIEntries = async () => {
  try {
    const realm = await openRealm();
    const entries = realm.objects('bmi');
    realm.close();
    return entries;
  } catch (error) {
    console.error('Error retrieving BMI data from Realm:', error);
  }
};

const saveBmiData = ({ kid_id, calculated_bmi, ideal_bmi, bmi_indication }) => {
  return firestore().collection('kids_bmi').add({
    kid_id,
    calculated_bmi,
    ideal_bmi,
    bmi_indication,
    created_at: firestore.FieldValue.serverTimestamp(),
  });
};

const getBmiData = ({ kid_id }) => {
  return firestore()
    .collection('kids_bmi')
    .where('kid_id', '==', kid_id)
    .orderBy('created_at', 'desc')
    .get()
    .then(snap => {
      const bmiData = [];
      snap?.forEach(bmi => bmiData?.push({ ...bmi?.data(), id: bmi?.id }));
      return bmiData;
    });
};

// get all bmis from database
const getAllBmi = () => {
  return firestore()
    .collection('bmi')
    .get()
    .then(snap => {
      const idealBmi = [];
      snap?.forEach(bmi => idealBmi?.push({ ...bmi?.data(), id: bmi?.id }));
      return idealBmi;
    });
};

const BmiService = {
  getIdealBmi,
  saveBMI,
  getAllBMIEntries,
  saveBmiData,
  getBmiData,
  getAllBmi,
};

export default BmiService;
