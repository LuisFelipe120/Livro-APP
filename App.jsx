import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cadastrar from './src/components/Cadastrar';
import Login from './src/components/Login';
import Vitrine from './src/components/Vitrine';
import MaisLidos from './src/components/MaisLidos';



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Vitrine />
  </QueryClientProvider>
);

export default App;
