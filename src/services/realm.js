import { createRealmContext } from '@realm/react';
import Realm from 'realm';

// Define your object model
export class KidsProfiles extends Realm.Object {
  static schema = {
    name: 'KidsProfiles',
    properties: {
      _id: 'objectId',
      uid: 'string',
      created_at: 'date',
      name: 'string',
      parent_name: 'string',
      area: 'string',
      dob: 'date',
      city: 'string',
      gender: 'string',
      mobile_no: 'string',

      actual_bmi: 'string',
      actual_height: 'string',
      actual_weight: 'string',
      ideal_bmi: 'string',
      ideal_height: 'string',
      ideal_weight: 'string',
      bmi_indication: 'string',

      kcal_intake: 'float',
      kcal_required: 'float',
      kcal_indication: 'string',

      note: 'string',
      assessment_1: 'bool',
      assessment_2: 'bool',
      prescription: 'bool?',
    },
    primaryKey: '_id',
  };
}

export class Attendance extends Realm.Object {
  static schema = {
    name: 'Attendance',
    properties: {
      _id: 'objectId',
      user_id: 'string?',
      check_in: 'date?',
      check_out: 'date?',
      created_at: 'date?',
    },
    primaryKey: '_id',
  };
}

export class User extends Realm.Object {
  static schema = {
    name: 'User',
    properties: {
      _id: 'objectId',
      uid: 'string',
      last_sync: 'date',
    },
    primaryKey: '_id',
  };
}

export const realmConfig = {
  schema: [KidsProfiles, Attendance, User],
  schemaVersion: 29,
};

export const realmContext = createRealmContext(realmConfig);
