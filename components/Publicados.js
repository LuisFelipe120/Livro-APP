import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { getGeneros, getLivros } from '../src/services/fetchs';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20;

const Publicados = () => {
  const navigation = useNavigation();
  const { data: livros, error, isLoading } = useQuery({ queryKey: ['getLivros'], queryFn: getLivros });
  const IMAGE_BASE_URL = 'http://10.57.45.29:3333/images/';
  //  const IMAGE_BASE_URL = 'http://192.168.1.101:3333/images/';

  const { data: generos, isLoading: loadingGeneros } = useQuery({
    queryKey: ["getGeneros"],
    queryFn: getGeneros // Função que busca os gêneros da API
  });
  const [livrosComGeneros, setLivrosComGeneros] = useState([]);
console.log(livros)
  useEffect(() => {
    if (livros && generos) {
      const livrosComGenerosAtualizados = livros.map((livro) => ({
        ...livro,
        generoNome: findGenero(livro.generos_id),
      }));
      setLivrosComGeneros(livrosComGenerosAtualizados);
    }
  }, [livros, generos]);

  // Função para buscar o gênero baseado no generos_id
  const findGenero = (generosId) => {
    if (!generos) {
      console.log('Generos ainda não carregados');
      return ''; // Se generos ainda não foi carregado
    }
    const genero = generos.find((g) => g.id === generosId);
    return genero ? genero.name : 'Gênero não encontrado';
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar..." />
      </View>

      <FlatList 
        data={livrosComGeneros}
        
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (          
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Capitulos', {
            livroNome: item?.nome,
            livroImagem: item?.imagem,
            livroSinopse: item?.sinopse,
            
            itemId: item?.id,
          })} >
            <Image source={{ uri: IMAGE_BASE_URL + item.imagem }} resizeMode='cover' style={styles.bookImage} />
            <View style={styles.overlay}>
              <Text style={styles.bookTitle}>{item.nome}</Text>
              <Text style={styles.bookTitle}>{item.sinopse}</Text>
              <Text style={styles.bookTitle}>{item.tags}</Text>
              <Text style={styles.bookTitle}>{item.generoNome}</Text>

            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.addBoxContainer}>
        <TouchableOpacity style={styles.addBox} onPress={() => navigation.navigate('CadastroLivro')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  searchContainer: { paddingHorizontal: 16, marginBottom: 10 },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#fff' },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    width: cardWidth,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookImage: { 
    width: '100%', 
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  bookTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center',
  },
  addBoxContainer: { alignItems: 'center', marginVertical: 20 },
  addBox: { width: 80, height: 80, backgroundColor: '#e0e0e0', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  addIcon: { fontSize: 32, color: '#333' },
  loadingText: { textAlign: 'center', fontSize: 16, marginTop: 20, color: '#666' },
});

export default Publicados;
