import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { getCapitulosLivros, getLivros, getlivrosid } from '../services/fetchs';
import { useQuery } from '@tanstack/react-query';

const Capitulos = ({ livros_id, id }) => {
  // --- Todos os Hooks declarados primeiro ---
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCapituloVisible, setModalCapituloVisible] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('episodios');
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novoCapitulo, setNovoCapitulo] = useState({ titulo: '' });
  const IMAGE_BASE_URL = 'http://10.57.45.29:3333/images/';
  const { 
    data: livros, 
    error: livroError, 
    isLoading: livroLoading  
  } = useQuery({ 
    queryKey: ['getlivrosid', id], // Adicione o id como dependência
    queryFn: () => getlivrosid(id),
    enabled: !!id,
    onError: (error) => {
      console.error('Erro na query:', error);
    },
  });
 console.log('aqui livro:',livros)
  // --- useQuery para buscar dados da API ---
  const { data: capUsuario, error, isLoading } = useQuery({
    
    queryKey: ['getCapitulosLivros', livros_id],
    queryFn: () => getCapitulosLivros(livros_id),
    enabled: !!livros_id,
    onError: (error) => {
      console.error('Erro na query:', error);
    },
  });

  // --- Verificações condicionais APÓS Hooks ---
  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro: {error.message}</Text>;



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

  const handleCriarCapitulo = () => {
    // Adiciona o novo capítulo à lista de episódios
    const dataAtual = new Date().toLocaleDateString(); // Pega a data atual
    const novoCapituloCompleto = {
      id: String(episodios.length + 1),
      titulo: novoCapitulo.titulo,
      data: dataAtual, // Define a data atual
      curtidas: 0, // Inicia com 0 curtidas
    };
    setEpisodios([...episodios, novoCapituloCompleto]);
    setModalCapituloVisible(false);
    setNovoCapitulo({ titulo: '' }); // Limpa o campo de título
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

  // const renderEpisodio = ({ item }) => (
    
    
  // );



  return (
    <SafeAreaView style={styles.container}>
  {/* Cabeçalho com informações do livro */}
  <View style={styles.header}>
    {livros && livros.length > 0 && (
      <View style={styles.headerContent}>
        {/* Imagem de fundo */}
        <Image source={{ uri: IMAGE_BASE_URL + livros[0].imagem }} style={styles.backgroundImage} />
        
        {/* Sobreposição com texto */}
        <View style={styles.overlay}>
          <Text style={styles.categoria}>{livros[0].nome}</Text>
          <Text style={styles.tituloPrincipal}>{livros[0].sinopse}</Text>
          <Text style={styles.autor}>{livros[0].usuarios_id}</Text>
        </View>
      </View>
    )}
  </View>

      {/* Botões para alternar entre Episódios, Criar Capítulo e Recomendações */}
      <View style={styles.botoesAbaContainer}>
        <View style={styles.botoesAba}>
          <TouchableOpacity
            style={styles.botaoAba}
            onPress={() => setAbaAtiva('episodios')}
          >
            <Text style={[styles.textoBotaoAba, abaAtiva === 'episodios' && styles.textoBotaoAbaAtivo]}>
              Episódios
            </Text>
            {abaAtiva === 'episodios' && <View style={styles.tracoAtivo} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoAba}
            onPress={() => setModalCapituloVisible(true)}
          >
            <Text style={[styles.textoBotaoAba, abaAtiva === 'criarCapitulo' && styles.textoBotaoAbaAtivo]}>
              Criar Capítulo
            </Text>
            {abaAtiva === 'criarCapitulo' && <View style={styles.tracoAtivo} />}
          </TouchableOpacity>
        </View>
        {/* Linha divisória cinza clara */}
        <View style={styles.linhaDivisoria} />
      </View>

      {/* Exibe a lista de episódios ou recomendações com base na aba ativa */}
      {abaAtiva === 'episodios' ?  (
         <FlatList
                data={capUsuario || []}  // Verifique se capUsuario está carregado
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.episodioTitulo}>{item.nome}</Text>
                    <Text style={styles.episodioData}>{item.ordem_capitulo}</Text>
                  </View>
                )}
              
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

      {/* Modal de Criação de Capítulo */}
      <Modal
        visible={modalCapituloVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalCapituloVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Capítulo</Text>
            <TextInput
              style={styles.input}
              placeholder="Título do Capítulo"
              value={novoCapitulo.titulo}
              onChangeText={(text) => setNovoCapitulo({ titulo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Ordem do capitulo"
              value={novoCapitulo.titulo}
              onChangeText={(text) => setNovoCapitulo({ titulo: text })}
            />
           
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalCapituloVisible(false)} />
              <Button title="Salvar Capítulo" onPress={handleCriarCapitulo} />
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
    overflow: 'hidden', // Impede que o conteúdo "vaze" para fora da área do cabeçalho
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover', // Garante que a imagem se ajuste corretamente
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // A sobreposição com fundo semitransparente
    justifyContent: 'flex-end', // Alinha o texto ao final da imagem
    padding: 16, // Espaçamento para evitar que o texto encoste nas bordas
    zIndex: 1, // Garante que o texto fique acima da imagem
  },
  headerContent: {
    position: 'relative', // Garante que o conteúdo fique acima da imagem
    height: '100%', // Ocupa toda a altura do cabeçalho
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
});

export default Capitulos;