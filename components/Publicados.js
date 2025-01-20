import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';


const Publicados = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar..." />
      </View>

      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => console.log('Meus Livros clicado')}>
          <Text style={styles.sectionButtonText}>Meus Livros</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Mais Vistos clicado')}>
          <Text style={styles.sectionButtonText}>Mais Lidos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addBoxContainer}>
        <TouchableOpacity 
          style={styles.addBox} 
          onPress={() => navigation.navigate('CadastroLivro')}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// const PublicadosScreen = () => {
//   return (
//     <SafeAreaView style={{ flex: 1, padding: 16 }}>
//       <Text style={styles.label}>Página de Publicados</Text>
//       <Text>Exiba aqui a lista de livros publicados ou outras informações desejadas.</Text>
//     </SafeAreaView>
//   );
// };

// const Publicados = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ title: 'Início' }} 
//         />
//         <Stack.Screen 
//           name="Publicados" 
//           component={PublicadosScreen} 
//           options={{ title: 'Livros Publicados' }} 
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  textContainer: { flexDirection: 'column' },
  greetingText: { fontSize: 18, color: '#333' },
  subText: { fontSize: 14, color: '#666' },
  searchContainer: { paddingHorizontal: 16, marginTop: 10 },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#fff' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 20 },
  sectionButtonText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  addBoxContainer: { paddingHorizontal: 16, marginTop: 10 },
  addBox: { width: 100, height: 100, backgroundColor: '#e0e0e0', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  addIcon: { fontSize: 32, color: '#333' },
  label: { fontSize: 16, color: '#333', marginBottom: 8 },
});

export default Publicados;
