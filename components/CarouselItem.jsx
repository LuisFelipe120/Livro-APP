import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const ItemCarousel = () => {

const catalogos = 
    [
        {
          id: 1,
          titulo: "Fantasia e Aventura",
          descricao: "Explore mundos mágicos e histórias cheias de ação.",
          imagem: 'fantasia',
        },
        {
          id: 2,
          titulo: "Romances Clássicos",
          descricao: "Redescubra as histórias de amor que marcaram gerações.",
          imagem: "romance",
        },
        {
          id: 3,
          titulo: "Suspense e Mistério",
          descricao: "Mergulhe em enredos cheios de reviravoltas e enigmas.",
          imagem: "suspense",
        },
        {
          id: 4,
          titulo: "Ciência e Tecnologia",
          descricao: "Conheça as inovações e descobertas que moldam o futuro.",
          imagem: "ciencia",
        }
]
const getImage = (imageName) => {
    const images = {
      fantasia: require('./../images/fantasia.jpg'),
      romance: require('./../images/romance.jpg'),
      suspense: require('./../images/supense.jpg'),
      ciencia: require('./../images/ciencia.jpg')
    };
  
    return images[imageName];
  };
const renderCard = ({ item }) => (
    <View style={styles.card}>
   <Image
        source={getImage(item.imagem)}
        style={styles.image} 
      />
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.description}>{item.descricao}</Text>
    </View>
  );

  return (
    <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}    
    
      data={catalogos}
      renderItem={renderCard}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  count: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});


export default ItemCarousel