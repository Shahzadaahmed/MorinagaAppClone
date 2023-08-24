import firestore from '@react-native-firebase/firestore';
import StorageService from './StorageService';

const addKidProfile = async ({
  uid,
  name,
  area,
  dob,
  city,
  gender,
  father_name,
  mobile_no,
  user_img,
}) => {
  try {
    const img = (await StorageService.uploadImage(null, user_img, uid)) || '';

    return firestore().collection('kids_profile').add({
      uid,
      name,
      father_name,
      area,
      dob,
      city,
      mobile_no,
      gender,
      user_img: img,
      created_at: firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }
};

// get kid by id from database
const getKidsById = ({ uid }) => {
  // eslint-disable-next-line curly
  if (!uid) return;
  return firestore()
    .collection('kids_profile')
    .where('uid', '==', uid)
    .orderBy('created_at', 'desc')
    .get()
    .then(snap => {
      const kids = [];
      snap?.forEach(kid => kids.push({ ...kid?.data(), id: kid.id }));

      return kids;
    });
};

// update kid profile
const updateKidProfile = ({
  kidId,
  name,
  area,
  dob,
  city,
  gender,
  father_name,
  mobile_no,
}) => {
  if (!kidId) return;
  return firestore().collection('kids_profile').doc(kidId).update({
    name,
    father_name,
    area,
    dob,
    city,
    mobile_no,
    gender,
    updated_at: firestore.FieldValue.serverTimestamp(),
  });
};

const deleteKidsProfile = ({ kidId }) => {
  if (!kidId) return;
  return firestore()
    .collection('kids_profile')
    .doc(kidId)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
};

const searchKidByName = ({ uid, search }) => {
  return firestore()
    .collection('kids_profile')
    .where('uid', '==', uid)
    .where('name', '>=', search?.toUpperCase() || '')
    .where('name', '<=', search + '\uf8ff')
    .get()
    .then(snap => {
      const kids = [];
      snap?.forEach(kid => kids?.push({ ...kid?.data(), id: kid?.id }));

      return kids;
    });
};

// update Profile picture
const updateProfilePicture = async ({ prevImageUri, uid, url }) => {
  return StorageService.uploadImage(prevImageUri, url, uid).then(url =>
    firestore().collection('kids_profile').doc(uid).update({
      user_img: url,
    }),
  );
};

const addKidFeedback = async ({ uid, kid_id, feedback, kcal_docId }) => {
  return firestore().collection('kids_feedback').add({
    uid,
    kid_id,
    feedback,
    kcal_docId,
    created_at: firestore.FieldValue.serverTimestamp(),
  });
};

const KidsService = {
  addKidProfile,
  getKidsById,
  updateKidProfile,
  deleteKidsProfile,
  searchKidByName,
  updateProfilePicture,
  addKidFeedback,
};

export default KidsService;
