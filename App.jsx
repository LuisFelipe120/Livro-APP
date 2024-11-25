import * as React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Buscar from './components/buscar';
import ItemCarousel from './components/CarouselItem';
 
function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex:1}}>
    <View style={{height:70,}} >
   <Buscar/>
   </View>
    <View >
    <Text style={{padding:5, fontSize: 20, fontWeight:'bold'}}>Generos</Text>
   <ItemCarousel/>
   </View>
      {/* Card 1: Populares */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Populares</Text>
        <Text style={styles.cardDescription}>
          Descubra os livros mais populares entre os leitores.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>

      {/* Card 2: Mais lidas da semana */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mais lidas da semana</Text>
        <Text style={styles.cardDescription}>
          Explore os livros mais lidos pelos usuários nesta semana.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
   </View>
  );

}
 
function LivrosScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Livros!</Text>
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
 </View>
  );
}
 
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil!</Text>
      <IonIcons name='person-outline' size={40} color={'red'} />
    </View>
  );
}
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: { backgroundColor: '#fbfbfa' },
    }}>
      <Stack.Screen name="Home" component={TabBar} options={{ headerTitle: () => (
        <View style={{flex: 1, flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
          <View style={{paddingTop: 5}}>
          <Text style={{ fontSize: 15, color:"#000"}}>Ola,</Text>
          <Text style={{fontSize: 20, color:"#000"}}>Luis</Text>
          </View>
          <View>
          </View>
        </View>
        
      )}} />

      
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
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navIcon: {
    fontSize: 25,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 18,
    color: '#888',
    marginLeft: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  banner: {
    width: '90%',
    height: 120,
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 20,
  },
});