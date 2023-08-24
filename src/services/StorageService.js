import storage from '@react-native-firebase/storage';

const uploadImage = async (prevImageUri, imageUri, uid) => {
  let reference;

  if (prevImageUri === imageUri) return;

  if (prevImageUri && typeof prevImageUri !== 'string') {
    reference = storage().refFromURL(prevImageUri);
  } else {
    reference = storage().ref(`${uid ? uid : Date.now()}.jpg`);
  }

  return reference
    .putFile(imageUri)
    .then(_ => reference.getDownloadURL()) //storage url download
    .then(url => url) //return storage url of image
    .catch(err => console.log(err)); // return error
};

const StorageService = {
  uploadImage,
};

export default StorageService;
