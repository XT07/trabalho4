import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PostPhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleUpload = () => {
    // Aqui você pode adicionar lógica para enviar a imagem
    // para um servidor ou armazenamento na nuvem
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Postar Foto</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Button title="Escolher Foto" onPress={pickImage} />
      {selectedImage && <Button title="Enviar" onPress={handleUpload} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default PostPhotoScreen;
