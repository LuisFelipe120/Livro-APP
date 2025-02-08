import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput, Button, Linking } from 'react-native';

const Episodios = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controle do Modal de Avaliação
  const [modalEnqueteVisible, setModalEnqueteVisible] = useState(false); // Controle do Modal de Criação de Enquete
  const [modalComentarioVisible, setModalComentarioVisible] = useState(false); // Controle do Modal de Comentário
  const [avaliacao, setAvaliacao] = useState(0); // Armazena a avaliação em estrelas
  const [comentario, setComentario] = useState(''); // Armazena o comentário do usuário
  const [abaAtiva, setAbaAtiva] = useState('arquivo'); // Controla qual aba está ativa
  const [avaliacoes, setAvaliacoes] = useState([]); // Armazena as avaliações enviadas
  const [novaEnquete, setNovaEnquete] = useState({ pergunta: '', opcoes: [] }); // Armazena a nova enquete
  const [novoComentario, setNovoComentario] = useState(''); // Armazena o novo comentário

  const livro = {
    imagemCapa: 'https://via.placeholder.com/150',
    titulo: 'O Guia do Mochileiro das Galáxias',
    sinopse: 'Uma aventura hilária e surreal pela galáxia, repleta de personagens excêntricos e situações absurdas.',
  };

  const [arquivos, setArquivos] = useState([
    { id: '1', nome: 'capitulo1.pdf', url: 'https://example.com/capitulo1.pdf' },
  ]);

  const [enquetes, setEnquetes] = useState([
    { id: '1', pergunta: 'Qual seu personagem favorito?', opcoes: ['Opção 1', 'Opção 2', 'Opção 3'] },
  ]);

  const [comentarios, setComentarios] = useState([
    { id: '1', autor: 'Usuário 1', texto: 'Adorei o capítulo!' },
  ]);

  const handleCancelar = () => {
    setModalVisible(false);
    setAvaliacao(0);
    setComentario('');
  };

  const handleAvaliar = () => {
    const novaAvaliacao = {
      id: String(avaliacoes.length + 1),
      autor: 'Usuário Anônimo',
      estrelas: avaliacao,
      comentario: comentario,
    };
    setAvaliacoes([...avaliacoes, novaAvaliacao]);
    setModalVisible(false);
    setAvaliacao(0);
    setComentario('');
  };

  const handleCriarEnquete = () => {
    const novaEnqueteCompleta = {
      id: String(enquetes.length + 1),
      pergunta: novaEnquete.pergunta,
      opcoes: novaEnquete.opcoes,
    };
    setEnquetes([...enquetes, novaEnqueteCompleta]);
    setModalEnqueteVisible(false);
    setNovaEnquete({ pergunta: '', opcoes: [] });
  };

  const handleAdicionarComentario = () => {
    const novoComentarioCompleto = {
      id: String(comentarios.length + 1),
      autor: 'Usuário Anônimo',
      texto: novoComentario,
    };
    setComentarios([...comentarios, novoComentarioCompleto]);
    setModalComentarioVisible(false);
    setNovoComentario('');
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

  const renderArquivo = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item.url)}>
      <View style={styles.cardContent}>
        <Text style={styles.arquivoNome}>{item.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEnquete = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.enquetePergunta}>{item.pergunta}</Text>
        {item.opcoes.map((opcao, index) => (
          <TouchableOpacity key={index} style={styles.opcaoEnquete}>
            <Text style={styles.opcaoTexto}>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderComentario = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.comentarioAutor}>{item.autor}</Text>
        <Text style={styles.comentarioTexto}>{item.texto}</Text>
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
          <Text style={styles.tituloPrincipal}>{livro.titulo}</Text>
          <Text style={styles.sinopse}>{livro.sinopse}</Text>
        </View>
      </View>

      {/* Botões para alternar entre Arquivo, Enquete e Comentários */}
      <View style={styles.botoesAbaContainer}>
        <View style={styles.botoesAba}>
          <TouchableOpacity
            style={styles.botaoAba}
            onPress={() => setAbaAtiva('arquivo')}
          >
            <Text style={[styles.textoBotaoAba, abaAtiva === 'arquivo' && styles.textoBotaoAbaAtivo]}>
              Ler
            </Text>
            {abaAtiva === 'arquivo' && <View style={styles.tracoAtivo} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoAba}
            onPress={() => setAbaAtiva('enquete')}
          >
            <Text style={[styles.textoBotaoAba, abaAtiva === 'enquete' && styles.textoBotaoAbaAtivo]}>
              Enquete
            </Text>
            {abaAtiva === 'enquete' && <View style={styles.tracoAtivo} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoAba}
            onPress={() => setAbaAtiva('comentarios')}
          >
            <Text style={[styles.textoBotaoAba, abaAtiva === 'comentarios' && styles.textoBotaoAbaAtivo]}>
              Comentários
            </Text>
            {abaAtiva === 'comentarios' && <View style={styles.tracoAtivo} />}
          </TouchableOpacity>
        </View>
        <View style={styles.linhaDivisoria} />
      </View>

      {/* Exibe a lista de arquivos, enquetes ou comentários com base na aba ativa */}
      {abaAtiva === 'arquivo' ? (
        <FlatList
          data={arquivos}
          keyExtractor={(item) => item.id}
          renderItem={renderArquivo}
          contentContainerStyle={styles.lista}
        />
      ) : abaAtiva === 'enquete' ? (
        <FlatList
          data={enquetes}
          keyExtractor={(item) => item.id}
          renderItem={renderEnquete}
          contentContainerStyle={styles.lista}
        />
      ) : (
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id}
          renderItem={renderComentario}
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

      {/* Modal de Criação de Enquete */}
      <Modal
        visible={modalEnqueteVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalEnqueteVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Enquete</Text>
            <TextInput
              style={styles.input}
              placeholder="Pergunta"
              value={novaEnquete.pergunta}
              onChangeText={(text) => setNovaEnquete({ ...novaEnquete, pergunta: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Opções (separadas por vírgula)"
              value={novaEnquete.opcoes.join(',')}
              onChangeText={(text) => setNovaEnquete({ ...novaEnquete, opcoes: text.split(',') })}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalEnqueteVisible(false)} />
              <Button title="Salvar Enquete" onPress={handleCriarEnquete} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Adicionar Comentário */}
      <Modal
        visible={modalComentarioVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalComentarioVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Comentário</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu comentário"
              value={novoComentario}
              onChangeText={setNovoComentario}
              multiline
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalComentarioVisible(false)} />
              <Button title="Adicionar Comentário" onPress={handleAdicionarComentario} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Botão para adicionar enquete ou comentário */}
      {abaAtiva === 'enquete' && (
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalEnqueteVisible(true)}
        >
          <Text style={styles.botaoAdicionarTexto}>Criar Enquete</Text>
        </TouchableOpacity>
      )}

      {abaAtiva === 'comentarios' && (
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalComentarioVisible(true)}
        >
          <Text style={styles.botaoAdicionarTexto}>Adicionar Comentário</Text>
        </TouchableOpacity>
      )}
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
    right: 20,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  sinopse: {
    fontSize: 16,
    color: '#FFF',
  },
  botoesAbaContainer: {
    marginVertical: 16,
  },
  botoesAba: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botaoAba: {
    alignItems: 'center',
  },
  textoBotaoAba: {
    fontSize: 16,
    color: '#999',
  },
  textoBotaoAbaAtivo: {
    color: '#000',
  },
  tracoAtivo: {
    height: 2,
    width: '100%',
    backgroundColor: '#000',
    marginTop: 4,
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: '#EEE',
    marginTop: 8,
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
  arquivoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  enquetePergunta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  opcaoEnquete: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  opcaoTexto: {
    fontSize: 14,
    color: '#333',
  },
  comentarioAutor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  comentarioTexto: {
    fontSize: 14,
    color: '#666',
  },
  estrelasContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  estrela: {
    fontSize: 30,
    color: '#DDD',
    margin: 5,
  },
  estrelaSelecionada: {
    fontSize: 30,
    color: '#FFD700',
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
    minHeight: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  botaoAdicionar: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  botaoAdicionarTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Episodios;