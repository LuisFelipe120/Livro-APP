import * as React from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Buscar from './components/buscar';
import Carousel from './components/Carousel';
 
function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex:1}} >
      <View style={{flex:1}}>
   <Buscar/>
   </View>
   <View style={{flex:1}}>
   <Carousel/>
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
