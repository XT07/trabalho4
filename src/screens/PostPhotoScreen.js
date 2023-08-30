import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

const ImageUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission denied for accessing media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!selectedImage) {
      console.error('No image selected.');
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + selectedImage.split('/').pop());
    const response = await fetch(selectedImage);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    const db = getFirestore();
    const imagesCollection = collection(db, 'images');

    try {
      await addDoc(imagesCollection, { imageUrl: downloadURL });
      console.log('Image uploaded and Firestore document added successfully.');
    } catch (error) {
      console.error('Error adding Firestore document:', error);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={uploadImageToFirebase} />
    </View>
  );
};

export default ImageUploadComponent;
