import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Reincarnation from './../img/Reincarned.png'; // Imagem de fundo

const Episodios = () => {
  // Dados fictícios para os episódios
  const episodios = [
    {
      id: '1',
      titulo: 'Episode 6',
      data: 'Nov 22, 2024',
      curtidas: 2813,
    },
    {
      id: '2',
      titulo: 'Episode 5',
      data: 'Nov 15, 2024',
      curtidas: 3757,
    },
    {
      id: '3',
      titulo: 'Episode 4',
      data: 'Nov 15, 2024',
      curtidas: 3686,
    },
    {
      id: '4',
      titulo: 'Episode 3',
      data: 'Nov 15, 2024',
      curtidas: 3769,
    },
  ];

  // Renderização de cada episódio
  const renderEpisodio = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.episodioTitulo}>{item.titulo}</Text>
        <Text style={styles.episodioData}>{item.data}</Text>
        <Text style={styles.episodioCurtidas}>{item.curtidas} likes</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image source={Reincarnation} style={styles.backgroundImage} />
        <View style={styles.overlay} />

        <View style={styles.headerContent}>
          <Text style={styles.categoria}>Fantasy</Text>
          <Text style={styles.tituloPrincipal}>A Knight With a Time{'\n'}Limit</Text>
          <Text style={styles.autor}>KDRM, Yunyeol Choi</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>276,070 views</Text>
            <Text style={styles.stats}>39,454 likes</Text>
            <Text style={styles.stats}>⭐ 8.70</Text>

            {/* Botão "Rate" menor */}
            <TouchableOpacity style={styles.rateButton}>
              <Text style={styles.rateText}>Avaliação</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>

      {/* Lista de episódios */}
      <FlatList
        data={episodios}
        keyExtractor={(item) => item.id}
        renderItem={renderEpisodio}
        contentContainerStyle={styles.lista}
      />
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
    alignItems: 'center', // Alinha os itens verticalmente
  },
  stats: {
    fontSize: 14,
    color: '#FFF',
    marginRight: 16,
  },
  rateButton: {
    backgroundColor: '#FFF',
    paddingVertical: 4, // Menor altura
    paddingHorizontal: 8, // Menor largura
    borderRadius: 8,
    marginLeft: 8, // Espaçamento entre o "RATE" e as estatísticas
  },
  rateText: {
    color: '#6200EE',
    fontWeight: 'bold',
    fontSize: 12, // Tamanho de fonte menor
  },
  botoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscribeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2, // Sombra para Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, // Sombra para iOS
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
});

export default Episodios;
