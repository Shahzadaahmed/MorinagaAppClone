import Realm from 'realm';

const AttendanceSchema = {
  name: 'Attendance',
  properties: {
    checkInTime: 'date',
    checkOutTime: 'date?',
  },
};

const initializeRealm = async () => {
  const realmInstance = await Realm.open({
    schema: [AttendanceSchema],
    schemaVersion: 1,
  });

  const data = realmInstance
    .objects('Attendance')
    .filtered('checkInTime != null')
    .sorted('checkInTime', true)
    .slice(0, 1)[0];

  return {
    realmInstance,
    data,
  };
};

const clockIn = async realm => {
  const currentDateTime = new Date();

  const currentDateString = currentDateTime.toISOString().slice(0, 10);

  const existingCheckInRecord = realm
    .objects('Attendance')
    .filtered(
      'checkInTime >= $0 AND checkInTime <= $1',
      new Date(currentDateString),
      new Date(currentDateString + 'T23:59:59.999Z'),
    )[0];

  if (!existingCheckInRecord) {
    const utcCheckInTime = currentDateTime.toISOString();

    realm.write(() => {
      const newCheckInRecord = realm.create('Attendance', {
        checkInTime: utcCheckInTime,
      });

      return newCheckInRecord;
    });
  } else {
    console.log('Check-in already recorded for today.');
  }
};

const clockOut = async realm => {
  const currentDateTime = new Date();

  const currentDateString = currentDateTime.toISOString().slice(0, 10);

  const existingCheckOutRecord = realm
    .objects('Attendance')
    .filtered(
      'checkOutTime >= $0 AND checkOutTime <= $1',
      new Date(currentDateString),
      new Date(currentDateString + 'T23:59:59.999Z'),
    )[0];

  if (!existingCheckOutRecord && latestCheckInRecord) {
    const utcCheckOutTime = currentDateTime.toISOString();

    realm.write(() => {
      latestCheckInRecord.checkOutTime = utcCheckOutTime;
    });

    return utcCheckOutTime;
  } else {
    console.log('Check-out already recorded for today.');
  }
};

export default AttendanceService = {
  initializeRealm,
  clockIn,
  clockOut,
};
