import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getLivros } from "../src/services/fetchs";
import { useQuery } from "@tanstack/react-query";

const Livro = () => {
  const {data: islivro, error, isLoading} = useQuery({queryKey: ['getLivros'],
    queryFn: getLivros});
  console.log('Livro: ',islivro)
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return(
  <View style={styles.container}>
    <Text style={styles.text}>Página do Livro</Text>
    <Text style={styles.subtext}>Livro ID:  {islivro?.nome} </Text>
<Text>{islivro?.nome}</Text>
  </View>
  )
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
  subtext: { marginTop: 10, fontSize: 16 },
  link: { marginTop: 20, fontSize: 16, color: "blue" },
});

export default Livro;
