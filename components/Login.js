import React, { useState } from 'react';
import Cadastrar from './Cadastrar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';

const Login = ({ navigation }) => {
  const [emailOuTelefone, setEmailOuTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    // Lógica de login
    if (!emailOuTelefone || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      // Chamada para a API de login
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOuTelefone, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        // Navegação para outra tela ou ações pós-login
      } else {
        Alert.alert('Erro', data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer o login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Boas-Vindas de volta!</Text>
        <Text style={styles.subtitle}>Estamos muito animados em te ver novamente!</Text>

        <Text style={styles.sectionTitle}>Informações da conta</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail ou número de telefone"
          value={emailOuTelefone}
          onChangeText={setEmailOuTelefone}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => Alert.alert('Esqueci a senha')}>
          <Text style={styles.link}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Gerenciador de senhas')}>
          <Text style={styles.link}>Utilizar um gerenciador de senhas?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.signUpText}>Se não tiver uma conta cadastre-se</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      justifyContent: 'flex-start',  
      paddingTop: 40, 
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start', 
      paddingHorizontal: 24,
      paddingBottom: 20, 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
      textAlign: 'center',
      color: '#333',
    },
    subtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 20,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#666',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDD',
      padding: 12,
      fontSize: 16,
      borderRadius: 8,
      backgroundColor: '#FFF',
      marginBottom: 15,
    },
    link: {
      fontSize: 14,
      color: '#4A90E2', 
      textAlign: 'left',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#0D1F3C',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signUpText: {
      color: '#4A90E2',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 20,
    },
  });
  

export default Login;