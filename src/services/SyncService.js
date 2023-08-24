import Realm from 'realm';
import { realmConfig } from './realm';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';

export const syncData = async () => {
  const { isConnected } = await NetInfo.fetch();

  if (!isConnected) throw Error('Please connect to the internet.');

  const realm = await Realm.open(realmConfig);

  await syncAllDataToCloud(realm);

  realm.write(() => {
    realm.deleteAll();
  });

  return 'Your all data has been syncronized.';
};

// Sync data between realm and firestore
const sync = async ({ realmLastSync, firestoreLastSync, realm }) => {
  const oldestDate =
    realmLastSync < firestoreLastSync ? realmLastSync : firestoreLastSync;

  const uid = auth().currentUser.uid;

  // Get all realm data after oldest date
  let kidsProfiles = realm.objects('KidsProfiles');
  kidsProfiles = kidsProfiles.filtered(
    'uid == $0 && created_at > $1',
    uid,
    new Date(oldestDate),
  );

  let promotorAttendance = realm.objects('Attendance');
  promotorAttendance = promotorAttendance.filtered(
    'user_id == $0 && created_at > $1',
    uid,
    new Date(oldestDate),
  );

  // Get all firestore data after oldest date
  const kidsProfileRef = firestore().collection('kids_profile');
  const promotorAttendanceRef = firestore().collection('promotor_attendance');

  const cloudKidsProfile = await kidsProfileRef
    .where('uid', '==', uid)
    .where('created_at', '>', new Date(oldestDate))
    .get();
  const cloudAttendance = await promotorAttendanceRef
    .where('uid', '==', uid)
    .where('created_at', '>', new Date(oldestDate))
    .get();

  // Write all realm data to firestore
  const batch = firestore().batch();

  if (kidsProfiles.length) {
    kidsProfiles.forEach(kid => {
      const {
        _id,
        uid,
        created_at,
        name,
        parent_name,
        area,
        dob,
        city,
        gender,
        mobile_no,
      } = kid;

      const kidRef = kidsProfileRef.doc(String(_id));

      batch.set(kidRef, {
        _id,
        uid,
        created_at,
        name,
        father_name: parent_name,
        area,
        dob,
        city,
        gender,
        mobile_no,
      });
    });
  }

  if (promotorAttendance.length) {
    promotorAttendance.forEach(attendance => {
      const { _id, user_id, check_in, check_out, created_at } = attendance;

      const attendanceRef = promotorAttendanceRef.doc(String(_id));

      batch.set(attendanceRef, {
        _id,
        user_id,
        check_in,
        check_out,
        created_at,
      });
    });
  }

  await batch.commit();

  // Write all firestore data to realm
  realm.write(() => {
    //   Write all cloud kid profile doc to realm
    if (cloudKidsProfile.size)
      cloudKidsProfile.forEach(kid => {
        const {
          _id,
          uid,
          created_at,
          name,
          father_name: parent_name,
          area,
          dob,
          city,
          gender,
          mobile_no,
        } = kid.data();

        realm.create('KidsProfiles', {
          _id,
          uid,
          created_at,
          name,
          parent_name,
          area,
          dob,
          city,
          gender,
          mobile_no,
        });
      });

    //   Write all cloud attendance doc to realm
    if (cloudAttendance.size)
      cloudAttendance.forEach(attendance => {
        const { _id, user_id, check_in, check_out, created_at } =
          attendance.data();

        realm.create('Attendance', {
          _id,
          user_id,
          check_in,
          check_out,
          created_at,
        });
      });
  });
};

// Sync all data to cloud; this function will only call when there is no sync action perform on profile yet
const syncAllDataToCloud = async realm => {
  const { uid } = auth().currentUser;

  // Get all local data
  let kidsProfiles = realm.objects('KidsProfiles');
  kidsProfiles = kidsProfiles.filtered('uid == $0', uid);

  let promotorAttendance = realm.objects('Attendance');
  promotorAttendance = promotorAttendance.filtered('user_id == $0', uid);

  if (!kidsProfiles.length && !promotorAttendance.length) {
    return "You don't have data to sync.";
  }
  const batch = firestore().batch();

  if (kidsProfiles.length) {
    const kidsProfileRef = firestore().collection('kids_profile');

    kidsProfiles.forEach(kid => {
      const {
        _id,
        uid,
        created_at,
        name,
        parent_name,
        area,
        dob,
        city,
        gender,
        mobile_no,
        actual_bmi,
        actual_height,
        actual_weight,
        ideal_bmi,
        ideal_height,
        ideal_weight,
        bmi_indication,
        kcal_intake,
        kcal_required,
        kcal_indication,
        note,
        assessment_1,
        assessment_2,
      } = kid;

      const kidRef = kidsProfileRef.doc(String(_id));

      const kidData = {
        _id: String(_id),
        father_name: parent_name,
        note: note || ' ',
        uid,
        created_at,
        name,
        area,
        dob,
        city,
        gender,
        mobile_no,
        actual_bmi,
        actual_height,
        actual_weight,
        ideal_bmi,
        ideal_height,
        ideal_weight,
        bmi_indication,
        kcal_intake,
        kcal_required,
        kcal_indication,
        assessment_1,
        assessment_2,
      };

      batch.set(kidRef, kidData);
    });
  }

  if (promotorAttendance.length) {
    const promotorAttendanceRef = firestore().collection('promotor_attendance');

    promotorAttendance.forEach(attendance => {
      const { _id, user_id, check_in, check_out, created_at } = attendance;

      const attendanceRef = promotorAttendanceRef.doc(String(_id));

      batch.set(attendanceRef, {
        _id: String(_id),
        user_id,
        check_in,
        check_out,
        created_at,
      });
    });
  }

  await batch.commit();
};
