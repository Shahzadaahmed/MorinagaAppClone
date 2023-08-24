import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

// Notification Handling
const pushNotification = (setInitToken, role, navigation) => {
  PushNotification.configure({
    onRegister: ({ token }) => {
      console.log({ token });
      if (Platform.OS === 'ios') return;

      auth().currentUser?.uid &&
        handleFCMToken(auth().currentUser?.uid, token, role, setInitToken);
    },

    onNotification: notification => {
      console.log('Notification: ', notification);

      // if application is already opened then do nothing
      if (notification.foreground) return;

      if (notification.data) {
        navigation.navigate('Announcements');
        return;
      }

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    senderID: 343335555154,

    // Icons
    smallIcon: 'ic_launcher',
    largeIcon: 'ic_launcher',

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: err => console.log(err),

    requestPermissions: true,
  });
};

// Notification Handling End

const handleFCMToken = (uid, token, role, setInitToken) => {
  return firestore()
    .collection('tokens')
    .where('uid', '==', uid)
    .where('token', '==', token)
    .get()
    .then(tokenSnap => {
      // if token is not available, save new.
      if (!tokenSnap.size) {
        return saveFCMToken(uid, token, role, setInitToken);
      }

      let tokenDocId;

      tokenSnap.forEach(tokenDoc => {
        // setInitTokenID
        setInitToken(tokenDoc.id);

        // If token is active, do nothing
        if (tokenDoc.data().active) return;

        // else save the doc id to update the token
        tokenDocId = tokenDoc.id;
      });

      // If token status is false then make it true
      if (tokenDocId) return updateFCMToken(tokenDocId, true);
    })
    .then(docRef => docRef && setInitToken(docRef.id))
    .catch(err => console.log(err));
};

// Save new FCM Token to database
const saveFCMToken = (uid, token, role) => {

  return firestore().collection('tokens').add({
    uid,
    token,
    role,
    active: true, // keep token active on creation,
  });
};

// Update FCM Token to database
const updateFCMToken = (id, active) => {
  return firestore().collection('tokens').doc(id).update({
    active,
  });
};

// New token method
const saveTokenToDb = ({ uid, token }) => {
  return firestore()
    .collection('fcmTokens')
    .doc(uid)
    .update({
      token: firestore.FieldValue.arrayUnion(token),
    });
};

const NotificationService = {
  pushNotification,
  handleFCMToken,
};

export default NotificationService;
