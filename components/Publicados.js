import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getLivros } from '../src/services/fetchs';

const Publicados = () => {
  const navigation = useNavigation();
  const { data: livros, error, isLoading } = useQuery({ queryKey: ['getLivros'], queryFn: getLivros });

  if (isLoading) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }
  const baseURL = 'http://10.57.45.29:3333/public/images'; // Substitua pelo endereço correto do seu backend
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar..." />
      </View>

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookItem} onPress={() => console.log(item.nome)}>
            <Text style={styles.bookTitle}>{item.generos_id}</Text>
            <Image 
            source={{ uri: `${baseURL}/${item.imagem}` }}
            style={styles.bookImage}
            onError={(e) => console.log('Erro:', e.nativeEvent.error)}
          />
            <Text style={styles.bookTitle}>{item.sinopse}</Text>
            <Text style={styles.bookTitle}>{item.tags}</Text>

          </TouchableOpacity>
        )}
      />  

      <View style={styles.addBoxContainer}>
        <TouchableOpacity style={styles.addBox} onPress={() => navigation.navigate('CadastroLivro')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  searchContainer: { paddingHorizontal: 16, marginBottom: 10 },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#fff' },
  listContainer: { paddingHorizontal: 10, paddingTop: 10 },
  bookItem: { 
    flex: 1,
    backgroundColor: '#fff', 
    margin: 8, 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 3, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  bookImage: { width: 80, height: 100, marginBottom: 8, borderRadius: 5 },

  addBoxContainer: { alignItems: 'center', marginVertical: 20 },
  addBox: { width: 80, height: 80, backgroundColor: '#e0e0e0', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  addIcon: { fontSize: 32, color: '#333' },
  loadingText: { textAlign: 'center', fontSize: 16, marginTop: 20, color: '#666' },
});

export default Publicados;
