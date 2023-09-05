import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';

import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import ButtonType from '../components/ButtonType';
import FooterBar from '../components/FooterBar';

const PostImageScreen = () => {
    const [getImage, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async () => {
        try {
            const response = await fetch(getImage);
            const blob = await response.blob();

            const storageRef = ref(storage, 'images/' + Date.now());
            const uploadTask = uploadBytes(storageRef, blob);

            await uploadTask;

            const imageURL = await getDownloadURL(storageRef);
            setImageToFirebase(imageURL);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    const setImageToFirebase = async (imageURL) => {
        try {
            const ref = collection(db, 'images');
            await addDoc(ref, { imageURL });

            console.log('Image URL added to Firestore');
            setImage(null);
        } catch (error) {
            console.error('Error adding image URL to Firestore: ', error);
            setImage(null);
        }
    };

    return (
        <>
            <Animatable.View
                animation="fadeInLeftBig"
                delay={100}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 30,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: '#000',
                        paddingBottom: 5,
                        fontWeight: 'bold',
                        width: '90%',
                        textAlign: 'center',
                    }}
                >
                    Publicar Imagem
                </Text>

                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                    }}
                >

                    {getImage
                    ?
                        <>
                            <View
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <Image source={{ uri: getImage }} style={{ width: 200, height: 200 }} />
                            </View>
                            <View
                                style={{
                                    width: '90%',
                                    marginTop: 10,
                                    marginBottom: 20,
                                }}
                            >
                                <ButtonType
                                    onPress={() => uploadImageToFirebase()}
                                >
                                    Enviar
                                </ButtonType>
                            </View>
                        </>
                    :
                        <View
                            style={{
                                width: '90%',
                                marginTop: 10,
                                marginBottom: 20,
                            }}
                        >
                            <ButtonType
                                onPress={() => pickImage()}
                            >
                                Selecionar Imagem
                            </ButtonType>
                        </View>
                    }

                </View>
                
            </Animatable.View>
            <FooterBar active={1} link={'HomeScreen'} />
        </>
    );
}

export default PostImageScreen;