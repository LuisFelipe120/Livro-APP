import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Componente de Capítulo (cada capítulo clicável)
const ObrasLidasCapitulo = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.chapterContainer}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

// Componente Principal
const App = () => {
  const [selectedChapter, setSelectedChapter] = useState(null); // Estado para armazenar o capítulo selecionado

  // Dados do usuário
  const user = {
    name: 'Rei Timoty',
    photo: require('./../assets/image/94703585_2682114138686908_5300330496163577856_n.jpg'),  // Altere este caminho para sua imagem
  };

  // Dados dos capítulos
  const chapters = [
    { title: 'Capítulo 1: Introdução', content: 'Este é o conteúdo do primeiro capítulo sobre o tema de Obrasaalidas.' },
    { title: 'Capítulo 2: Desenvolvimento', content: 'Aqui discutimos o desenvolvimento do conceito de Obrasaalidas no contexto atual.' },
    { title: 'Capítulo 3: Conclusão', content: 'Neste capítulo, apresentamos as conclusões e possíveis aplicações do conceito abordado.' },
    { title: 'Capítulo 4: Conclusão', content: 'Neste capítulo, apresentamos as conclusões e possíveis aplicações do conceito abordado.' },
    { title: 'Capítulo 5: Conclusão', content: 'Neste capítulo, apresentamos as conclusões e possíveis aplicações do conceito abordado.' },
  ];

  // Função para exibir o conteúdo do capítulo selecionado
  const handleChapterPress = (chapter) => {
    setSelectedChapter(chapter); // Atualiza o estado com o capítulo selecionado
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com saudação e foto */}
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Olá, {user.name}</Text>
        <Image source={user.photo} style={styles.profileImage} />
      </View>

      {/* Exibe a lista de capítulos */}
      <View>
        {chapters.map((chapter, index) => (
          <ObrasLidasCapitulo
            key={index}
            title={chapter.title}
            onPress={() => handleChapterPress(chapter)} // Quando clicado, exibe o capítulo
          />
        ))}
      </View>

      {/* Se um capítulo for selecionado, exibe o conteúdo */}
      {selectedChapter && (
        <View style={styles.chapterContentContainer}>
          <Text style={styles.title}>{selectedChapter.title}</Text>
          <Text style={styles.content}>{selectedChapter.content}</Text>
        </View>
      )}
    </ScrollView>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chapterContainer: {
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  chapterContentContainer: {
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  content: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export default App;
