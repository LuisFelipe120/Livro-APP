// import { useMutation, useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react'
// import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import RNPickerSelect from "react-native-picker-select";
// import { livros } from '../services/fetchs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AuthContext from './auth';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// const CadastroLivros = () => {
//       const [nome, setNome] = useState('');
//       const [sinopse, setSinopse] = useState('');
//       const [tags, setTags] = useState('');
//       const [ generos_id, setGeneros_id ] = useState(null);
//       const { setIsAuthenticated } = React.useContext(AuthContext);
//       const [imageUser, setImageUser] = useState(null)
    
      
//       const mutation = useMutation({
//         mutationFn: ({ generos_id, nome, imagem,sinopse, tags }) => {
          
//           // return fetch('http://localhost:3333/login', {
//           //   method: 'POST',
//           //   headers: {
//           //     'Content-Type': 'application/json',
//           //   },
//           //   body: JSON.stringify({ email, senha }),
//           // });
//           return livros({ generos_id, nome, imagem,sinopse, tags})
//         },
//         onSuccess: async (data) => {
//           console.log('Dados recebidos:', data)
//           const user = data?.user; // posso guardar no context ou armazenamento local
//           const token = data?.user?.token; // posso guardar no context ou armazenamento local
//           if(user && token) {
//             //controlar context authenticacao
//             await  AsyncStorage.setItem('localUser', JSON.stringify(user))
//             await  AsyncStorage.setItem('localToken', token)
//             setIsAuthenticated(true);
//           }
//           else {
//             console.error('Dados inválidos:', data);
//           }
//         }
//       });
       
//       const handleImageUser = () =>{
//         Alert.alert(("Selecione", "Informe de onde você quer pegar a foto",
//           [
//             {
//               text:"Galeria",
//               onPress:() => pickImageFromGalery(),
//               style: 'default'
//             },
//             {
//               text: "Camera",
//               onPress:() => pickImageFromCamera(),
//               style: 'default'

//             }
//           ],
//           {
//             cancelable: true,
//             onDismiss:() => console.log('tratar depois...')
//           }
//         ))
//       }
//       const pickImageFromGalery = async () =>{
//         const options = {
//           mediaType: 'photo'
//         }
//         const result =  await launchImageLibrary(options);
//         console.log(result)
//         if(result?.assets)
//         {
//           console.log(result.assets)
//           setImageUser(result.assets[0].uri)
//           return
//         }
//       }
//        const pickImageFromCamera = () =>{
        
//       }
    
     
//       return (
//         <SafeAreaView style={styles.container}>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <Text style={styles.title}>Publique seu livro</Text>
//             <Text style={styles.subtitle}>Comece sua jornada e explore sua imaginação ou conhecimento</Text>
     
//             <Text style={styles.sectionTitle}>O que precisamos:</Text>
     
//             <TextInput
//               style={styles.input}
//               placeholder="Nome do Livro"
//               value={nome}
//               onChangeText={setNome}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Sinopse"
//               value={sinopse}
//               onChangeText={setSinopse}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Tags"
//               value={tags}
//               onChangeText={setTags}
              
//             />
          
     
//             <Text style={styles.sectionTitle}>Escolha o campo abaixo</Text>
//             <View style={styles.checkboxContainer}>
//             <Text style={styles.label}>
//                     "Por favor selecione o genero"
//             </Text>
//             <RNPickerSelect
//           onValueChange={(value) => {
//             console.log("Valor selecionado:", value); // Verifica o valor vindo do picker
//             setGeneros_id(Number(value));
//             console.log("Estado atualizado:", generos_id); // Confirma o valor do state
//           }}
//                  items={[
//                      { label: "Ficção Cientifica", value: "1" },
//                      { label: "Romance", value: "2" },
//                      { label: "Aventura", value: "3" },
            
//                  ]}
//                  style={pickerSelectStyles}

//              />
//             </View>
//             <View>
//             <TouchableOpacity style={styles.button} onPress={() => handleImageUser()} />
//             {imageUser && (
//         <Image value={imagem}  source={{ uri: imageUser }} style={styles.image} />
//       )}
//             </View>
     
//             <TouchableOpacity style={styles.button} onPress={() => {
//               mutation.mutate({ generos_id, nome, imagem, sinopse, tags })
//             }} />
//           </ScrollView>
//         </SafeAreaView>
//       );
//     }
     
