import React from 'react'
import { Text, View } from 'react-native'

const CadastroLivros = () => {
    const {data: isLivro, error, isLoading} = useQuery({queryKey: ['getLivros'],
        queryFn: getUsers});
      console.log('Home: ',isLivro)
  return (
    
    <View><Text>CadastroLivro</Text></View>
  )
}

export default CadastroLivros