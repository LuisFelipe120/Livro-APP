import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const Episodios = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controle do Modal
  const [avaliacao, setAvaliacao] = useState(0); // Armazena a avaliação em estrelas
  const [comentario, setComentario] = useState(''); // Armazena o comentário do usuário
  const [abaAtiva, setAbaAtiva] = useState('episodios'); // Controla qual aba está ativa
  const [avaliacoes, setAvaliacoes] = useState([]); // Armazena as avaliações enviadas

  const livro = {
    imagemCapa: 'https://via.placeholder.com/150',
    categoria: 'Ficção Científica',
    titulo: 'O Guia do Mochileiro das Galáxias',
    autor: 'Douglas Adams',
    views: 1000,
    likes: 500,
    avaliacao: 4.5,
  };

  const episodios = [
    { id: '1', titulo: 'Episódio 1: O Começo', data: '01/01/2023', curtidas: 120 },
    { id: '2', titulo: 'Episódio 2: A Jornada', data: '08/01/2023', curtidas: 150 },
    { id: '3', titulo: 'Episódio 3: O Desafio', data: '15/01/2023', curtidas: 200 },
  ];

  const handleCancelar = () => {
    // Função chamada ao cancelar
    setModalVisible(false);
    setAvaliacao(0);
    setComentario('');
  };

  const handleAvaliar = () => {
    // Adiciona a nova avaliação à lista de avaliações
    const novaAvaliacao = {
      id: String(avaliacoes.length + 1),
      autor: 'Usuário Anônimo', // Pode ser substituído por um nome real
      estrelas: avaliacao,
      comentario: comentario,
    };
    setAvaliacoes([...avaliacoes, novaAvaliacao]);
    setModalVisible(false);
    setAvaliacao(0);
    setComentario('');
  };

  const renderEstrelas = (quantidade) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <Text key={i} style={i <= quantidade ? styles.estrelaSelecionada : styles.estrela}>
          ★
        </Text>
      );
    }
    return estrelas;
  };

  const renderEpisodio = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.episodioTitulo}>{item.titulo}</Text>
        <Text style={styles.episodioData}>{item.data}</Text>
        <Text style={styles.episodioCurtidas}>{item.curtidas} likes</Text>
      </View>
    </View>
  );

  const renderAvaliacao = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.avaliacaoAutor}>{item.autor}</Text>
        <View style={styles.estrelasContainer}>{renderEstrelas(item.estrelas)}</View>
        <Text style={styles.avaliacaoComentario}>{item.comentario}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com informações do livro */}
      <View style={styles.header}>
        <Image source={{ uri: livro.imagemCapa }} style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.categoria}>{livro.categoria}</Text>
          <Text style={styles.tituloPrincipal}>{livro.titulo}</Text>
          <Text style={styles.autor}>{livro.autor}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>{livro.views} views</Text>
            <Text style={styles.stats}>{livro.likes} likes</Text>
            <Text style={styles.stats}>⭐ {livro.avaliacao}</Text>
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => setModalVisible(true)} // Abre o modal ao clicar
            >
              <Text style={styles.rateText}>Avaliação</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Botões para alternar entre Episódios e Recomendações */}
      <View style={styles.botoesAba}>
        <TouchableOpacity
          style={[styles.botaoAba, abaAtiva === 'episodios' && styles.botaoAbaAtivo]}
          onPress={() => setAbaAtiva('episodios')}
        >
          <Text style={styles.textoBotaoAba}>Episódios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoAba, abaAtiva === 'capitulos' && styles.botaoAbaAtivo]}
          onPress={() => setAbaAtiva('capitulos')}
        >
          <Text style={styles.textoBotaoAba}>Novo Capitulo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoAba, abaAtiva === 'recomendacoes' && styles.botaoAbaAtivo]}
          onPress={() => setAbaAtiva('recomendacoes')}
        >
          <Text style={styles.textoBotaoAba}>Recomendações</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe a lista de episódios ou recomendações com base na aba ativa */}
      {abaAtiva === 'episodios' ? (
        <FlatList
          data={episodios}
          keyExtractor={(item) => item.id}
          renderItem={renderEpisodio}
          contentContainerStyle={styles.lista}
        />
      ) : (
        <FlatList
          data={avaliacoes}
          keyExtractor={(item) => item.id}
          renderItem={renderAvaliacao}
          contentContainerStyle={styles.lista}
        />
      )}

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
            <View style={styles.estrelasContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => setAvaliacao(i)}>
                  <Text style={i <= avaliacao ? styles.estrelaSelecionada : styles.estrela}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Deixe um comentário (opcional)"
              value={comentario}
              onChangeText={setComentario}
              multiline
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
  botoesAba: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  botaoAba: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  botaoAbaAtivo: {
    backgroundColor: '#6200EE',
  },
  textoBotaoAba: {
    fontSize: 16,
    color: '#000',
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
  avaliacaoAutor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  avaliacaoComentario: {
    fontSize: 14,
    color: '#666',
  },
  estrelasContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  estrela: {
    fontSize: 30, // Tamanho original das estrelas
    color: '#DDD',
    margin: 5,
  },
  estrelaSelecionada: {
    fontSize: 30, // Tamanho original das estrelas
    color: '#FFD700', // Cor de estrela selecionada
    margin: 5,
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
    minHeight: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Episodios;