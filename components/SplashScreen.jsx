import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Splash() {
  const navigation = useNavigation();

  // Referências para animações
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Inicia as animações de fade e zoom
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500, // Duração do fade-in
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1500, // Duração do zoom-in
        useNativeDriver: true,
      }),
    ]).start();

    // Simulação de carregamento (aguardando 2 segundos)
    setTimeout(() => {
      // Após o tempo, navega para a tela Home
      navigation.replace('Vitrine');
    }, 2000); // 2000ms = 2 segundos
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity, transform: [{ scale }] },
        ]}
      >
        <Text style={styles.text}>Bem vindo ao BookVerse...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Splash;
