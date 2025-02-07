import { useMutation } from '@tanstack/react-query';
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
  Image,
} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { cadastrar } from '../services/fetchs';
const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [flag, setFlag] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { setIsAuthenticated } = React.useContext(AuthContext);


  const mutation = useMutation({
    mutationFn: ({nome, cpf, email, senha, telefone, flag, avatar}) => {
      const formData = new FormData();
      
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('telefone', telefone);
    formData.append('flag', Number(flag));

    // Verificando se a imagem foi selecionada
    if (avatar) {
      console.log('aqui imagem',avatar);  // Loga o caminho da imagem para verificação

      formData.append('imagem', {
        uri: avatar,
        type: 'image/jpg', // Ajuste conforme o tipo da imagem
        name: 'imagem.jpg', // Ajuste conforme o nome desejado
      });
    }
      return cadastrar(formData);
    },
    onSuccess: async (data) => {
      console.log('Dados recebidos:', data);

      // Verifica se a resposta contém os dados esperados
      if (!data || !data.user) {
        console.error('Erro: Resposta inesperada da API', data);
        Alert.alert('Erro', 'Erro no cadastro. Tente novamente.');
        return;
      }
    
      // Atualiza estado de autenticação
      setIsAuthenticated(true);
    
      // Mensagem de sucesso para o usuário
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    }
  });

  const handleImageUser = () => {
    Alert.alert("Selecione", "Informe de onde você quer pegar a foto", [
      {
        text: "Galeria",
        onPress: () => pickImageFromGalery(),
        style: 'default',
      },
      {
        text: "Camera",
        onPress: () => pickImageFromCamera(),
        style: 'default',
      },
    ]);
  };
  const pickImageFromGalery = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    if (result?.assets && result.assets.length > 0) {
      console.log('Imagem selecionada da galeria:', result);
      const imageUri = result.assets[0].uri
      console.log("Imagem da Galeria:", imageUri); // Verifique a URI
      setAvatar(imageUri); // Atualize o estado com a URI
    }
  };

  const pickImageFromCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchCamera(options);
    if (result?.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri
      console.log("Imagem da Camera:", imageUri); // Verifique a URI
      setAvatar(imageUri); // Atualize o estado com a URI
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
        <Text style={styles.label}>Escolha entre autor e leitor</Text>
          <RNPickerSelect
            onValueChange={(value) => setFlag(Number(value))}
            items={[
              { label: "leitor", value: "0" },
              { label: "autor", value: "1" },
              
            ]}
            style={pickerSelectStyles}
          />
        </View>
         <View>
                  <TouchableOpacity style={styles.button} onPress={handleImageUser}>
                    <Text style={styles.buttonText}>Selecionar Imagem</Text>
                  </TouchableOpacity>
                  {avatar && (
                    <Image source={{ uri: avatar }} style={styles.image} />
                  )}
                </View>
        
   <TouchableOpacity
           style={styles.button}
           onPress={() => {
             mutation.mutate({nome, cpf, email, senha, telefone, flag, avatar:avatar });
           }}
         >
           <Text style={styles.buttonText}>Cadastrar</Text>
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
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default CadastroUsuario;
