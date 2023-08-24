import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import StorageService from './StorageService';

const googleSignIn = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const cred = await auth().signInWithCredential(googleCredential);

  await createUserInDb({
    uid: cred?.user?.uid,
    email: cred?.additionalUserInfo?.profile?.email,
    full_name: cred?.additionalUserInfo?.profile?.name,
  });

  return cred?.user?.uid;
};

const createUserInDb = async ({ uid, full_name, email }) => {
  const userRef = firestore().collection('users').doc(uid);

  const user = await userRef.get();

  const role = user.data()?.role || 'user';

  return userRef.set({
    uid,
    full_name,
    email,
    role,
    created_at:
      user.data()?.created_at || firestore.FieldValue.serverTimestamp(),
  });
};

const signUp = async ({ full_name, email, password, confirmPassword }) => {
  if (!full_name || !email || !password)
    throw new Error('Please enter all fields.');

  if (password !== confirmPassword)
    throw new Error("Your password and confirm password doesn't match.");

  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      const { uid } = res.user;
      auth().currentUser.updateProfile({
        displayName: full_name,
      });
      return uid;
    })
    .then(uid => createUserInDb({ uid, full_name, email }));
};

const signIn = ({ email, password }) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const forgetPassword = email => {
  if (!email) {
    Alert.alert('Error', 'Please enter email');
  }
  return auth().sendPasswordResetEmail(email);
};

// signout user
const signOut = async token => {
  NetInfo.fetch().then(state => {
    if (state.isConnected && token) {
      firestore()
        .collection('tokens')
        .doc(token)
        .delete()
        .then(_ => auth().signOut())
        .catch(err => console.log(err));
    } else return;
  });
};

// get user from database
const getUserById = async uid => {
  // eslint-disable-next-line curly
  if (!uid) return;

  return firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(documentSnap => documentSnap.data());
};

//update profile
const updateProfile = async ({ id, user }) => {
  // eslint-disable-next-line curly
  if (!id) return;

  return firestore()
    .collection('users')
    .doc(id)
    .update({
      full_name: user.full_name || '',
      phone_no: user.phone_no || '',
      dob: user?.dob || '',
      updated_at: firestore.Timestamp.now(),
    });
};

// update Profile picture
const updateProfilePicture = async ({ prevImageUri, uid, url }) => {
  return StorageService.uploadImage(prevImageUri, url, uid).then(url =>
    firestore().collection('users').doc(uid).update({
      user_profile: url,
    }),
  );
};

const Auth = {
  signUp,
  signIn,
  signOut,
  forgetPassword,
  googleSignIn,
  getUserById,
  updateProfile,
  createUserInDb,
  updateProfilePicture,
};

export default Auth;
