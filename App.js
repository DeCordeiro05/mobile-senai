import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./src/pages/HomeScreen";
import { Text, TouchableOpacity } from 'react-native-web';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={HomeScreen} 
          options={{
              title: 'Alugar livros', 
              headerStyle: {
                backgroundColor: '#007BFF',
              },
              headerTintColor: '#fff', 
              headerTitleStyle: {
                fontWeight: 'bold', 
                fontSize: 20,
              },
              headerRight: () => (
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    backgroundColor: '#fff',
                    padding: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => alert('📚 Escolha os melhores livros para alugar e mergulhe na leitura!')}
                >
                  <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>Ajuda</Text>
                </TouchableOpacity>
              ),
            }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}