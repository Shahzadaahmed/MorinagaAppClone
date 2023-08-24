import Realm from 'realm';

const ProfileSchema = {
  name: 'kids_profile',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    uid: 'string',
    name: 'string',
    father_name: 'string',
    area: 'string',
    dob: 'string',
    city: 'string',
    gender: 'string',
    mobile_no: 'string',
  },
};

const realmConfig = {
  schema: [ProfileSchema],
  schemaVersion: 1,
};

const initializeRealm = async () => {
  try {
    return await Realm.open(realmConfig);
  } catch (error) {
    console.error('Error initializing Realm:', error);
    throw error;
  }
};

const saveProfile = async profile => {
  const realm = await initializeRealm();
  try {
    realm.write(() => {
      realm.create('kids_profile', profile);
    });
    return profile;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  } finally {
    realm.close();
  }
};

const getProfiles = async () => {
  const realm = await initializeRealm();
  try {
    const profiles = realm.objects('kids_profile');
    return profiles;
  } catch (error) {
    console.log('Error retrieving profiles:', error);
    throw error;
  }
};

const deleteProfile = async profileId => {
  const realm = await initializeRealm();
  try {
    realm.write(() => {
      const profileToDelete = realm.objectForPrimaryKey(
        'kids_profile',
        profileId,
      );
      realm.delete(profileToDelete);
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};
const updateProfileKid = async updatedProfile => {
  const realm = await initializeRealm();
  try {
    realm.write(() => {
      const profileToUpdate = realm.objectForPrimaryKey(
        'kids_profile',
        updatedProfile.kidId,
      );
      if (!profileToUpdate) {
        console.error(
          'Profile not found for the given ID:',
          updatedProfile.kidId,
        );
        return;
      }

      profileToUpdate.name = updatedProfile.name;
      profileToUpdate.area = updatedProfile.area;
      profileToUpdate.dob = updatedProfile.dob;
      profileToUpdate.city = updatedProfile.city;
      profileToUpdate.gender = updatedProfile.gender;
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export default ProfileServices = {
  initializeRealm,
  saveProfile,
  getProfiles,
  deleteProfile,
  updateProfileKid,
};
