import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import { capitulos, getCapitulosLivros, getLivros, getlivrosid } from '../services/fetchs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';


const Capitulos = ({ livros_id, id }) => {
  // --- Todos os Hooks declarados primeiro ---
  const route = useRoute();
  const { itemId, livroNome, livroImagem, livroSinopse } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCapituloVisible, setModalCapituloVisible] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('episodios');
  const IMAGE_BASE_URL = 'http://10.57.45.29:3333/images/';
  const [nome, setNome] = useState('');
    const [ordem_capitulo, setOrdem_Capitulo] = useState('');
    const [texto, setTexto] = useState('');
  // --- useQuery para buscar dados da API ---
  const { data: capUsuario, error, isLoading } = useQuery({
    queryKey: ['getCapitulosLivros', itemId],
    queryFn: () => getCapitulosLivros(itemId),
    enabled: !!itemId,
    onError: (error) => {
      console.error('Erro na query:', error);
    },
  });

  // useMutation também deve vir antes das verificações condicionais
  const mutation = useMutation({
    mutationFn: ({livros_id, nome, ordem_capitulo, texto }) => {
  
      return capitulos({livros_id, nome, ordem_capitulo, texto} );
    },
    onSuccess: async (data) => {
      console.log('Dados recebidos:', data);

      if (!data || !data.itemId) {
        console.error('Erro: Resposta inesperada da API', data);
        Alert.alert('Erro', 'Erro no cadastro. Tente novamente.');
        return;
      }
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    },
  });

  // Agora as verificações condicionais vêm depois de todos os hooks
  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro: {error.message}</Text>;

  const handleCancelar = () => {
    setModalVisible(false);
    setAvaliacao(0);
    setComentario('');
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com imagem de fundo */}
      <View style={styles.header}>
        <Image source={{ uri: IMAGE_BASE_URL + livroImagem }} style={styles.backgroundImage} />
        <View style={styles.overlay} />

        {/* Texto sobreposto */}
        <View style={styles.headerContent}>
          <Text style={styles.titulo}>{livroNome}</Text>
          <Text style={styles.sinopse}>{livroSinopse}</Text>
        </View>
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
              Criar Capitulo
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
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Ordem do capitulo"
              value={ordem_capitulo}
              onChangeText={setOrdem_Capitulo}
            />
         <ScrollView style={styles.textoContainer}>
              <TextInput
                style={styles.textoInput}
                placeholder="Escreva seu Capitulo"
                value={texto}
                onChangeText={setTexto}
                multiline
                scrollEnabled
                numberOfLines={10} // Ajuste conforme necessário
              />
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalCapituloVisible(false)} />
              <Button title="Salvar Capítulo" onPress={() => {
            mutation.mutate({livros_id: itemId, nome, ordem_capitulo, texto});
          }} />
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
    height: 260,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center', // Centraliza os itens no eixo Y
    alignItems: 'center', // Centraliza os itens no eixo X
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Escurece a imagem para legibilidade
  },
  headerContent: {
    position: 'absolute',
    alignItems: 'center', // Centraliza os textos horizontalmente
    justifyContent: 'center', // Centraliza os textos verticalmente
    width: '80%', // Limita a largura para melhor leitura
    zIndex: 2,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 16,
    color: '#DDD',
    textAlign: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
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
  textoContainer: {
    marginVertical: 10,
  },
  textoInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
  }
});

export default Capitulos;