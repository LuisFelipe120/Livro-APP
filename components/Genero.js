import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Genero = ({ navigate, params }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Página de Gêneros</Text>
    <Text style={styles.subtext}>Gênero Selecionado: {params?.genre || "Nenhum"}</Text>
    <TouchableOpacity onPress={() => navigate("Home")}>
      <Text style={styles.link}>Voltar para Home</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
  subtext: { marginTop: 10, fontSize: 16 },
  link: { marginTop: 20, fontSize: 16, color: "blue" },
});

export default Genero;
