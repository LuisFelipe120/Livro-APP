import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/fetchs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './auth';

const Login = () => {

  const { setIsAuthenticated } = React.useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: ({ email, senha }) => {
      
      // return fetch('http://localhost:3333/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, senha }),
      // });
      return login({email, senha})
    },
    onSuccess: async (data) => {
      console.log('Dados recebidos:', data)
      const user = data?.user; // posso guardar no context ou armazenamento local
      const token = data?.user?.token; // posso guardar no context ou armazenamento local
      if(user && token) {
        //controlar context authenticacao
        await  AsyncStorage.setItem('localUser', JSON.stringify(user))
        await  AsyncStorage.setItem('localToken', token)
        setIsAuthenticated(true);
      }
      else {
        console.error('Dados inválidos:', data);
      }
    }
  });
   
 
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
 
 
  // if(mutation.isPending || mutation.isError) {
  //  return( <View>
  //     <Text>Carregando....</Text>
  //   </View>)
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Boas-Vindas de volta!</Text>
        <Text style={styles.subtitle}>Estamos muito animados em te ver novamente!</Text>

        <Text style={styles.sectionTitle}>Informações da conta</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
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

        <Button style={styles.button} onPress={() => {
              mutation.mutate({ email, senha })
            }} title='Sign in'/>

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
