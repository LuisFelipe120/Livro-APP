// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
// import { useQuery } from '@tanstack/react-query';
// import { getCapitulosLivros } from '../services/fetchs';  // Certifique-se de importar corretamente a função

// const Episodios = ({ livros_id }) => {
//   console.log('livros_id:', livros_id);  // Verificando se livros_id está sendo passado corretamente

//   const { data: capUsuario, error, isLoading } = useQuery(
//     ['getCapitulosLivros', livros_id],
//     () => getCapitulosLivros(livros_id),
//     {
//       enabled: !!livros_id,  // Garante que a requisição só será feita se livros_id estiver disponível
//       onError: (error) => {
//         console.error('Erro na query:', error);
//       },
//     }
//   );

//   if (isLoading) return <Text>Carregando...</Text>;
//   if (error) return <Text>Ocorreu um erro: {error.message}</Text>;

//   console.log('Capítulos do usuário:', capUsuario);  // Verificando a resposta da query

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={capUsuario || []}  // Verifique se capUsuario está carregado
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.episodioTitulo}>{item.nome}</Text>
//             <Text style={styles.episodioData}>{item.ordemCapitulo}</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   card: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   episodioTitulo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   episodioData: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default Episodios;
