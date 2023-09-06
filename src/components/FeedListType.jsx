import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

import { storage } from '../configs/firebase';
import { ref, getDownloadURL, listAll, deleteObject } from 'firebase/storage';

import { Ionicons } from '@expo/vector-icons';

const ImageListType = ({admin}) => {
    const [imageUrls, setImageUrls] = useState([]);

    const [likedItems, setLikedItems] = useState({});
    const [savedItems, setSavedItems] = useState({});

    const [imageClickCount, setImageClickCount] = useState({});

    const renderImages = () => {
        const imagesRef = ref(storage, 'images/');
    
        listAll(imagesRef)
        .then((result) => {
            const urls = [];
            result.items.forEach((imageRef) => {
                getDownloadURL(imageRef).then((url) => {
                    urls.push(url);
                    setImageUrls(urls);
                });
            });
        })
        .catch((error) => {
            console.error('Error listing images: ', error);
        });
    };

    const handleLikeToggle = (itemId) => {
        setLikedItems((prevLikedItems) => ({...prevLikedItems, [itemId]: !prevLikedItems[itemId]}));
    };

    const handleSavedToggle = (itemId) => {
        setSavedItems((prevSavedItems) => ({...prevSavedItems, [itemId]: !prevSavedItems[itemId]}));
    };

    const handleDeleteImage = async (imageUrl) => {
        try {
            await deleteObject(ref(storage, imageUrl));
            console.log('Image deleted successfully');

            renderImages();
        } catch (error) {
            console.error('Error deleting image: ', error);
        }
    };

    const handleImageClick = (index) => {
        if (imageClickCount[index] === 1) {
            handleLikeToggle(index);
        }
    
        setImageClickCount(prevClickCount => ({
            ...prevClickCount,
            [index]: prevClickCount[index] ? prevClickCount[index] + 1 : 1
        }));
    
        setTimeout(() => {
            setImageClickCount(prevClickCount => ({
                ...prevClickCount,
                [index]: 0
            }));
        }, 1000);
    };

    useEffect(() => {
        renderImages();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
            }}
        >
            {imageUrls.length >= 1
            ?
                <ScrollView
                    style={{
                        width: '100%',
                        height: 200,
                    }}
                >

                    <FlatList
                        data={imageUrls}
                        style={{
                            width: '100%',
                            flex: 1,
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <>
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        padding: 10,
                                        margin: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            #{index + 1}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10,
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => handleImageClick(index)}
                                            onLongPress={() => handleLikeToggle(index)}
                                        >
                                            <Image source={{ uri: item }} style={{
                                                width: 250,
                                                height: 250,
                                                borderWidth: 1,
                                                borderColor: '#000',
                                                borderRadius: 5,
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Ionicons
                                                style={{ marginRight: 5}}
                                                name={likedItems[index] ? 'heart' : 'heart-outline'}
                                                size={24}
                                                color={likedItems[index] ? 'red' : 'black'}
                                                onPress={() => handleLikeToggle(index)}
                                            />
                                            <Ionicons name='chatbubble-outline' size={24} color='black' />
                                        </View>
                                        <View
                                            style={{
                                                marginRight: 5,
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Ionicons style={{marginRight: 5}} name='send-outline' size={24} color='black' />
                                            <Ionicons
                                                style={{ marginRight: 5 }}
                                                name={savedItems[index] ? 'bookmark' : 'bookmark-outline'}
                                                size={24}
                                                color={savedItems[index] ? 'black' : 'black'}
                                                onPress={() => handleSavedToggle(index)}
                                            />
                                        </View>
                                    </View>
                                    {admin
                                    ?
                                        <View
                                            style={{
                                                marginTop: 20,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'rgba(255, 0, 0, .1)',
                                                    padding: 5,
                                                    width: '70%',
                                                    borderRadius: 5,
                                                }}
                                            >
                                                <Ionicons name='trash-outline' size={24} color='red' onPress={() => handleDeleteImage(item)} />
                                                <Text
                                                    style={{
                                                        color: 'red',
                                                    }}
                                                >
                                                    Excluir
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    :
                                        <></>
                                    }
                                </View>
                            </>
                        )}
                    />
                </ScrollView>
            :
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                    >
                    <Text
                        style={{
                            padding: 10,
                            backgroundColor: 'rgba(255, 0, 0, .1)',
                            fontSize: 15,
                            borderRadius: 5,
                            fontWeight: 'bold',
                            color: 'red',
                        }}
                    >
                        <Ionicons name='alert-circle' size={15} color='red' />
                         - Nenhuma imagem encontrada.
                    </Text>
                </View>
            }

        </View>
    );
};

export default ImageListType;