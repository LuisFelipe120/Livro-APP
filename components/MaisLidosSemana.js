// import React from "react";
// import { View, Text, StyleSheet, Image, FlatList } from "react-native";
// import MaisLidosSemana from "./MaisLidosSemana";


// const MaisLidosSemana = () => {
//   // Dados de exemplo se não forem fornecidos via props
//   const livrosExemplo = [
//     {
//       id: 1,
//       titulo: "O Alquimista",
//       autor: "Paulo Coelho",
//       imagem: "https://via.placeholder.com/120x160", // Substitua com URL real
//       comentario: "Inspirador e profundo!",
//       mediaAvaliacao: 4.8,
//       vezesLido: 320,
//     },
//     {
//       id: 2,
//       titulo: "1984",
//       autor: "George Orwell",
//       imagem: "https://via.placeholder.com/120x160",
//       comentario: "Um clássico inesquecível!",
//       mediaAvaliacao: 4.7,
//       vezesLido: 280,
//     },
//     {
//       id: 3,
//       titulo: "Dom Casmurro",
//       autor: "Machado de Assis",
//       imagem: "https://via.placeholder.com/120x160",
//       comentario: "Intrigante e fascinante!",
//       mediaAvaliacao: 4.6,
//       vezesLido: 250,
//     },
//   ];

  

//   // Ordenar os livros pela quantidade de leituras
//   const livrosOrdenados = (livros || livrosExemplo).sort((a, b) => b.vezesLido - a.vezesLido);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📚 Livros Mais Lidos da Semana</Text>
//       <FlatList
//         data={livrosOrdenados}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.livroItem}>
//             <Image source={{ uri: item.imagem }} style={styles.livroImagem} />
//             <View style={styles.livroInfo}>
//               <Text style={styles.livroTitulo}>{item.titulo}</Text>
//               <Text style={styles.livroAutor}>Autor: {item.autor}</Text>
//               <Text style={styles.livroComentario}>“{item.comentario}”</Text>
//               <Text style={styles.livroAvaliacao}>
//                 Avaliação: ⭐ {item.mediaAvaliacao.toFixed(1)}
//               </Text>
//               <Text style={styles.livroLidos}>
//                 Lido {item.vezesLido} vezes esta semana
//               </Text>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   livroItem: {
//     flexDirection: "row",
//     marginBottom: 15,
//     padding: 10,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   livroImagem: {
//     width: 80,
//     height: 120,
//     borderRadius: 5,
//     marginRight: 15,
//   },
//   livroInfo: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   livroTitulo: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   livroAutor: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   livroComentario: {
//     fontSize: 14,
//     fontStyle: "italic",
//     color: "#555",
//     marginTop: 5,
//   },
//   livroAvaliacao: {
//     fontSize: 14,
//     color: "#ffa500",
//     marginTop: 5,
//   },
//   livroLidos: {
//     fontSize: 14,
//     color: "#333",
//     marginTop: 5,
//   },
// });

// export default MaisLidosSemana;
