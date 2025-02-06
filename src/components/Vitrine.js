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
  Animated,
} from 'react-native';
import bibli from './../img/images.png';
import { useNavigation } from '@react-navigation/native';

const PesquisaObra = () => {
  const navigation = useNavigation();
  const [pesquisa, setPesquisa] = useState('');
  const [footerVisible, setFooterVisible] = useState(true);
  const footerHeight = new Animated.Value(footerVisible ? 70 : 30); // Define altura de 70px quando maximizado
  const footerPosition = new Animated.Value(50); // Posição inicial da seta

  const toggleFooter = () => {
    Animated.timing(footerHeight, {
      toValue: footerVisible ? 30 : 70, // Alterna entre 30px e 70px
      duration: 300,
      useNativeDriver: false,
    }).start(() => setFooterVisible(!footerVisible));

    Animated.timing(footerPosition, {
      toValue: footerVisible ? 10 : 50, // Move a seta para cima ou para baixo
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const [obras] = useState([
    { id: '1', nome: 'Avatar', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '2', nome: 'Minecraft', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '3', nome: 'Homem Aranha', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '4', nome: 'Vingadores', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '5', nome: 'Venom', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
    { id: '6', nome: 'Devil Hunter', autor: 'Desconhecido', imagem: 'https://via.placeholder.com/100' },
  ]);

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
      <View style={styles.imageContainer}>
        <Image source={bibli} style={styles.topImage} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise uma obra"
          value={pesquisa}
          onChangeText={setPesquisa}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={obrasFiltradas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      {/* Seta lateral para minimizar */}
      <Animated.View
        style={[styles.toggleFooterButton, { bottom: footerPosition }]}
      >
        <TouchableOpacity
          style={styles.toggleFooterButtonInner}
          onPress={toggleFooter}
        >
          <Text style={styles.toggleFooterButtonText}>
            {footerVisible ? '▼' : '▲'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.footer, { height: footerHeight }]}>
        {/* Rodapé maximizado: área branca com os botões */}
        {footerVisible && (
          <View style={styles.footerContent}>
            <TouchableOpacity 
              style={styles.footerButton}
              onPress={() => navigation.navigate('CadastroUsuario')}
            >
              <Text style={styles.footerButtonText}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.footerButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Quando minimizado, só aparece a área azul */}
        {!footerVisible && <View style={styles.footerBlueArea} />}
      </Animated.View>
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

  grid: {
    justifyContent: 'space-between',
    paddingBottom: 20,
  },

  card: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },

  cardImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#DDD',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  cardAuthor: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  footer: {
    flexDirection: 'column', // Muda para coluna para o conteúdo centralizar melhor
    justifyContent: 'center',
    backgroundColor: '#042c45',
    overflow: 'hidden',
    paddingVertical: 8, // Garantir que o footer tenha algum espaço mesmo minimizado
    alignItems: 'center', // Centraliza a área dos botões
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Espalha os botões uniformemente
    alignItems: 'center',
    width: '106%', // Garante que os botões não ocupem a largura total
  },

  footerButton: {
    backgroundColor: '#fbfbfa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  footerButtonText: {
    color: '#042c45',
    fontWeight: 'bold',
  },

  toggleFooterButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
  },

  toggleFooterButtonInner: {
    padding: 8,
  },

  toggleFooterButtonText: {
    fontSize: 24,
    color: '#042c45',
    textAlign: 'center',
  },

  footerBlueArea: {
    width: '100%',
    height: 30, // Tamanho da área azul quando minimizado
    backgroundColor: '#042c45',
  },
});

export default PesquisaObra;
