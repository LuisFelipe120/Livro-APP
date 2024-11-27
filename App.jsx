import * as React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Buscar from './components/buscar';
import Carousel from './components/Carousel';
import SplashScreen from './components/SplashScreen';
import PesquisaObra from './src/components/Vitrine';
import Login from './src/components/Login';
import CadastroUsuario from './src/components/Cadastrar';
import AuthContext, { AuthProvider } from './src/components/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 


function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex:1, padding:10}}>
    <View >
    <Text style={{padding:5, fontSize: 20, fontWeight:'bold'}}>Generos</Text>
   <Carousel/>
   </View>
   {/* // Dentro do HomeScreen ou onde for aplicável */}
<View style={styles.card}>
  
  <TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate('Populares', {
      itemId: 86,
      otherParam: 'anything you want here',
    })
  }
>
  <Text style={styles.cardTitle}>Populares</Text>
  <Text style={styles.cardDescription}>
    Descubra os livros mais populares entre os leitores.
  </Text>
</TouchableOpacity>
</View>

<View style={styles.card}>
<TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate('MaisLidos', {
      itemId: 86,
      otherParam: 'anything you want here',
    })
  }
>
  <Text style={styles.cardTitle}>Mais lidas da semana</Text>
  <Text style={styles.cardDescription}>
    Explore os livros mais lidos pelos usuários nesta semana.
  </Text>
</TouchableOpacity>
</View>
<View style={styles.card}>
<TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate('Enquetes', {
      itemId: 86,
      otherParam: 'anything you want here',
    })
  }
>
  <Text style={styles.cardTitle}>Veja as enquetes abertas</Text>
  <Text style={styles.cardDescription}>
    Navegue e se divirta com teorias sobre os capitulos lançados
  </Text>
</TouchableOpacity>
</View>

   </View>
  );

}
 
function LivrosScreen() {
  return (
    <View style={{ flex: 1 }}>
 <View style={{height:80}}>
      <Buscar/>
      </View>
      <Text>Livros!</Text>
    </View>
  );
}
function Populares() {
  return (
    <View style={{ flex: 1 }}>
 <View style={{height:80}}>
      <Buscar/>
      </View>      
      <Text>populares</Text>
 </View>
  );
  
}
function MaisLidos() {
  return (
    <View style={{ flex: 1 }}>
            <View style={{height:80}}>
      <Buscar/>
      </View>
      <Text>Mais Lidos da Semana</Text>
 </View>
  );
  
}
function Enquetes() {
  return (
    <View style={{ flex: 1}}>
        <View style={{height:80}}>
      <Buscar/>
      </View>
      <Text>Enquetes</Text>
 </View>
  );
  
}
function Splash() {
  return (
    <SplashScreen/>
  );
  
}
function VitrineScreen() {
  return (
    <PesquisaObra/>
  );
  
}
function LoginScreen() {
  return (
    <Login/>
  );
  
}
function CadastroScreen() {
  return (
    <CadastroUsuario/>
  );
  
}
function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{height:80}}>
      <Buscar/>
      </View>
      <Text>Perfil!</Text>
      
    </View>
  );
}
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function RootStack() {
  const { isAuthenticated } = React.useContext(AuthContext);
  console.log('pilha raiz: ', isAuthenticated)
  return (
    <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />

         {isAuthenticated ?
        (<>

    <Stack.Screen
  name="Home"
  component={TabBar}
  options={{
    headerTitle: () => (
      <View style={{ flexDirection: 'row',justifyContent:'space-between', alignItems:'center', alignItems: 'center' }}>
       
        <View>
          <Text style={{ fontSize: 14, color: '#000' }}>Olá,</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Timóteo</Text>
        </View>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        />
      </View>
    ),
  }}
/>

    <Stack.Screen name="Populares" component={Populares}/>
    <Stack.Screen name="MaisLidos" component={MaisLidos}/>
    <Stack.Screen name="Enquetes" component={Enquetes}/>

    </>)
    :
    (<>
      <Stack.Screen name="Vitrine" component={VitrineScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />

      </>)

    }
    </Stack.Navigator>
  )};


  const TabBar = () => {
    return (  
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Criar Livro') {
              iconName = 'book-outline';
            } else if (route.name === 'Perfil') {
              iconName = 'person-outline';
            }
            return <IonIcons name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,  // oculta o header duplicado nas telas de aba
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Criar Livro" component={LivrosScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
 
export default function App() {
  return (
    <QueryClientProvider client={QueryClient}>
          <AuthProvider>

    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
    </AuthProvider>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  // Estilo geral do container
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  
  // Estilo do card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  
  // Título do card
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  
  // Descrição do card
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
});

