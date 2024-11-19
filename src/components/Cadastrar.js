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
} from 'react-native';
const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isAutor, setIsAutor] = useState(false);
  const [isLeitor, setIsLeitor] = useState(false);
  const handleCadastro = async () => {
    if (email !== confirmarEmail) {
      Alert.alert('Erro', 'Os e-mails não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          cpf,
          telefone,
          email,
          senha,
          role: {
            autor: isAutor,
            leitor: isLeitor,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        setNome('');
        setCpf('');
        setTelefone('');
        setEmail('');
        setConfirmarEmail('');
        setSenha('');
        setIsAutor(false);
        setIsLeitor(false);
      } else {
        Alert.alert('Erro', data.error || 'Erro ao cadastrar o usuário');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Seja Bem-Vindo</Text>
        <Text style={styles.subtitle}>Estamos muito animados com sua presença</Text>

        <Text style={styles.sectionTitle}>Informações da conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Cpf"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Email"
          value={confirmarEmail}
          onChangeText={setConfirmarEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Text style={styles.sectionTitle}>Escolha o campo abaixo</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => setIsAutor(!isAutor)}
          >
            <View style={[styles.checkbox, isAutor && styles.checkedCheckbox]} />
            <Text style={styles.checkboxLabel}>Autor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => setIsLeitor(!isLeitor)}
          >
            <View style={[styles.checkbox, isLeitor && styles.checkedCheckbox]} />
            <Text style={styles.checkboxLabel}>Leitor</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#333',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
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
});

export default CadastroUsuario;
