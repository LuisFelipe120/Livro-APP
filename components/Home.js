import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Importando imagens locais
import ProfileImage from "./../assets/image/94703585_2682114138686908_5300330496163577856_n.jpg";
import BannerImage from "./../assets/banner/banner.jpg";
import Book1 from "./../assets/books/book1.jpg";
import Book2 from "./../assets/books/book2.jpg";
import Book3 from "./../assets/books/book3.jpg";
import Book4 from "./../assets/books/book4.jpg";
import Publicados from "./Publicados";

function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>Timóteo</Text>
        </View>
        <Image source={ProfileImage} style={styles.profileImage} />
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar" />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* Banner */}
      <Image source={BannerImage} style={styles.banner} resizeMode="cover" />

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Gêneros</Text>
      <View style={styles.categoriesContainer}>
        {["Aventura", "Romance", "Terror", "Ação"].map((category, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.categoryItem}>
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meus Livros */}
      <Text style={styles.sectionTitle}>Meus livros</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.booksContainer}>
        {[Book1, Book2, Book3, Book4].map((book, index) => (
          <View key={index} style={styles.bookItem}>
            <Image source={book} style={styles.bookImage} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// function PublicadosScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Livros Publicados</Text>
//       <Text>Lista de livros publicados aparecerá aqui.</Text>
//     </View>
//   );
// }

function UsuarioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Página do Usuário</Text>
      <Text>Exemplo de tela de Usuário</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Publicar") {
              iconName = "add-circle"; // Ícone do botão Publicar
            } else if (route.name === "Usuario") {
              iconName = "person";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarButton: (props) => {
            if (route.name === "Publicar") {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={() => navigation.navigate("Publicar")}
                />
              );
            }
            return <TouchableOpacity {...props} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Publicar" component={Publicados} />
        <Tab.Screen name="Usuario" component={UsuarioScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  greeting: { fontSize: 18, color: "#333" },
  username: { fontSize: 20, fontWeight: "bold", color: "#333" },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 20,
  },
  searchInput: { flex: 1, padding: 8, fontSize: 16 },
  searchIcon: { fontSize: 18, color: "#888", marginLeft: 10 },
  banner: { width: "90%", height: 120, alignSelf: "center", borderRadius: 8, marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginHorizontal: 20, marginVertical: 10 },
  categoriesContainer: { flexDirection: "row", justifyContent: "space-around", marginHorizontal: 20 },
  categoryItem: { alignItems: "center" },
  categoryIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#d9d9d9" },
  categoryText: { marginTop: 5, fontSize: 14, color: "#333" },
  booksContainer: { marginHorizontal: 20, marginVertical: 10 },
  bookItem: { marginRight: 10 },
  bookImage: { width: 120, height: 160, borderRadius: 8 },
});
