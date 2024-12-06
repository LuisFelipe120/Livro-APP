import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Buscar from '../../components/buscar';

const MaisLidas = () => {
  // Dados fictícios para exibir os livros
  const livros = [
    {
      id: '1',
      titulo: 'True Potential',
      imagem: 'https://via.placeholder.com/150',
      avaliacao: 4,
    },
    {
      id: '2',
      titulo: 'The Mind of a Leader',
      imagem: 'https://via.placeholder.com/150',
      avaliacao: 5,
    },
    {
      id: '3',
      titulo: 'Unlock Your Potential',
      imagem: 'https://via.placeholder.com/150',
      avaliacao: 3,
    },
    {
        id: '4',
        titulo: 'True Potential',
        imagem: 'https://via.placeholder.com/150',
        avaliacao: 4,
      },
      {
        id: '5',
        titulo: 'The Mind of a Leader',
        imagem: 'https://via.placeholder.com/150',
        avaliacao: 5,
      },
      {
        id: '6',
        titulo: 'Unlock Your Potential',
        imagem: 'https://via.placeholder.com/150',
        avaliacao: 3,
      },
  ];

  // Renderização dos livros
  const renderLivro = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.capa} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.avaliacao}>{'⭐'.repeat(item.avaliacao)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Buscar/>
      </View>
      <Text style={styles.tituloSecao}>Mais lidas da semana</Text>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={renderLivro}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  saudacao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  lista: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    width: '48%',
    elevation: 2, // Para sombra no Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, // Para sombra no iOS
  },
  capa: {
    width: 100,
    height: 150,
    borderRadius: 4,
    marginBottom: 8,
  },
  info: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  avaliacao: {
    fontSize: 14,
    color: '#FFA41B',
  },
});

export default MaisLidas;
