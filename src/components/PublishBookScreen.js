import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
 
const PublishBookScreen = () => {
  const [user, setUser] = useState(null); // Dados do usuário
  const [books, setBooks] = useState([]); // Livros do usuário
  const [newBook, setNewBook] = useState({
    title: '',
    genre: '',
    synopsis: '',
    image: null,
  }); // Dados para novo livro
 
  const [genres, setGenres] = useState([]); // Lista de gêneros
 
  // Simulação de URL base da API
  const API_URL = 'https://sua-api.com';
 
  useEffect(() => {
    fetchUserData();
    fetchBooks();
    fetchGenres();
  }, []);
 
  // Carregar dados do usuário
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/1`); // Exemplo: ID fixo
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };
 
  // Carregar livros do usuário
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/livros?usuario_id=1`); // Exemplo: ID do usuário
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    }
  };
 
  // Carregar gêneros disponíveis
  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${API_URL}/generos`);
      setGenres(response.data);
    } catch (error) {
      console.error('Erro ao carregar gêneros:', error);
    }
  };
 
  // Adicionar novo livro
  const handleAddBook = async () => {
    try {
      await axios.post(`${API_URL}/livros`, {
        ...newBook,
        usuarios_id: user.id,
      });
      Alert.alert('Sucesso', 'Livro adicionado!');
      fetchBooks(); // Atualizar lista
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };
 
  return (
    <View style={styles.container}>
        {/* Header */}
        {user && (
    <View style={styles.header}>
    <Image source={{ uri: user.avatar }} style={styles.avatar} />
    <Text style={styles.userInfo}>
                {user.nome} {'\n'}Autor
    </Text>
    </View>
        )}
    
        {/* Seção "Meus Livros" */}
    <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Meus Livros</Text>
    <Text style={styles.sectionAction}>Mais visto</Text>
    </View>
    
        <FlatList
            data={books}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
    <View style={styles.bookItem}>
    <Image source={{ uri: item.imagem }} style={styles.bookImage} />
    <Text style={styles.bookTitle}>{item.nome}</Text>
    </View>
            )}
            contentContainerStyle={styles.bookList}
        />
    
        {/* Formulário de Adicionar Livro */}
    <Text style={styles.label}>Título</Text>
    <TextInput
            style={styles.input}
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
            placeholder="Digite o título"
        />
    
        <Text style={styles.label}>Gênero</Text>
    <FlatList
            data={genres}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
    <TouchableOpacity
                style={[
                styles.genreButton,
                newBook.genre === item.name && styles.selectedGenre,
                ]}
                onPress={() => setNewBook({ ...newBook, genre: item.name })}
    >
    <Text style={styles.genreText}>{item.name}</Text>
    </TouchableOpacity>
            )}
        />
    
        <Text style={styles.label}>Sinopse</Text>
    <TextInput
            style={[styles.input, { height: 100 }]}
            value={newBook.synopsis}
            onChangeText={(text) => setNewBook({ ...newBook, synopsis: text })}
            multiline
            placeholder="Escreva uma breve sinopse"
        />
    
        <TouchableOpacity style={styles.uploadButton} onPress={() => alert('Upload de imagem')}>
    <Text style={styles.uploadText}>+ Adicionar Capa</Text>
    </TouchableOpacity>
    
        <TouchableOpacity style={styles.submitButton} onPress={handleAddBook}>
    <Text style={styles.submitText}>Publicar</Text>
    </TouchableOpacity>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionAction: {
    fontSize: 14,
    color: '#007bff',
  },
  bookList: {
    paddingVertical: 10,
  },
  bookItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  bookTitle: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  genreButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedGenre: {
    backgroundColor: '#ddd',
  },
  genreText: {
    fontSize: 14,
  },
  uploadButton: {
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

 
export default PublishBookScreen;