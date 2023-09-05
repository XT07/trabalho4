import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

const imageUrls = [
  'https://s2-techtudo.glbimg.com/CDCDKUhS0FMmWH6daMavnixT6cg=/0x0:1024x609/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg',
  'https://conteudo.imguol.com.br/c/noticias/1c/2022/05/24/imagem-criada-no-imagen-prototipo-do-google-que-cria-imagens-baseadas-em-texto-neste-caso-um-cachorro-corgi-andando-de-bicicleta-na-times-square-usando-oculos-de-sol-e-chapeu-de-praia-1653397634334_v2_900x506.jpg',
  'https://media.istockphoto.com/id/1322104312/pt/foto/freedom-chains-that-transform-into-birds-charge-concept.jpg?s=612x612&w=0&k=20&c=e5oxSsSFlsD8bdgXTCKNW4X0POTo1hs7nqAaNOeLgoo=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKBSCtRnTVwEIkQskyVOfphWKQlXRDgDFkGX1wRcqvDQ&s',
]
;
const FeedScreen = ({navigation}) => {
  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imageUrls}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Postar" onPress={() => {navigation.navigate("PostPhotoScreen")}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
});

export default FeedScreen;
