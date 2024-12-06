import React from 'react'
import { TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
const Buscar = () => {
  return (
    <View style={{ flex: 1,    backgroundColor: '#f9f9f9',
    }} >
    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', paddingTop:12, padding:15}}>
    <TextInput style={{borderColor:'#CCC', borderWidth: 1 ,borderStyle: 'solid', borderRadius: 4, padding:10, backgroundColor:'#FFF', flex: 1, alignItems:'center'}} placeholder='Buscar'/>
    <Icon name="search" size={20} color="#CCC" style={{ marginLeft: 10 }} />

    </View>
  </View>
  )
}

export default Buscar