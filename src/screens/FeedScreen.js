import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

const imageUrls = [
  'https://s2-techtudo.glbimg.com/CDCDKUhS0FMmWH6daMavnixT6cg=/0x0:1024x609/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg',
  'https://conteudo.imguol.com.br/c/noticias/1c/2022/05/24/imagem-criada-no-imagen-prototipo-do-google-que-cria-imagens-baseadas-em-texto-neste-caso-um-cachorro-corgi-andando-de-bicicleta-na-times-square-usando-oculos-de-sol-e-chapeu-de-praia-1653397634334_v2_900x506.jpg',
  'data:image/png;base64,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',
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
