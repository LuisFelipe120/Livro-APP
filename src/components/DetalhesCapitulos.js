import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';

const DetalhesCapitulos = () => {
  const [livro, setLivro] = useState(null); // Estado para as informações do livro
  const [episodios, setEpisodios] = useState([]); // Estado para os capítulos
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal de avaliação
  const [avaliacao, setAvaliacao] = useState(''); // Armazena a avaliação do usuário

  // Busca dados do livro e dos episódios ao montar o componente
  useEffect(() => {
    const fetchDados = async () => {
      try {
        // Substituir pelos endpoints reais da sua API
        const livroResponse = await fetch('https://suaapi.com/livro/1');
        const livroData = await livroResponse.json();
        setLivro(livroData);

        const episodiosResponse = await fetch('https://suaapi.com/livro/1/episodios');
        const episodiosData = await episodiosResponse.json();
        setEpisodios(episodiosData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados();
  }, []);

  // Envia a avaliação do usuário para a API
  // const enviarAvaliacao = async () => {
  //   try {
  //     await fetch('https://suaapi.com/livro/1/avaliar', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ avaliacao: parseFloat(avaliacao) }),
  //     });
  //     setModalVisible(false);
  //     setAvaliacao('');
  //     alert('Avaliação enviada com sucesso!');
  //   } catch (error) {
  //     console.error('Erro ao enviar avaliação:', error);
  //     alert('Erro ao enviar avaliação.');
  //   }
  // };

  // Renderização de cada episódio
  const renderEpisodio = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.episodioTitulo}>{item.titulo}</Text>
        <Text style={styles.episodioData}>{item.data}</Text>
        <Text style={styles.episodioCurtidas}>{item.curtidas} likes</Text>
      </View>
    </View>
  );

  if (!livro) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image source={{ uri: livro.imagem }} style={styles.backgroundImage} />
        <View style={styles.overlay} />

        <View style={styles.headerContent}>
          <Text style={styles.categoria}>{livro.categoria}</Text>
          <Text style={styles.tituloPrincipal}>{livro.titulo}</Text>
          <Text style={styles.autor}>{livro.autor}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>{livro.visualizacoes} views</Text>
            <Text style={styles.stats}>{livro.curtidas} likes</Text>
            <Text style={styles.stats}>⭐ {livro.avaliacao}</Text>

            {/* Botão "Rate" */}
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.rateText}>Avaliação</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Lista de episódios */}
      <FlatList
        data={episodios}
        keyExtractor={(item) => item.id}
        renderItem={renderEpisodio}
        contentContainerStyle={styles.lista}
      />

      {/* Modal para avaliação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Avalie o livro</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua avaliação (0-10)"
              keyboardType="numeric"
              value={avaliacao}
              onChangeText={setAvaliacao}
            />
            <Button title="Enviar Avaliação" onPress={enviarAvaliacao} />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 240,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  categoria: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
  },
  tituloPrincipal: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 7,
  },
  autor: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stats: {
    fontSize: 14,
    color: '#FFF',
    marginRight: 16,
  },
  rateButton: {
    backgroundColor: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  rateText: {
    color: '#6200EE',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalClose: {
    marginTop: 10,
    color: '#6200EE',
    fontWeight: 'bold',
  },
});

export default DetalhesCapitulos;
