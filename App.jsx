import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importando as telas
import Home from "./components/Home";
import Genero from "./components/Genero"; 
import Publicados from "./components/Publicados";
import ObrasLidasCapitulos from "./components/ObrasLidasCapitulos";
import Livro from "./components/Livro"; 

// Criação do client para o React Query
const queryClient = new QueryClient();

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [params, setParams] = useState(null);

  // Função para navegar entre telas
  const navigate = (screen, parameters = null) => {
    setCurrentScreen(screen);
    setParams(parameters);
  };

  // Renderiza a tela com base na navegação atual
  const renderScreen = () => {
    switch (currentScreen) {
      // case "Home":
      //   return <Home navigate={navigate} />;
      // case "Genero":
      //   return <Genero navigate={navigate} params={params} />;
      // case "Publicados":
      //   return <Publicados navigate={navigate} />;
      // case "ObrasLidasCapitulos":
      //   return <ObrasLidasCapitulos navigate={navigate} />;
      // case "Livro":
      //   return <Livro navigate={navigate} params={params} />;
      // default:
      //   return <Home navigate={navigate} />;
      case "MaisLidosSemana":
        return <MaisLidosSemana navigate={navigate} params={params}/>
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>{renderScreen()}</View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
