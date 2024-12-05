import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Livro = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Página do Livro</Text>
    <Text style={styles.subtext}>Livro ID: </Text>

  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
  subtext: { marginTop: 10, fontSize: 16 },
  link: { marginTop: 20, fontSize: 16, color: "blue" },
});

export default Livro;
