import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import bibli from './../img/images.png';

const PesquisaObra = () => {
  const [pesquisa, setPesquisa] = useState('');
  
  // Exemplo de dados fictícios para os livros
  const [obras, setObras] = useState([
    { id: '1', nome: 'Avatar', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '2', nome: 'Minecraft', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '3', nome: 'Homem Aranha', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '4', nome: 'Vingadores', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '5', nome: 'Venom', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '6', nome: 'Devil Hunter', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    // Adicione mais livros conforme necessário
  ]);

  // Filtra as obras com base no termo de pesquisa
  const obrasFiltradas = obras.filter((obra) =>
    obra.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardAuthor}>{item.autor}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem no topo */}
      <View style={styles.imageContainer}>
        <Image
          source={bibli}
          style={styles.topImage}
        />
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise uma obra"
          value={pesquisa}
          onChangeText={(text) => setPesquisa(text)} // Atualiza o estado da pesquisa
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Grid de Livros Filtrados */}
      <FlatList
        data={obrasFiltradas} // Exibe apenas as obras filtradas
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      {/* Rodapé com botões */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Registre sua história</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Seja um leitor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfa',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  
  // Estilos para a imagem no topo
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  
  topImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },

  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  
  searchButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  searchButtonText: {
    fontSize: 18,
    color: '#333',
  },

   grid:{
     justifyContent:'space-between',
     paddingBottom :20 
   },

   card:{
     alignItems:'center',
     marginBottom :20, // Espaçamento vertical entre os cards
     marginHorizontal :10 // Espaçamento horizontal entre os cards
   },

   cardImage:{
     width :100 ,
     height :150 ,
     borderRadius :8 ,
     backgroundColor:'#DDD'
   },

   cardTitle:{
     fontSize :14 ,
     fontWeight :'bold' ,
     textAlign:'center',
     marginTop :8 
   },

   cardAuthor:{
     fontSize :12 ,
     color :'#666' ,
     textAlign :'center'
   },

   footer:{
     flexDirection:'row',
     justifyContent:'space-around',
     paddingVertical :20 ,
     backgroundColor:'#042c45'
   },

   footerButton:{
     backgroundColor:'#fbfbfa',
     paddingVertical :10 ,
     paddingHorizontal :20 ,
     borderRadius :8 
   },

   footerButtonText:{
     color:'#042c45',
     fontWeight:'bold'
   }
});

export default PesquisaObra;