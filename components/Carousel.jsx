// import React from "react";
// import { Image, StyleSheet, Text, View, FlatList } from "react-native";
// import ItemCarousel from "./CarouselItem";

// const Carousel = ({imagemUrl}) => {
//     return (
//         <View >
//              <FlatList          
//                 horizontal
//                 showsHorizontalScrollIndicator={false}    
//                 contentContainerStyle={styles.flatlist}
//                 data={[{ id: 1}, {id:2}, {id:3}, {id: 4}]}    
//                 keyExtractor={(item) => item.id}    
//                 renderItem={({item}) => <ItemCarousel /> }      
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({   
//     flatlist:{
//       gap: 10,
//       padding: 2,
//       justifyContent:'center',
//       alignItems:'center',
//       height: 180,
//       marginTop: 10,
//     }
//   })


// export default Carousel