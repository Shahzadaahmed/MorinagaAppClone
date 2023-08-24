import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import {
  UserAvatarSvg,
  EditSvg,
  ActiveStar,
  AvatarSvg1,
  AvatarSvg3,
} from '../asset/svg';
import { colors, fonts, screenWidth } from '../constants';
import { moderateScale } from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';

export default function Edit({
  text,
  selectedImage,
  setSelectedImage,
  kidgender,
}) {
  const handleEditButtonPress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.7,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.avatarImage} />
        ) : kidgender ? (
          <AvatarSvg1 />
        ) : (
          <AvatarSvg3 />
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditButtonPress}>
          <EditSvg />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    right: -15,
    bottom: -15,
  },
  text: {
    ...fonts.subHeadUser2,
    color: colors.primary,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(25),
  },
  icon: {
    position: 'relative',
    marginTop: moderateScale(20),
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.white,
  },
});
