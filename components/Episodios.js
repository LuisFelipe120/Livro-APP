import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { getLivro, getEpisodios } from '../services/fetchs';  // Importando as funções da pasta services
import axios from 'axios';
 
const Episodios = () => {
  const [livro, setLivro] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [erro, setErro] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Controle do Modal
  const [avaliacao, setAvaliacao] = useState(0); // Armazena a avaliação em estrelas
  const [comentario, setComentario] = useState(''); // Armazena o comentário do usuário
 
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const livroData = await getLivro(1); // Puxa o livro com ID 1
        setLivro(livroData);
 
        const episodiosData = await getEpisodios(1); // Puxa os episódios do livro 1
        setEpisodios(episodiosData);
      } catch (error) {
        setErro('Erro ao buscar dados.');
        console.error(error);
      }
    };
 
    fetchDados();
  }, []);
 
  const handleAvaliar = async () => {
    try {
      // Enviar a avaliação para a API
    //   const response = await axios.post(hhttp://localhost:3333/avaliacao, {
    //     avaliacao,
    //     comentario,
    //   });
      console.log('Avaliação enviada:', response.data);
      alert('Avaliação enviada com sucesso!');
      setModalVisible(false);
      setAvaliacao(0);
      setComentario('');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      alert('Erro ao enviar avaliação.');
    }
  };
 
  const handleCancelar = () => {
    // Função chamada ao cancelar
    setModalVisible(false);
    setAvaliacao(0);
    setComentario('');
  };
 
  const renderEstrelas = () => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <TouchableOpacity key={i} onPress={() => setAvaliacao(i)}>
          <Text style={i <= avaliacao ? styles.estrelaSelecionada : styles.estrela}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return estrelas;
  };
 
  if (erro) {
    return <Text>{erro}</Text>;
  }
 
  const renderEpisodio = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.episodioTitulo}>{item.titulo}</Text>
        <Text style={styles.episodioData}>{item.data}</Text>
        <Text style={styles.episodioCurtidas}>{item.curtidas} likes</Text>
      </View>
    </View>
  );
 
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com informações do livro */}
      <View style={styles.header}>
        <Image source={{uri: livro?.imagemCapa}} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.categoria}>{livro?.categoria}</Text>
          <Text style={styles.tituloPrincipal}>{livro?.titulo}</Text>
          <Text style={styles.autor}>{livro?.autor}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>{livro?.views} views</Text>
            <Text style={styles.stats}>{livro?.likes} likes</Text>
            <Text style={styles.stats}>⭐ {livro?.avaliacao}</Text>
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => setModalVisible(true)} // Abre o modal ao clicar
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
 
      {/* Modal de Avaliação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelar}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Avalie o livro</Text>
            <View style={styles.estrelasContainer}>{renderEstrelas()}</View>
            <TextInput
              style={styles.input}
              placeholder="Deixe um comentário (opcional)"
              value={comentario}
              onChangeText={setComentario}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={handleCancelar} />
              <Button title="Enviar Avaliação" onPress={handleAvaliar} />
            </View>
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
    marginBottom: 16,
    alignItems: 'center',
  },
  stats: {
    fontSize: 14,
    color: '#FFF',
    marginRight: 16,
  },
  rateButton: {
    backgroundColor: '#FFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  rateText: {
    color: '#6200EE',
    fontWeight: 'bold',
    fontSize: 12,
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardContent: {
    justifyContent: 'center',
  },
  episodioTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  episodioData: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  episodioCurtidas: {
    fontSize: 14,
    color: '#FFA41B',
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
  estrelasContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  estrela: {
    fontSize: 30,
    color: '#DDD',
    margin: 5,
  },
  estrelaSelecionada: {
    fontSize: 30,
    color: '#FFD700', // Cor de estrela selecionada
    margin: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
 
export default Episodios;

