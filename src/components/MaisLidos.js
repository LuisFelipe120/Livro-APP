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

const [livrosLidos, setLivrosLidos] = useState([]);

useEffect(() => {
  if (leitura && capitulos && livros) {
    console.log("Dados de Leitura:", leitura);
    console.log("Dados de Capitulos:", capitulos);
    console.log("Dados de Livros:", livros);

    // Mapeando os capítulos lidos e associando o nome do livro
    const leituraComLivroAtualizado = leitura.map((capituloLido) => {
      // Verificando se o capituloLido tem capitulo_id
      console.log("Capítulo lido:", capituloLido);

      const capitulo = capitulos.find((cap) => cap.id === Number(capituloLido.capitulo_id)); // Certificando-se de que ambos são números
      console.log("Capítulo correspondente encontrado:", capitulo);

      if (capitulo) {
        const livro = livros.find((livro) => livro.id === capitulo.livros_id);
        console.log("Livro correspondente encontrado:", livro);

        const livroNome = livro ? livro.nome : 'Livro não encontrado';
        return { ...capituloLido, livroNome };
      }

      return { ...capituloLido, livroNome: 'Livro não encontrado' };
    });

    setLivrosLidos(leituraComLivroAtualizado); // Atualiza o estado com os dados completos
  }
}, [leitura, capitulos, livros]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Buscar/>
      </View>
      <Text style={styles.tituloSecao}>Mais lidas da semana</Text>
      <FlatList
        data={livrosLidos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => ( 
          <TouchableOpacity>
         <Text style={styles.titulo}>{item.livroNome}</Text>
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