//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//       },
//       scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 24,
//       },
//       title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 4,
//         textAlign: 'center',
//         color: '#333',
//       },
//       subtitle: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 20,
//         textAlign: 'center',
//       },
//       sectionTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#666',
//         marginBottom: 10,
//       },
//       input: {
//         borderWidth: 1,
//         borderColor: '#DDD',
//         padding: 12,
//         fontSize: 16,
//         borderRadius: 8,
//         backgroundColor: '#FFF',
//         marginBottom: 15,
//       },
//       checkboxContainer: {
//         flexDirection: 'row',
//         marginBottom: 20,
//       },
//       checkboxItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 20,
//       },
//       checkbox: {
//         width: 24,
//         height: 24,
//         borderWidth: 1,
//         borderColor: '#333',
//         backgroundColor: '#FFF',
//         marginRight: 8,
//       },
//       checkedCheckbox: {
//         backgroundColor: '#333',
//       },
//       checkboxLabel: {
//         fontSize: 16,
//         color: '#333',
//       },
//       button: {
//         backgroundColor: '#0D1F3C',
//         paddingVertical: 14,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 10,
//       },
//       buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//       },
//       image: {
//         flex: 1,
//         width: '100%',
//         backgroundColor: '#0553',
//       }
//     });
//     const pickerSelectStyles = StyleSheet.create({
      
//       inputAndroid: {
//           fontSize: 16,
//           paddingHorizontal: 10,
//           paddingVertical: 8,
//           borderWidth: 0.5,
//           borderColor: 'purple',
//           borderRadius: 8,
//           color: 'black',
//           paddingRight: 30 // to ensure the text is never behind the icon
//       }
//   });
   


// export default CadastroLivros
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { livros } from '../services/fetchs';

const CadastroLivros = () => {
  const [nome, setNome] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [tags, setTags] = useState('');
  const [generos_id, setGeneros_id] = useState(null);
  const { setIsAuthenticated } = React.useContext(AuthContext);
  const [imageUser, setImageUser] = useState(null);

  const mutation = useMutation({
    mutationFn: ({ generos_id, nome, imagem, sinopse, tags }) => {
      const formData = new FormData();
    formData.append('generos_id', generos_id);
    formData.append('nome', nome);
    formData.append('sinopse', sinopse);
    formData.append('tags', tags);

    // Verificando se a imagem foi selecionada
    if (imagem) {
      console.log('aqui imagem',imagem);  // Loga o caminho da imagem para verificação

      formData.append('imagem', {
        uri: imagem,
        type: 'image/jpeg', // Ajuste conforme o tipo da imagem
        name: 'imagem.jpg', // Ajuste conforme o nome desejado
      });

    }
      return livros(formData);
    },
    onSuccess: async (data) => {
      console.log('Dados recebidos:', data);
      const user = data?.user; 
      const token = data?.user?.token; 
      if (user && token) {
        await AsyncStorage.setItem('localUser', JSON.stringify(user));
        await AsyncStorage.setItem('localToken', token);
        setIsAuthenticated(true);
      } else {
        console.error('Dados inválidos:', data);
      }
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
      setImageUser(imageUri); // Atualize o estado com a URI
    }
  };

  const pickImageFromCamera = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchCamera(options);
    if (result?.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri
      console.log("Imagem da Galeria:", imageUri); // Verifique a URI
      setImageUser(imageUri); // Atualize o estado com a URI
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Publique seu livro</Text>
        <Text style={styles.subtitle}>Comece sua jornada e explore sua imaginação ou conhecimento</Text>

        <Text style={styles.sectionTitle}>O que precisamos:</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Livro"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Sinopse"
          value={sinopse}
          onChangeText={setSinopse}
        />
        <TextInput
          style={styles.input}
          placeholder="Tags"
          value={tags}
          onChangeText={setTags}
        />

        <Text style={styles.sectionTitle}>Escolha o campo abaixo</Text>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Por favor selecione o gênero</Text>
          <RNPickerSelect
            onValueChange={(value) => setGeneros_id(Number(value))}
            items={[
              { label: "Ficção Científica", value: "1" },
              { label: "Romance", value: "2" },
              { label: "Aventura", value: "3" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={handleImageUser}>
            <Text style={styles.buttonText}>Selecionar Imagem</Text>
          </TouchableOpacity>
          {imageUser && (
            <Image source={{ uri: imageUser }} style={styles.image} />
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            mutation.mutate({ generos_id, nome, imagem: imageUser, sinopse, tags });
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
  label: {
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
  image: {
    flex: 1,
    width: '100%',
    height: 200,
    marginTop: 15,
    backgroundColor: '#EEE',
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

export default CadastroLivros;
