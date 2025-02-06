import React, { useEffect, useState } from 'react';
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
import { getCapitulos, getLidos, getLivros } from '../services/fetchs';
import { useQuery } from '@tanstack/react-query';

const MaisLidas = () => {
  // Dados fictícios para exibir os livros
  const { data: leitura, error, isLoading } = useQuery({ queryKey: ['getLidos'], queryFn: getLidos });
  const { data: capitulos, isLoading: loadingCapitulos } = useQuery({ queryKey: ['getCapitulos'], queryFn: getCapitulos });
  const { data: livros, isLoading: loadingLivros } = useQuery({ queryKey: ['getLivros'], queryFn: getLivros });
  const IMAGE_BASE_URL = 'http://10.57.45.29:3333/images/';

  const [capitulosLidos, setCapitulosLidos] = useState([]);
  const findLivro = (livrosId) => {
    if (!livros || livros.length === 0) return { nome: "Livro não encontrado", imagem: "Imagem não encontrada" };
    
    const livro = livros.find((livro) => livro.id === livrosId);
    if (livro) {
      return { nome: livro.nome, imagem: livro.imagem }; // Retorna o nome e a imagem
    }
    
    return { nome: "Livro não encontrado", imagem: "Imagem não encontrada" }; // Retorna mensagens padrão caso não encontre
  };
  

  useEffect(() => {
    if (leitura && capitulos && livros) {
      const livrosCompletos = leitura.map((itemLeitura) => {
        // Encontra o capítulo correspondente
        const capitulo = capitulos.find((cap) => cap.id === itemLeitura.id);
        
        // Recupera o nome e imagem do livro usando a função findLivro
        const { nome: livroNome, imagem: livroImagem } = capitulo ? findLivro(capitulo.livros_id) : { nome: "Livro não encontrado", imagem: "Imagem não encontrada" };
        
        return {
          ...itemLeitura,
          capituloNome: capitulo ? capitulo.nome : "Capítulo não encontrado",
          livroNome: livroNome,
          livroImagem: livroImagem
        };
      });
  
      setCapitulosLidos(livrosCompletos);
    }
  }, [leitura, capitulos, livros]);
  

  return (
    <SafeAreaView style={styles.container}>
 
      <Text style={styles.tituloSecao}>Mais lidas da semana</Text>
      <FlatList
        data={capitulosLidos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: IMAGE_BASE_URL + item.livroImagem }} resizeMode='cover' style={styles.bookImage} />
            <View style={styles.info}>
              <Text style={styles.livroNome}>{item.livroNome}</Text>
              <Text style={styles.capituloNome}>{item.capituloNome}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    elevation: 5, // Para sombra no Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6, // Para sombra no iOS
    marginBottom: 20,
  },
  bookImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  info: {
    alignItems: 'center',
  },
  livroNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  capituloNome: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default MaisLidas;
