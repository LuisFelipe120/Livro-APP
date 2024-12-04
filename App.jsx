import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cadastrar from './src/components/Cadastrar';
import Login from './src/components/Login';
import Vitrine from './src/components/Vitrine';
import MaisLidos from './src/components/MaisLidos';
import TelaBemVindo from './src/components/BemVindo';
import Livros from './src/components/DetalhesCapitulos';



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Livros />
  </QueryClientProvider>
);

export default App;
