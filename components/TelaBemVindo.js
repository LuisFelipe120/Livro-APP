import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import bibli from './../img/images.png'; // Certifique-se de ter a imagem no caminho correto

const TelaBemVindo = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem no topo */}
      <View style={styles.imageContainer}>
        <Image source={bibli} style={styles.topImage} />
      </View>

      {/* Texto de Boas-vindas */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeTitle}>Bem-vindo à</Text>
        <Text style={styles.welcomeHighlight}>BookVerse</Text>
        <Text style={styles.welcomeSubtitle}>
          Explore, leia e compartilhe histórias incríveis com nossa comunidade.
        </Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  // Estilos para a imagem no topo
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  topImage: {
    width: '90%', // Usa 90% da largura da tela, ajusta para diferentes dispositivos
    height: undefined, // Permite ajuste proporcional
    aspectRatio: 16 / 9, // Define a proporção da imagem (ajuste conforme necessário)
    resizeMode: 'contain', // Garante que a imagem não seja cortada
    borderRadius: 12, // Bordas arredondadas para suavizar
    borderWidth: 2, // Adiciona uma borda visível
    borderColor: '#042c45', // Cor da borda
    shadowColor: '#000', // Sombra leve para destacar a imagem
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  // Estilos para os textos
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#042c45',
    textAlign: 'center',
    marginBottom: 4,
  },

  welcomeHighlight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#042c45',
    textAlign: 'center',
    marginBottom: 16,
  },

  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 24,
  },

  // Estilos para os botões
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  loginButton: {
    backgroundColor: '#042c45',
  },

  registerButton: {
    backgroundColor: '#fbfbfa',
    borderWidth: 2,
    borderColor: '#042c45',
  },

  loginButtonText: {
    fontSize: 16,
    color: '#fbfbfa',
    fontWeight: 'bold',
  },

  registerButtonText: {
    fontSize: 16,
    color: '#042c45',
    fontWeight: 'bold',
  },
});

export default TelaBemVindo;