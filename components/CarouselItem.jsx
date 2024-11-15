import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import img1 from '../images/high-angle-delicious-brazilian-food-composition.jpg'


const ItemCarousel = ({imgSrc}) => {
    return (
        <View >
            <Image style={styles.img} source={img1}/>
        </View>
    )
}

const styles = StyleSheet.create({  
    img:{
        height:180,     
        width: 350,
        borderRadius:12
    } 
})

export default ItemCarousel